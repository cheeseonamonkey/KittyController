# Kitty Kontroller - README

## Overview

Kitty Kontroller is a simple web app to manage and monitor the status of cats (whether they are inside or outside). It includes an interactive UI to toggle each cat's status and features an API for external integration.


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

#### Test results:


```diff
 PASS  tests/server.test.js
  API endpoints
    Cats
      Fetch Operations
+        ✓ fetches all cats (34 ms)
+        ✓ fetches a specific cat (3 ms)
+        ✓ handles invalid cat names (64 ms)
+        ✓ handles unknown parameters gracefully (2 ms)
+        ✓ is case-insensitive for cat names (2 ms)
+        ✓ returns correct headers (3 ms)
      Update Operations
+        ✓ updates cat outside status (7 ms)
+        ✓ handles invalid isOutside values (5 ms)
+        ✓ handles concurrent updates correctly (7 ms)
+        ✓ toggles outside multiple times (19 ms)
+        ✓ handles idempotent updates (4 ms)
+        ✓ sets all cats to outside (6 ms)

Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        0.586 s, estimated 1 s
Ran all test suites.
```

---


---

## License

This project is licensed under the MIT License.