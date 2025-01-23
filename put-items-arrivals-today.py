import boto3
from datetime import datetime, timedelta
import random

# Initialize the DynamoDB client
dynamodb = boto3.client('dynamodb')

# Define the table name
table_name = 'ArrivingFlights'

# List of origins
origins = ["BNA", "CVG", "ORD", "DCA", "BWI", "MCO", "MIA", "LAX", "LUV", "JFK", "ATL"]


# Get today's date
today = datetime.utcnow()

# Generate items with arrival_time for the next 5 hours
items = []
for i in range(5):
    # Set departure time (current time + i hours)
    arrival_time = (today + timedelta(hours=i)).strftime('%Y-%m-%d %H:%M')

    # Randomly select a origin from the list
    origin = random.choice(origins)
    
    # Create an item
    item = {
        'flight_id': {'S': f'EA-{i+1}'},  # Example flight_id
        'arrival_time': {'S': arrival_time},  # Example arrival_time
           'origin': {'S': origin},  # Randomly selected origin
        'status': {'S': 'Scheduled'}  # Example status
    }
    items.append({'PutRequest': {'Item': item}})

# Use batch_write_item to insert items
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
