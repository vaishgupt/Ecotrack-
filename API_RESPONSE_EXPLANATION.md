# API Response Structure Explanation

## 1. Success Response: `res.data.data`

### Backend Code (FootprintController.js - lines 92-103):
```javascript
res.status(200).json({
  message: "Carbon footprint calculated successfully",
  data: {                                    // ← This is the "data" object
    id: footprint._id,
    transportation: footprint.transportation,
    distance: footprint.distance,
    electricity: footprint.electricity,
    diet: footprint.diet,
    carbonFootprint: footprint.carbonFootprint.toFixed(2),
    date: footprint.date
  }
});
```

### How Axios Wraps It:
When backend sends: `{ message: "...", data: { ... } }`

Axios wraps it in: 
```javascript
{
  data: {                    // ← Axios adds this "data" wrapper
    message: "...",
    data: {                  // ← Your backend's "data" object
      id: "...",
      transportation: "...",
      // etc.
    }
  }
}
```

### So in Frontend:
```javascript
const res = await axios.post(...);
// res.data = { message: "...", data: { id: "...", ... } }
// res.data.data = { id: "...", transportation: "...", ... }  ← The actual data we want!
setResult(res.data.data);  // Gets the inner "data" object
```

---

## 2. Error Response: `err.response.data.message`

### Backend Error Code (FootprintController.js - lines 106-109):
```javascript
res.status(500).json({
  message: "Calculation failed",    // ← This is the "message" field
  error: err.message
});
```

### Or Validation Error (lines 36-41):
```javascript
return res.status(400).json({
  message: "All data required",     // ← This is the "message" field
  error: "Please fill all fields..."
});
```

### How Axios Wraps Errors:
When backend sends error: `{ message: "All data required", error: "..." }`

Axios wraps it in:
```javascript
{
  response: {                 // ← Axios error has "response" property
    status: 400,
    data: {                   // ← Your backend's error object
      message: "All data required",
      error: "..."
    }
  }
}
```

### So in Frontend:
```javascript
catch (err) {
  // err.response = { status: 400, data: { message: "...", error: "..." } }
  // err.response.data = { message: "...", error: "..." }
  // err.response.data.message = "All data required"  ← The message we want!
  setError(err.response.data.message);
}
```

---

## Visual Flow:

### Success Flow:
```
Backend: res.json({ message: "...", data: { ... } })
    ↓
Axios wraps: { data: { message: "...", data: { ... } } }
    ↓
Frontend: res.data.data  ← Gets the inner data object
```

### Error Flow:
```
Backend: res.status(400).json({ message: "Error", error: "..." })
    ↓
Axios wraps: { response: { status: 400, data: { message: "Error", error: "..." } } }
    ↓
Frontend: err.response.data.message  ← Gets the message
```

---

## Summary:

1. **`res.data.data`** comes from:
   - Backend sends: `{ message: "...", data: { ... } }`
   - Axios wraps: `{ data: { message: "...", data: { ... } } }`
   - Frontend accesses: `res.data.data` (the inner data object)

2. **`err.response.data.message`** comes from:
   - Backend sends: `{ message: "Error message", error: "..." }`
   - Axios wraps: `{ response: { data: { message: "Error message", ... } } }`
   - Frontend accesses: `err.response.data.message` (the message field)

This is standard Axios behavior - it always wraps responses in a `data` property!
