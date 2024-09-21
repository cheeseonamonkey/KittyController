Here’s a more concise version of your README for Kitty Kontroller:

---

# Kitty Kontroller - README

Kitty Kontroller is a web app to manage and monitor the status of cats, tracking whether they are inside or outside.

> 1. [Usage](#usage)  
> 2. [API Documentation](#api-documentation)  
> &nbsp;&nbsp;&nbsp; - [1.1 Get All Cats](#1-get-all-cats)  
> &nbsp;&nbsp;&nbsp; - [1.2 Get Cat by Name](#2-get-cat-by-name)  
> &nbsp;&nbsp;&nbsp; - [1.3 Update Cat's Outside Status](#3-update-cats-outside-status)  
> &nbsp;&nbsp;&nbsp; - [1.4 Error Responses](#error-responses)  
> 3. [Tests](#tests)  
> 4. [Release Notes](#release-version-notes)  
> 5. [License](#license)  

## Usage

Access the live site: [Kitty Kontroller](https://kittykontroller.azurewebsites.net).

### Building Locally
1. Clone the repository.
```bash
git clone https://github.com/cheeseonamonkey/KittyController/ -O ./KittyKontroller
```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
Visit `http://localhost:3000` in your browser.

---

## API Documentation
API documentation is available at: [API Docs](https://kittykontroller.azurewebsites.net/api/).

### 1. **Get All Cats**
- **Endpoint**: `GET /api/cats`
- **Response**: `200 OK`, Array of cat objects.

### 2. **Get Cat by Name**
- **Endpoint**: `GET /api/cats/:name`
- **Parameters**: `name` (case-insensitive).
- **Response**: `200 OK`, Cat object.

### 3. **Update Cat's Outside Status**
- **Endpoint**: `GET /api/cats/:name?isOutside=<boolean>`
- **Parameters**: `name` (case-insensitive), `isOutside` (Boolean).
- **Response**: `204 No Content` on success.

### Error Responses:
- `404 Not Found`: Cat not found.
- `422 Unprocessable Entity`: Invalid `isOutside` value.
- `500 Internal Server Error`: Unexpected error.

---

## Tests
Unit tests can be run with:
```bash
npx test
```

<details>
<summary><b><u>Test Results</u></b>:</summary>
<pre style="font-family: monospace;">
<h4> Fetch Operations: </h4>
- ✅ **Fetches all cats** — _34ms_
- ✅ **Fetches a specific cat** — _3ms_
- ✅ **Handles invalid cat names** — _64ms_

<h4> Update Operations: </h4>
- ✅ **Updates cat outside status** — _7ms_
- ✅ **Handles invalid `isOutside` values** — _5ms_
- ✅ **Handles concurrent updates correctly** — _7ms_

- **Test Suites**: ✅ 1 passed
- **Tests**: ✅ 12 passed
</pre>
</details>

---

## Release Notes

#### 0.1
- MVP
#### 0.2
- thorough unit testing
#### 0.3
- styling improvements _(tailwindcss)_
- debug/utility buttons:
  - show/hide seconds checkbox
  - force update
  - force refresh when page is stale
  - refresh button
  - last updated time for each cat
#### Planned:
- (server-sidez) Do not update time if the existing time is within the last 60 seconds.
- 
#### Maybe in the future?
- wrap as android app
- push notifications?
- password authentication? 


---

## License

Licensed under the MIT License.

--- 

This version maintains all essential details while being more concise!