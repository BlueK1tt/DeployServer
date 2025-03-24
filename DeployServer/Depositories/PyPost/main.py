import requests

API_ENDPOINT = "http://127.0.0.1:5000/api/server"
  
data = {"test": "testing"}

response = requests.post(url = API_ENDPOINT, json = data)

print(response)