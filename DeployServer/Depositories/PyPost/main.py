import requests

API_ENDPOINT = "http://127.0.0.1:3000/"
  
data = {"mainpy": "button1"}

response = requests.post(url = API_ENDPOINT, json = data)

print(response)