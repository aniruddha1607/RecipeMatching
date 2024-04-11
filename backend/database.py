from pymongo import MongoClient
import pandas as pd


def save_dataset_to_mongodb(dataset_file, mongodb_url, mongodb_database, mongodb_collection):
    df = pd.read_csv(dataset_file)
    client = MongoClient(mongodb_url)
    db = client[mongodb_database]
    collection = db[mongodb_collection]
    records = df.to_dict(orient='records')
    count = collection.count_documents({})
    if(count == 0):
        collection.insert_many(records)