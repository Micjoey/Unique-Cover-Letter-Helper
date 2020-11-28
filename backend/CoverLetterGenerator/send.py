import requests

headers = {}
headers["Authorization"] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA2NTgyOTQ0LCJqdGkiOiIyNWFmMzVhZGExMTI0ODg2ODUxYTY4YTg1ZGEwODkyNiIsInVzZXJfaWQiOjF9.mt1_qQoCqHG14uh2CsMbRRP2eazgktCLCWpiZqgYdLk"
# headers["Authorization"] = "Bearer 837dd45440b1b07fb88e1178544f919a5e887c4a"

r = requests.get('http://localhost:3000/api/jobs', headers = headers)

print(r.text)
