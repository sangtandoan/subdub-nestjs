GET {{HOST}}/categories

GET {{HOST}}/categories/10f5659b-8ad3-4fa8-9119-1c061a6ddf06

POST {{HOST}}/categories

{
    "name": "Other2",
    "description": "Other category",
    "user_id": "0ecace4c-0fad-4d9e-996c-b0bdd5bb2702"
}

PATCH {{HOST}}/categories/10f5659b-8ad3-4fa8-9119-1c061a6ddf06

{
    "name": "Test description"
}

