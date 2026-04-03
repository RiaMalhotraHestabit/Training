# QUERY ENGINE & SOFT DELETE — DAY 3

## Overview

This document explains the **Advanced Query Engine** and **Soft Delete mechanism** implemented in the Product API as part of **Day 3 — High-Performance REST API**.

The goal of Day 3 is to build **production-grade APIs** that support:

* Dynamic searching
* Advanced filtering & sorting
* Pagination
* Soft deletes
* Centralized error handling

---

## Architecture Flow

The API follows a **clean layered architecture**:

```
Route → Controller → Service → Repository → Model (MongoDB)
```

### Responsibilities

* **Controller**: Handles HTTP request/response
* **Service**: Business logic & validations
* **Repository**: Database queries (MongoDB / Mongoose)
* **Model**: Schema, indexes, virtuals

---

## Advanced Query Engine

### Supported Query Parameters

Example request:

```
GET /products?search=phone&minPrice=100&maxPrice=500&sort=price:desc&page=1&limit=10
```

| Parameter        | Description                  |
| ---------------- | ---------------------------- |
| `search`         | Regex search on product name |
| `minPrice`       | Minimum product price        |
| `maxPrice`       | Maximum product price        |
| `sort`           | Sorting format: field:order  |
| `page`           | Page number for pagination   |
| `limit`          | Records per page             |
| `includeDeleted` | Include soft-deleted records |

---

### Search Logic

* Uses **MongoDB regex** for partial text matching
* Case-insensitive search

Example query logic:

```
{
  name: { $regex: search, $options: "i" }
}
```

---

### Filtering Logic

Dynamic filters are constructed based on query parameters:

* Price range filter:

```
price: { $gte: minPrice, $lte: maxPrice }
```

* Soft delete filter (default):

```
deletedAt: null
```

---

### Sorting

Sorting format:

```
sort=price:desc
```

Converted internally to:

```
{ price: -1 }
```

---

### Pagination

Pagination uses **skip & limit** strategy:

```
skip = (page - 1) * limit
```

Returned response includes:

* total records
* current page
* limit

---

## Soft Delete Implementation

### What is Soft Delete?

Soft delete **does not remove data** from the database.
Instead, it marks a record as deleted using a timestamp.

---

### Schema Implementation

Product model includes:

```
deletedAt: { type: Date, default: null }
```

---

### Delete API Behavior

Endpoint:

```
DELETE /products/:id
```

Instead of removing the document:

* `deletedAt` is set to the current timestamp

Example:

```
{ deletedAt: new Date() }
```

---

## Global Error Handling

All errors follow a **standardized format**:

```json
{
  "success": false,
  "message": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "ISO_TIME",
  "path": "/api/path"
}
```

### Benefits

* Consistent API responses
* Easy debugging
* Frontend-friendly

---