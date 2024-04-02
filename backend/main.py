# search using nutrients
# Show similar nutrient meals
# show similar cuisine, mealType

APPID = '1283c1ab'
APPLICATIONKEY = '6ed575d941bbbea2d4e50379f436c326'
URL = 'https://api.edamam.com/api/recipes/v2'

from flask import Flask, request, jsonify
import requests
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/query', methods=['GET'])
def recipe_search():
    # data = request.json
    # recipe = data['recipe']
    recipe = request.args.get('recipe')

    def keyword_call(query):
        api_url = URL

        params = {
            'app_id': APPID,
            'app_key': APPLICATIONKEY,
            'type': 'any',
            'q': query
        }

        try:
            response = requests.get(api_url, params=params)
            if response.status_code == 200:
                data = response.json()

                cuisineArrayArray = []
                searchedRecipes = []

                for x in range(20):
                    searchedRecipes.append(data['hits'][x]['recipe'])
                    cuisineArrayArray.append(data['hits'][x]['recipe']['cuisineType'])

                return cuisineArrayArray, searchedRecipes

            else:
                print("error:", response.status_code)
        except requests.exceptions.RequestException as e:
            print("error:", e)

    def extract_cuisineType_CallApi(arr):

        count_dict = {}

        for string in arr:
            if string in count_dict:
                count_dict[string] += 1
            else:
                count_dict[string] = 1

        max_count = 0
        most_frequent = None

        for string, count in count_dict.items():
            if count > max_count:
                max_count = count
                most_frequent = string

        print('\n' + 'explore more similar ' + most_frequent + ' dishes')

        params = {
            'app_id': APPID,
            'app_key': APPLICATIONKEY,
            'type': 'any',
            'cuisineType': most_frequent
        }

        try:
            response = requests.get(URL, params=params)
            if response.status_code == 200:
                data = response.json()
                suggestedCusineRecipes = []
                for x in range(20):
                    suggestedCusineRecipes.append(data['hits'][x]['recipe'])
                return suggestedCusineRecipes, most_frequent
            else:
                print("error:", response.status_code)
        except requests.exceptions.RequestException as e:
            print("error:", e)

    cusine_array, searchedRecipes = keyword_call(recipe)
    cusineStringArray = [string for sub_array in cusine_array for string in sub_array]
    suggestedCusineRecipes, suggestedCuisine = extract_cuisineType_CallApi(cusineStringArray)

    response = jsonify({'searchedRecipes': searchedRecipes, 'suggestedCusineRecipes' : suggestedCusineRecipes,
                    'suggestedCuisine': suggestedCuisine})

    return response

@app.route('/suggestRelated', methods=['GET'])
def suggest_recipes():
    cuisineType = request.args.get('cuisineType')
    print(cuisineType)

    def keyword_call(cuisineType):
        api_url = URL
        params = {
            'app_id': APPID,
            'app_key': APPLICATIONKEY,
            'type': 'any',
            'cuisineType': cuisineType
        }

        try:
            response = requests.get(api_url, params=params)
            if response.status_code == 200:
                data = response.json()

                suggestedRecipes = []

                for x in range(20):
                    suggestedRecipes.append(data['hits'][x]['recipe'])

                return suggestedRecipes

            else:
                print("error:", response.status_code)
        except requests.exceptions.RequestException as e:
            print("error:", e)


    suggestedRecipes = keyword_call(cuisineType)

    response = jsonify({'suggestedRecipes': suggestedRecipes})

    return response

@app.route('/suggestByCalories', methods=['GET'])
def suggest_recipes_calories():
    calories = request.args.get('calories')
    dishType = request.args.get('dishType')
    print(calories)
    calories = int(calories)
    calories_min = str(calories - 150)
    calories_max = str(calories + 150)


    def keyword_call():
        api_url = URL
        params = {
            'app_id': APPID,
            'app_key': APPLICATIONKEY,
            'type': 'any',
            'calories': f'{calories_min}-{calories_max}',
            'dishType': dishType
        }

        try:
            response = requests.get(api_url, params=params)
            if response.status_code == 200:
                data = response.json()

                suggestedByCalories = []

                for x in range(20):
                    suggestedByCalories.append(data['hits'][x]['recipe'])

                return suggestedByCalories

            else:
                print("error:", response.status_code)
        except requests.exceptions.RequestException as e:
            print("error:", e)


    suggestedByCalories = keyword_call()

    response = jsonify({'suggestedByCalories': suggestedByCalories})

    return response

@app.route('/suggestByNutrients', methods=['GET'])
def suggest_recipes_nutrients():
    protein = int(request.args.get('protein'))
    fat = int(request.args.get('fat'))
    energy = int(request.args.get('energy'))
    carbs = int(request.args.get('carbs'))
    fibres = int(request.args.get('fibres'))
    print(protein)

    def keyword_call():
        api_url = URL
        params = {
            'app_id': APPID,
            'app_key': APPLICATIONKEY,
            'type': 'any',
            'nutrients[PROCNT]': f'{protein-150}-{protein+150}',
            'nutrients[FAT]': f'{fat-150}-{fat+150}',
            'nutrients[ENERC_KCAL]': f'{energy-150}-{energy+150}',
            'nutrients[CHOCDF]': f'{carbs-150}-{carbs+150}',
            'nutrients[FIBTG]': f'{fibres-150}-{fibres+150}',
        }

        try:
            response = requests.get(api_url, params=params)
            if response.status_code == 200:
                data = response.json()
                suggestedByNutrients = []
                for x in range(20):
                    suggestedByNutrients.append(data['hits'][x]['recipe'])
                return suggestedByNutrients
            else:
                print("error:", response.status_code)
        except requests.exceptions.RequestException as e:
            print("error:", e)

    suggestedByNutrients = keyword_call()
    response = jsonify({'suggestedByNutrients': suggestedByNutrients})
    return response


if __name__ == '__main__':
    app.run(debug=True)






# cusine_array = keyword_call('butter chicken')
#
# cusineStringArray = [string for sub_array in cusine_array for string in sub_array]
# extract_cuisineType_CallApi(cusineStringArray)
