# Kitty Kontroller - README

Kitty Kontroller is a simple web app to manage and monitor the status of cats (whether they are inside or outside).


---

## API Documentation
Can also be found at: `/api/`.

### 1. **Get All Cats**
- **Endpoint**: `GET /api/cats`
- **Response**: 
  - Status: `200 OK`
  - Body: Array of cat objects.

### 2. **Get Cat by Name**
- **Endpoint**: `GET /api/cats/:name`
- **Parameters**: 
  - `name`: Cat's name (case-insensitive).
- **Response**:
  - Status: `200 OK`
  - Body: Cat object.

### 3. **Update Cat's Outside Status**
- **Endpoint**: `GET /api/cats/:name?isOutside=<boolean>`
- **Parameters**:
  - `name`: Cat's name (case-insensitive).
  - `isOutside`: Boolean (`true` or `false`).
- **Response**:
  - Status: `204 No Content` on success.

### Error Responses:
- `404 Not Found`: Cat not found.
- `422 Unprocessable Entity`: Invalid `isOutside` value.
- `500 Internal Server Error`: Unexpected error.

---

## Tests

Thorough unit testing is implemented; while hosting on port 3000, to run tests:
```bash
npx test
```

### <u>Test results</u>:

<details>
<pre style="font-family: monospace;">

<h4> Fetch Operations: </h4>
- <span style="color: green;">&#x2705;</span> **Fetches all cats** — _34ms_
- <span style="color: green;">&#x2705;</span> **Fetches a specific cat** — _3ms_
- <span style="color: green;">&#x2705;</span> **Handles invalid cat names** — _64ms_
- <span style="color: green;">&#x2705;</span> **Handles unknown parameters gracefully** — _2ms_
- <span style="color: green;">&#x2705;</span> **Case-insensitive for cat names** — _2ms_
- <span style="color: green;">&#x2705;</span> **Returns correct headers** — _3ms_

<h4> Update Operations: </h4>
- <span style="color: green;">&#x2705;</span> **Updates cat outside status** — _7ms_
- <span style="color: green;">&#x2705;</span> **Handles invalid `isOutside` values** — _5ms_
- <span style="color: green;">&#x2705;</span> **Handles concurrent updates correctly** — _7ms_
- <span style="color: green;">&#x2705;</span> **Toggles outside status multiple times** — _19ms_
- <span style="color: green;">&#x2705;</span> **Handles idempotent updates** — _4ms_
- <span style="color: green;">&#x2705;</span> **Sets all cats to outside status** — _6ms_

---


- **Test Suites**: <span style="color: green;">1 passed</span>, 1 total
- **Tests**: <span style="color: green;">12 passed</span>, 12 total


</pre>
</details>




## License

This project is licensed under the MIT License.