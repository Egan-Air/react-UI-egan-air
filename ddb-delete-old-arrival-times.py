import boto3
from datetime import datetime

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb')

# Define table name
table_name = 'ArrivingFlights'

# Get today's date in the desired format (assumes arrival_time is stored as a string date like 'YYYY-MM-DD')
today = datetime.utcnow().strftime('%Y-%m-%d')

# Scan for items where arrival_time is NOT today's date
response = dynamodb.scan(
    TableName=table_name,
    FilterExpression='arrival_time <> :today',
    ExpressionAttributeValues={
        ':today': {'S': today}
    }
)

# Iterate through the items and delete each one
for item in response.get('Items', []):
    partition_key = item['flight_id']  # Replace with your actual partition key name
    sort_key = item['arrival_time']  # Replace with your sort key (arrival_time)
    
    # Delete the item
    dynamodb.delete_item(
        TableName=table_name,
        Key={
            'flight_id': partition_key,  # Replace with actual partition key name
            'arrival_time': sort_key
        }
    )
    print(f"Deleted item with PartitionKey: {partition_key} and arrival_time: {sort_key}")

print("Deletion complete.")
