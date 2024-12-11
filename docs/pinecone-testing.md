# Pinecone Vector Testing Guide

This guide outlines the process for testing vector insertion into Pinecone using Postman.

## Prerequisites

1. Pinecone Index Details:
   - Environment: us-east-1
   - Index Name: quora-project-index
   - Dimension: 1536 (OpenAI embeddings dimension)

2. Required Credentials:
   - Pinecone API Key (from Pinecone Console)

## Testing Process using Postman

### 1. Configure the Request

Create a new POST request in Postman with the following details:

**URL:**
```
https://quora-project-index-us-east-1.svc.pinecone.io/vectors/upsert
```

**Headers:**
```
Api-Key: your-pinecone-api-key
Content-Type: application/json
```

### 2. Request Body

Use the following JSON structure:

```json
{
  "vectors": [
    {
      "id": "test-doc-001",
      "values": [0.1, 0.2, ...],  // Array of 1536 float values
      "metadata": {
        "title": "Test Document",
        "content": "This is a test document for vector insertion.",
        "source": "test-suite"
      }
    }
  ]
}
```

### 3. Test Vector Generation

For testing purposes, you can use this JavaScript code in your browser console to generate a test vector:

```javascript
const dimension = 1536;
const testVector = Array.from({ length: dimension }, () => Math.random());
console.log(JSON.stringify(testVector));
```

### 4. Verification

A successful response should look like:

```json
{
  "upsertedCount": 1
}
```

### 5. Query Verification

To verify the insertion, create a new POST request:

**URL:**
```
https://quora-project-index-us-east-1.svc.pinecone.io/vectors/fetch
```

**Body:**
```json
{
  "ids": ["test-doc-001"]
}
```

The response should include your test vector and metadata.

## Troubleshooting

Common issues and solutions:

1. 401 Unauthorized
   - Verify your API key is correct
   - Check if the API key has proper permissions

2. 404 Not Found
   - Verify the index name and environment
   - Ensure the index is active in Pinecone console

3. 400 Bad Request
   - Check vector dimension matches index configuration
   - Verify JSON format is correct
   - Ensure vector values are valid floats

## Next Steps

After successful testing:
1. Document the working configuration
2. Update application environment variables if needed
3. Implement proper error handling in the application
4. Consider adding automated tests

## Security Notes

- Never commit API keys to version control
- Rotate API keys if they've been exposed
- Use environment variables for sensitive data
- Implement proper access controls in production