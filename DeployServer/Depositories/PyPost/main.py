import requests

API_ENDPOINT = "http://127.0.0.1:3001/"
  
data = {"mainpy":"data"}

response = requests.post(url = API_ENDPOINT, json = data)

print(response)