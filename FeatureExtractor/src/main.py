from fedatabase import MongoDBConnect
from sklearn.feature_selection import VarianceThreshold
from sklearn.preprocessing import normalize

THRESHOLD = 0.0000000005

def filterColumns(column_names, selected_columns):
    i = 0

    temp = []
    for i in range(len(column_names)):
        if selected_columns[i] == True:
            temp.append(column_names[i])
        i += 1

    return temp

def calculate_scores(output):
    scores = []

    for x in output:
        sum = 0.0
        for value in x:
            sum += value

        scores.append(sum)

    return scores


if __name__ == "__main__":

    db = MongoDBConnect()

    # Get the all the HBCUS from the database
    samples = db.getHBCUs()

    # Normalize values
    samples = normalize(samples, norm="max")

    # Reduce the features
    selector = VarianceThreshold(THRESHOLD)
    selector.fit(samples)

    # Insert reduced feature vectors into output variable
    output = selector.transform(samples)

    #Get the institution names, column names, and selected columns
    names = db.getHBCUNames()
    column_names = db.getColumnNames()
    selected_columns = list(selector.get_support())

    #Filter out unused columns
    column_names = filterColumns(column_names, selected_columns)

    print("Number of Institutions: " + str(len(samples)))
    print("Threshold: " + str(THRESHOLD))
    print("Original Number of Variables: " + str(len(samples[0])))
    print("Selected Number of Variables: " + str(len(output[0])))
    print("\n")

    scores = calculate_scores(output)
    scores_dict = {}

    i = 0
    for i in range(len(names)):
        scores_dict[names[i]] = scores[i]
        i += 1

    sorted_scores_dict = {k: v for k, v in sorted(scores_dict.items(), key=lambda item: item[1], reverse=True)}

    i = 1

    for key, value in sorted_scores_dict.items():
        print(str(i) + " " + f'{key:50}: {value:10.2f}')
        i += 1


