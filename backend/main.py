APPID = '1283c1ab'
APPLICATIONKEY = '6ed575d941bbbea2d4e50379f436c326'
URL = 'https://api.edamam.com/api/recipes/v2'

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from pymongo import MongoClient
import pickle
import pandas as pd
from database import save_dataset_to_mongodb

# Add MongoDB connection details
mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017/")
mongodb_database = os.getenv("MONGODB_DATABASE", "recipeDB")
mongodb_collection = "recipe"
mongo_data = "cleaned.csv"

# Save the dataset to MongoDB
save_dataset_to_mongodb(mongo_data, mongodb_url, mongodb_database, mongodb_collection)

client = MongoClient(mongodb_url)
db = client.recipeDB

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return ("hello world")

@app.route('/find', methods=['POST', 'GET'])
def search_recipe():

    recipe = db.recipe
    data = request.json

    def build_fetch(key_list, fetch):
        for key, value in key_list.items():
            if(data[value]):
                fetch.update({key: 1})

    fetch = {}
    key_list = {"Balanced":"balanced",
                "High-Protein":"protein",
                "Low-Fat":"fat",
                "Low-Carb": "carb",
                "High-Fiber": "fiber",
                "Low-Sodium": "sodium"}

    build_fetch(key_list, fetch)

    print(fetch)

    result_json = []
    results = recipe.find(fetch)
    for result in results:
        recipe = {
            "label": result['Name'],
            "totalNutrients": {
                "PROCNT": {
                    "label": "Protein",
                    "quantity": result['Protein'],
                    "unit": "g"
                },
                "FAT": {
                    "label": "Fat",
                    "quantity":result['Fats'],
                    "unit": "g"
                },
                "ENERC_KCAL": {
                    "label": "Energy",
                    "quantity": result['Energy'],
                    "unit": "kcal"
                },
                "CHOCDF": {
                    "label": "Carbs",
                    "quantity": result['Carbs'],
                    "unit": "g"
                },
                "FIBTG": {
                    "label": "Fiber",
                    "quantity": result['Fibres'],
                    "unit": "g"
                },
            },
            "image": result['image_url'],
            "ingredientLines": eval(result['ingridients']),
            "mealType": result['mealtype'],
            "url": result['url'],
            "cuisineType": result['cuisinetype'],
            "id": result["id"]
        }
        result_json.append(recipe)

    # print(result_json)

    return jsonify({'searched_recipes': result_json})

CORS(app)
@app.route('/predict', methods=['POST', 'GET'])
def predict_recipe():
    recipe = db.recipe

    # id = int(request.args.get('id'))
    data = request.json
    id = data['id']
    print(f"id is {id}")

    result = recipe.find_one({"id": id})
    print(result["Protein"])

    # will be used as gives perfect results
    nutrient_array = [result["Protein"], result['Fats'], result['Energy'], result['Carbs'], result['Fibres']]
    print(nutrient_array)


    print(f"nutrients{np.array(nutrient_array).reshape(1, -1)}")
    model = pickle.load(open('recipemodel','rb'))

    nearest_recipes = model.kneighbors(np.array(nutrient_array).reshape(1, -1), 10, return_distance=False)
    indices = nearest_recipes[0]
    print(indices)
    ids = indices.tolist()
    result_json =[]
    similar = recipe.find({"id": {"$in": ids}})

    for result in similar:
        recipe = {
            "label": result['Name'],
            "totalNutrients": {
                "PROCNT": {
                    "label": "Protein",
                    "quantity": result['Protein'],
                    "unit": "g"
                },
                "FAT": {
                    "label": "Fat",
                    "quantity":result['Fats'],
                    "unit": "g"
                },
                "ENERC_KCAL": {
                    "label": "Energy",
                    "quantity": result['Energy'],
                    "unit": "kcal"
                },
                "CHOCDF": {
                    "label": "Carbs",
                    "quantity": result['Carbs'],
                    "unit": "g"
                },
                "FIBTG": {
                    "label": "Fiber",
                    "quantity": result['Fibres'],
                    "unit": "g"
                },
            },
            "image": result['image_url'],
            "ingredientLines": eval(result['ingridients']),
            "mealType": result['mealtype'],
            "url": result['url'],
            "cuisineType": result['cuisinetype'],
            "id": result["id"]
        }
        result_json.append(recipe)
    return result_json


if __name__ == '__main__':
    app.run(host='0.0.0.0')
