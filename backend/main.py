APPID = '1283c1ab'
APPLICATIONKEY = '6ed575d941bbbea2d4e50379f436c326'
URL = 'https://api.edamam.com/api/recipes/v2'

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from pymongo import MongoClient
import pickle

app = Flask(__name__)
CORS(app)

@app.route('/find', methods=['POST', 'GET'])
def search_recipe():
    cluster = "mongodb://localhost:27017/"
    client = MongoClient(cluster)
    db = client.recipeDB
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
    cluster = "mongodb://localhost:27017/"
    client = MongoClient(cluster)
    db = client.recipeDB
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

    # create array for mealtype of the selected recipe - not used due to bad predictions
    # meal_array = []
    # for column_name in df.columns[12:17]:
    #     meal_array.append(column_name)
    # specific_row = df['mealtype'][id]
    # result_meal_array = [1 if category in specific_row else 0 for category in meal_array]
    # print(result_meal_array)

    # create array for cuisinetype of the selected recipe - not used due to bad predictions
    # cuisine_array = []
    # for column_name in df.columns[17:38]:
    #     cuisine_array.append(column_name)
    # specific_row = df['cuisinetype'][id]
    # result_cuisine_array = [1 if category in specific_row else 0 for category in cuisine_array]
    # print(result_cuisine_array)

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
    app.run(debug=True)