import requests

API_ENDPOINT = "http://127.0.0.1:3001/Main%20request?"
  
data = {"mainpy": "yo"}

response = requests.post(url = API_ENDPOINT, json = data)

print(response)