# Cat Tracking API Documentation

### 1. Get All Cats
- Endpoint: `GET /api/cats`
- Response: 
  - Status Code: 200 OK
  - Body: Array of cat objects

### 2. Get Cat by Name
- Endpoint: `GET /api/cats/:name`
- Parameters: 
  - `name`: Cat's name (case-insensitive)
- Response:
  - Status Code: 200 OK
  - Body: Cat object

### 3. Update Cat's Outside Status
- Endpoint: `GET /api/cats/:name?isOutside=<boolean>`
- Parameters:
  - `name`: Cat's name (case-insensitive)
  - `isOutside`: Boolean ("true" or "false")
- Response:
  - Status Code: 204 No Content (on success)

### Error Responses:
- 404 Not Found: Cat not found.
- 422 Unprocessable Entity: Invalid `isOutside` value.
- 500 Internal Server Error: Unexpected server error.

Notes:
- Case-insensitive for cat names.
- isOutside parameter is optional for retrieving cat info.
- Idempotent updates for outside status.

--- 

This version retains essential information while being more concise.