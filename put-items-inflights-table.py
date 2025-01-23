import boto3
from datetime import datetime, timedelta
import random

# Initialize the DynamoDB client
dynamodb = boto3.client('dynamodb')

# Define table name
table_name = "InFlights"

# List of airports (excluding SDF)
airports = ["BNA", "CVG", "ORD", "DCA", "BWI", "MCO", "MIA", "LAX", "LUV", "JFK", "ATL"]

# Get the current date and time
current_time = datetime.utcnow()

# Generate items for batch write
items = []
for i in range(1, 11):  # Generating 10 items as an example
    flight_id = f"EA-{i}"  # Sequential flight IDs
    arrival_time = (current_time + timedelta(hours=i)).strftime('%Y-%m-%d %H:%M')  # Arrival time i hours from now
    
    # Randomly decide if SDF will be origin or destination
    use_sdf_as_origin = random.choice([True, False])
    
    if use_sdf_as_origin:
        origin = "SDF"
        destination = random.choice(airports)  # Randomly pick from other airports
    else:
        origin = random.choice(airports)  # Randomly pick from other airports
        destination = "SDF"

    # Ensure origin and destination are not the same
    while destination == origin:
        destination = random.choice(airports if use_sdf_as_origin else ["SDF"])

    # Randomly select a status (either "on-time" or "delayed")
    status = random.choice(["on-time", "delayed"])

    # Create the item
    item = {
        'PutRequest': {
            'Item': {
                'flight_id': {'S': flight_id},
                'arrival_time': {'S': arrival_time},
                'origin': {'S': origin},
                'destination': {'S': destination},
                'status': {'S': status}  # Randomly assigned status
            }
        }
    }
    items.append(item)

# Batch write items to DynamoDB
response = dynamodb.batch_write_item(
    RequestItems={
        table_name: items
    }
)

# Check for unprocessed items
unprocessed = response.get('UnprocessedItems', {})
if unprocessed:
    print("Some items were not processed:", unprocessed)
else:
    print("All items inserted successfully.")
