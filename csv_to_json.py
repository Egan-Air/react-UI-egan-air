import csv
import json

# Input and output file paths
csv_file = 'results.csv'
json_file = 'data.json'

# Table name
table_name = 'ArrivingFlights'

# Convert CSV to DynamoDB JSON format
with open(csv_file, 'r') as csvfile, open(json_file, 'w') as jsonfile:
    reader = csv.DictReader(csvfile)
    items = []
    for row in reader:
        item = {
            "PutRequest": {
                "Item": {key: {"S" if isinstance(value, str) else "N": value} for key, value in row.items()}
            }
        }
        items.append(item)
    json.dump({table_name: items}, jsonfile, indent=2)
