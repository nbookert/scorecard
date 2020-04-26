from fedatabase import MongoDBConnect
from sklearn.feature_selection import VarianceThreshold
from sklearn.preprocessing import normalize

THRESHOLD = 0.0000000005
column_number = []

def filterColumns(column_names, selected_columns):
    i = 0

    temp = []
    for i in range(len(column_names)):
        if selected_columns[i] == True:
            temp.append(column_names[i])
            column_number.append(i)
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
    samples = db.get_HBCUs()

    # Normalize values
    samples = normalize(samples, norm="max")

    # Reduce the features
    selector = VarianceThreshold(THRESHOLD)
    selector.fit(samples)

    # Insert reduced feature vectors into output variable
    output = selector.transform(samples)

    #Get the institution names, column names, and selected columns
    institution_names = db.getHBCUNames()
    column_names = db.get_variable_code()
    selected_columns = list(selector.get_support())

    #Filter out unused columns
    column_names = filterColumns(column_names, selected_columns)

    w = open("selected_columns.txt", "w")
    i = 0

    for i in range(len(column_names)):
        w.write(str(column_number[i]) + ": " + column_names[i] + "\n")
    w.close()

    print("Number of Institutions: " + str(len(samples)) + "\n")
    print("Threshold: " + str(THRESHOLD) + "\n")
    print("Original Number of Variables: " + str(len(samples[0])) + "\n")
    print("Selected Number of Variables: " + str(len(output[0])) + "\n")

    scores = calculate_scores(output)
    # scores_dict = {}
    #
    # # Sort the scores
    # i = 0
    # for i in range(len(names)):
    #     scores_dict[names[i]] = scores[i]
    #     i += 1
    #
    # sorted_scores_dict = {k: v for k, v in sorted(scores_dict.items(), key=lambda item: item[1], reverse=True)}

    w = open("scores.csv", "w")

    w.write("Institution Name")
    w.write(",Cumulative Score")

    for variable in column_names:
        w.write("," + variable)

    w.write("\n")

    i = 0
    for i in range(len(institution_names)):

        w.write(institution_names[i] + "," + str(scores[i]))

        for value in output[i]:
            w.write("," + str(value))

        w.write("\n")
        i += 1

    w.close()


