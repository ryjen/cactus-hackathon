# API Endpoint Specification

## Overview
**Endpoint**: `[METHOD] /api/v1/resource`
**Description**: [Short description of what this endpoint does]

## Request

### Headers
- `Authorization`: Bearer [token]

### Body
```json
{
  "field": "type",
  "optional?": "type"
}
```

### Query Parameters
- `page`: number
- `limit`: number

## Response

### Success (200 OK)
```json
{
  "data": {
    ...
  }
}
```

### Error (4xx/5xx)
```json
{
  "error": "code",
  "message": "description"
}
```

## Security
- [ ] Authentication required?
- [ ] Rate limiting?
- [ ] Input validation?
