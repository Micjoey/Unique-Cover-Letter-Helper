import requests

headers = {}
headers["Authorization"] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA2NTk1OTQ5LCJqdGkiOiI0MWRkZTgxY2FiYzc0YzliODdiYjQ1ODE0ZTY0YTJmNCIsInVzZXJfaWQiOjF9.bMEUqMlOenzRkaO9OExrJc1wgTJJGu7ENWuuV2gaGrs"

r = requests.get('http://localhost:3000/api/jobs', headers = headers)

print(r.text)
