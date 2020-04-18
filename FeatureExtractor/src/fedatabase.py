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
        db = client["finalproject"]
        self.col = db["institution1819"]

    def getAll(self):
        samples = np.array(list(self.col.find()))
        return samples

    def getOne(self, UNITID):
        sample = np.array(list(self.col.find({"UNITID" : UNITID})))
        return sample

    def getHBCUs(self):
        samples = []
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

    def getColumnNames(self):
        sample = self.col.find_one()
        return np.array(list(sample.keys())[24:])
