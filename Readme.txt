Tech Stack
1. Frontned
- JavaScript (ReactJS)
- TailwindCSS for styling

2. Backend
- Flask(python) for API
- Model Development in Python

3. Database
- MongoDB

4. Docker for Containerization


Data (Preprocessing and applying Algorithm) / Model Creation
- The data was initially being fetched from EDMAMS API at runtime, but this was leading to an increased processing time, So I created my own dataset from the API
- API link - https://developer.edamam.com/edamam-docs-recipe-api
- The data was created by iteratively calling the API inside a for loop with different parameters according to the dishType ( wether it is a lunch, breakfast, dinner, snack or a teatime)
- The obtained data is stored in a csv file but this data needs to be preprocessed

Preprocessing 
- The first task was to drop all duplicate recipes present in created dataset, dropped based on the name of recipe
- If any of the inital columns had null values those particular rows were dropped
- 5 main attributes that are going to be used to calculate similarity of the recipe are - Protein, Fats, Carbs, Energy, Fibers
- These were huge floating point numbers in the initial dataset which were converted to int for faster processing and cleaner data
- The columns, mealType, cuisineType and diet were categorical columns, for these columns label encoding was done and a separate column was created for each category, these are further used to search recipes by filtering them and testing the model by considering mealtype and cusine type apart from the 5 mentioned nutrients


Applying the Model
- I found Nearest Neighbours algorithm to be the best fit for calculating similarity of recipes based on several artcles
- cite articles hhere --------
- Initialy the Nearest Neighbours algorithm was applied to 5 Nutrient columns as mentioned in preprocessing and also the label encoded columns/categories of mealtype and cuisinetype were taken into consideration
- But this dataset was giving inconsistent results as it also tried to match the type of meal and the cuisine, so focus was shifted from the nutrients - In Layman terms, similar recipes for high protein recipes did not always contain high protein recipes, but some low protein ones too which matched the cuisine (eg - american) of the parent recipe
- The point of this app was to give recipes with similar nutrients and calories, so only the 5 nutrient columns were now used to train the nearest neighbour algorithm which was giving promising results and atleast 8 out of 10 recipes were having similar amount of nutrients.
- Nearest neighbour parameter of 5 was used while training the model as it didnt underfit not overfit the model
- This second model was saved using pickle and then is used in the backend to make predictions



API Documentation


1. '/find' path
- Takes predefined filters from the frontend
- Searches the recipes in database according to the filters received
- Returns the response JSON


2. '/predict' path
- Takes all the information of the current recipe the user is viewing as input
- Uses the trained model on the recipe dataset, to predict 10 similar recipes to the current one
- Returns the response JSON



To run the application
- Download the code from github
- Open terminal inside the parent directory(RecipeMatching)
- run command -> docker-compose up -build
- go to localhost:3000 and you have the app up and running!
- to stop the container -> ctrl+C on terminal -> docker-comose down