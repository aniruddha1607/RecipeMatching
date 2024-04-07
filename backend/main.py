APPID = '1283c1ab'
APPLICATIONKEY = '6ed575d941bbbea2d4e50379f436c326'
URL = 'https://api.edamam.com/api/recipes/v2'

# https://api.edamam.com/api/recipes/v2?app_key=6ed575d941bbbea2d4e50379f436c326&_cont=CHcVQBtNNQphDmgVQntAEX4BY0t0DAACRGZFCmIRZFx6AwECUXlSVmEUYgRzAgtTFTBDUmURMAB6BFECF2xCCmdHNgBwAVUVLnlSVSBMPkd5BgNK&app_id=1283c1ab&q=noodles

from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import csv
import pandas as pd
import numpy as np
import re
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import FunctionTransformer
from sklearn.model_selection import train_test_split
import mysql.connector


app = Flask(__name__)
# db = mysql.connector.connect(
#     host='localhost',
#     database = 'recipe',
#     user = 'root'
# )
CORS(app)

@app.route('/find', methods=['GET'])
def search_recipe():
    query = request.args['q']

    response = requests.get(f"{URL}?app_key={APPLICATIONKEY}&app_id={APPID}&q={query}&type=any")
    if response.status_code == 200:
        data = response.json()
        searched_recipes = []
        for i in range(20):
            searched_recipes.append(data['hits'][i]['recipe'])
        print(searched_recipes)
        return jsonify({'searched_recipes': searched_recipes})
    else:
        print(f"error {response.status_code}")



CORS(app)
@app.route('/predict')
def predict_recipe():
    mealType = request.args['mealType']
    if "/" in mealType:
        mealType = mealType.split("/")[0]

    print(mealType[0])
    print(f"mealType is {mealType}")
    input_protein = int(request.args.get('protein'))
    input_fat = int(request.args.get('fat'))
    input_energy = int(request.args.get('energy'))
    input_carbs = int(request.args.get('carbs'))
    input_fibres = int(request.args.get('fibres'))
    response = requests.get(f"{URL}?app_key={APPLICATIONKEY}&app_id={APPID}&mealType={mealType}&type=any")

    if response.status_code == 200:
        data = response.json()
        suggested_recipes1 = []
        for i in range(20):
            suggested_recipes1.append(data['hits'][i]['recipe'])

        for _ in range(20):
            if( data['_links']['next']['href']):
                response = requests.get(data['_links']['next']['href'])
                if response.status_code == 200:
                    data = response.json()
                    for i in range(20):
                        suggested_recipes1.append(data['hits'][i]['recipe'])
                else:
                    print(f"error {response.status_code}")
            else:
                break

        print('result returned')

        print(len(suggested_recipes1))
        labels = []
        protein = []
        fat = []
        energy = []
        carbs = []
        fibres = []
        image_url = []
        ingridients = []
        mealtype = []
        url = []
        cuisinetype = []

        for i in range(len(suggested_recipes1)):
            try:
                labels.append(suggested_recipes1[i]['label'])
                protein.append(suggested_recipes1[i]['totalNutrients']['PROCNT']['quantity'])
                fat.append(suggested_recipes1[i]['totalNutrients']['FAT']['quantity'])
                energy.append(suggested_recipes1[i]['totalNutrients']['ENERC_KCAL']['quantity'])
                carbs.append(suggested_recipes1[i]['totalNutrients']['CHOCDF']['quantity'])
                fibres.append(suggested_recipes1[i]['totalNutrients']['FIBTG']['quantity'])
                image_url.append(suggested_recipes1[i]['image'])
                ingridients.append(suggested_recipes1[i]['ingredientLines'])
                mealtype.append(suggested_recipes1[i]['mealType'])
                url.append(suggested_recipes1[i]['url'])
                cuisinetype.append(suggested_recipes1[i]['cuisineType'])
            except:
                print("This row is not appended")

        print('appended in list')

        for x in range(len(ingridients)):
            print(ingridients[x])

        db_columns = zip(labels, protein, fat, energy, carbs, fibres, image_url, ingridients, mealtype, url, cuisinetype)

        csv_file_path = 'dataset.csv'
        with open(csv_file_path, 'w', newline='') as csv_file:
            writer = csv.writer(csv_file)

            writer.writerow(['Name', 'Protein', 'Fats', 'Energy', 'Carbs', 'Fibres', 'image_url', 'ingridients', 'mealtype', 'url', 'cuisinetype'])

            for row in db_columns:
                try:
                    writer.writerow(row)
                except:
                    print('encoding error')
                    continue
        print('csv created')

        df = pd.read_csv('dataset.csv', encoding='cp1252')
        neigh = NearestNeighbors(n_neighbors=2)
        neigh.fit(df.iloc[:, 1:6].to_numpy())
        nearest_recipes = neigh.kneighbors([[input_protein, input_fat, input_energy, input_carbs, input_fibres]], 10, return_distance=False)

        indices = nearest_recipes[0]
        df2 = df.iloc[indices, :]
        result_list = df2.values.tolist()

        result_json = []

        for point in result_list:
            recipe = {
                "label" : point[0],
                "totalNutrients": {
                  "PROCNT": {
                    "label": "Protein",
                    "quantity": point[1],
                    "unit": "g"
                  },
                  "FAT": {
                    "label": "Fat",
                    "quantity": point[2],
                    "unit": "g"
                  },
                  "ENERC_KCAL": {
                    "label": "Energy",
                    "quantity": point[3],
                    "unit": "kcal"
                  },
                  "CHOCDF": {
                        "label": "Carbs",
                        "quantity": point[4],
                        "unit": "g"
                  },
                  "FIBTG": {
                        "label": "Fiber",
                        "quantity": point[5],
                        "unit": "g"
                  },
                 },
                "image" : point[6],
                "ingredientLines" : eval(point[7]),
                "mealType": eval(point[8]),
                "url": point[9],
                "cuisineType": eval(point[10])
            }
            result_json.append(recipe)

        print(result_json)

        return result_json

    else :
        print(f"error {response.status_code}")


if __name__ == '__main__':
    app.run(debug=True)