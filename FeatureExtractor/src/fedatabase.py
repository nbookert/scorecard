#Connect to MongDB
#Instantiate object

from pymongo import MongoClient
from pprint import pprint
import numpy as np
import math

class MongoDBConnect:



    def __init__(self):
        # connect to MongoDB
        client = MongoClient("mongodb://localhost:27017")
        self.db = client["finalproject"]
        self.col = self.db["institution1819"]

    def get_all(self):
        samples = []
        for x in self.col.find():
            current_sample = []
            for value in x.values():
                if type(value) == type(""):
                    # Check if the value is a number, if not, set it to None (null)

                    try:
                        value = float(value)
                    except ValueError:
                        value = 0

                    current_sample.append(value)

            samples.append(current_sample[23:])

        return np.array(samples)

    def getOne(self, UNITID):
        sample = np.array(list(self.col.find({"UNITID" : UNITID})))
        return sample

    def get_HBCUs(self):
        samples = []
        print(list(self.col.find()))
        for x in self.col.find({"HBCU": "1"}):
            current_sample = []
            for value in x.values():
                if type(value) == type(""):
                    #Check if the value is a number, if not, set it to None (null)

                    try:
                        value = float(value)
                    except ValueError:
                        value = 0

                    current_sample.append(value)

            samples.append(current_sample[23:])

        return np.array(samples)

    def getHBCUNames(self):
        samples = []
        for x in self.col.find({"HBCU": "1"}):
            samples.append(list(x.values())[4])

        return np.array(samples)

    def get_variable_code(self):
        sample = self.col.find_one()

        variables_from_db = list(self.db["InstitutionalVariables"].find())
        variables_dict = {}
        for x in variables_from_db:
            variables_dict[str(x["VARIABLE NAME"])] = str(x["NAME OF DATA ELEMENT"])

        variable_codes = list(sample.keys())[24:]
        variables = []

        for code in variable_codes:

            if code in variables_dict:
                variables.append(variables_dict[code])
            else:
                variables.append(code)

        #print(variables)
        return np.array(variables)

    def update_scores(self, scores):
        score_col = self.db["scores"]

        x = score_col.update_many({}, scores)

        print(x.modified_count, "scores updated")