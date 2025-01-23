import boto3
from datetime import datetime

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb')

# Define table name
table_name = 'FlightSchedules'

# Get today's date in the desired format (assumes departure_time is stored as a string date like 'YYYY-MM-DD')
today = datetime.utcnow().strftime('%Y-%m-%d')

# Scan for items where departure_time is NOT today's date
response = dynamodb.scan(
    TableName=table_name,
    FilterExpression='departure_time <> :today',
    ExpressionAttributeValues={
        ':today': {'S': today}
    }
)

# Iterate through the items and delete each one
for item in response.get('Items', []):
    partition_key = item['flight_id']  # Replace with your actual partition key name
    sort_key = item['departure_time']  # Replace with your sort key (departure_time)
    
    # Delete the item
    dynamodb.delete_item(
        TableName=table_name,
        Key={
            'flight_id': partition_key,  # Replace with actual partition key name
            'departure_time': sort_key
        }
    )
    print(f"Deleted item with PartitionKey: {partition_key} and departure_time: {sort_key}")

print("Deletion complete.")
