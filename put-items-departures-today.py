import boto3
from datetime import datetime, timedelta
import random

# Initialize the DynamoDB client
dynamodb = boto3.client('dynamodb')

# Define the table name
table_name = 'FlightSchedules'

# List of destinations
destinations = ["BNA", "CVG", "ORD", "DCA", "BWI", "MCO", "MIA", "LAX", "LUV", "JFK", "ATL"]


# Get today's date
today = datetime.utcnow()

# Generate items with departure_time for the next 5 hours
items = []
for i in range(5):
    # Set departure time (current time + i hours)
    departure_time = (today + timedelta(hours=i)).strftime('%Y-%m-%d %H:%M')

    # Randomly select a destination from the list
    destination = random.choice(destinations)
    
    # Create an item
    item = {
        'flight_id': {'S': f'EA-{i+1}'},  # Example flight_id
        'departure_time': {'S': departure_time},  # Example departure_time
           'destination': {'S': destination},  # Randomly selected destination
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
