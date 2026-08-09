# HTTP Server Task

## Description

Build a simple HTTP Server with following features.

### 1. GET `/`
Send a simple "Hello from Server" message.

### 2. GET `/contact-us`
Send your email and contact number to the user.

### 3. POST `/tweet`
Perform a fake database operation and send an acknowledgment that it is completed.

### 4. GET `/tweet`
Send all tweets from the fake database to the user.

---

## Additional Requirement

Log all incoming requests with timestamps in a file named:

```txt
log.txt
```
### Example Responses

#### GET `/`
```json
{
  "message": "Hello from Server"
}