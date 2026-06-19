import json
import pickle
import numpy as np
import os

# Global variables
__locations = None
__data_columns = None
__model = None


def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except ValueError:
        loc_index = -1

    # Feature vector create karo
    x = np.zeros(len(__data_columns))

    # First 3 columns training ke time:
    # total_sqft, bath, bhk
    x[0] = sqft
    x[1] = bath
    x[2] = bhk

    # One-hot encoding for location
    if loc_index >= 0:
        x[loc_index] = 1

    # Prediction
    prediction = __model.predict([x])[0]

    return round(prediction, 2)


def load_saved_artifacts():
    print("Loading saved artifacts... start")

    global __data_columns
    global __locations
    global __model

    artifacts_dir = os.path.join(
        os.path.dirname(__file__),
        "..",
        "model"
    )

    # Load columns.json
    json_path = os.path.join(artifacts_dir, "columns.json")

    with open(json_path, "r") as f:
        __data_columns = json.load(f)["data_columns"]
        __locations = __data_columns[3:]

    # Load trained model
    pickle_path = os.path.join(
        artifacts_dir,
        "banglore_home_prices_model.pickle"
    )

    with open(pickle_path, "rb") as f:
        __model = pickle.load(f)

    print("Loading saved artifacts... done")


def get_location_names():
    return __locations


def get_data_columns():
    return __data_columns


if __name__ == "__main__":
    load_saved_artifacts()

    print(get_location_names()[:5])

    # Test prediction
    print(
        get_estimated_price(
            "1st phase jp nagar",
            1000,
            2,
            2
        )
    )