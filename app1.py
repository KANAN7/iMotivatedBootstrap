import requests

# Replace 'your_public_url' with the actual public URL you get from ngrok
public_url = "https://6aa2-34-105-63-1.ngrok-free.app/"

# User-provided query
# user_query = "Can you tell me how course codes work?"
# user_query = "Can you tell the rules for re-evaluation?"
user_query = "Hey who are you?"
# user_query = "Can you tell me about N Grades?"

# The endpoint with the query as a parameter
url = f"{public_url}/?query={user_query}"

# Send a GET request to the Flask API with the user's query
response = requests.get(url)

# Print the response text
print(f"Status Code: {response.status_code}")
print(f"Response Text: {response.text}")