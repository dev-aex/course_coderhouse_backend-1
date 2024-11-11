# Instruments E-commerce API
API for a musical instrument e-commerce as a final project for the Backend-1 course at CoderHouse.

# Getting Started

## Install dependencies

```
$ npm install
```

## Deploy the project

```
$ npm run dev
```

## Endpoints

### 1. Products
```
 http://localhost:8080/api/products
 ```
---
#### GET all products
```
http://localhost:8080/api/products
```
or
```
http://localhost:8080/api/products?limit=0
```
---
#### GET a limit quantity of products
```
http://localhost:8080/api/products?limit=[QUANTITY]
```
  **Example limit=2**
  
[ GET ] http://localhost:8080/api/products?limit=2

---
#### GET product by ID
```
http://localhost:8080/api/products/p:id
```
**Example ID=1**

[ GET ] http://localhost:8080/api/products/p1

---
#### POST new product
```
http://localhost:8080/api/products
```
**Example new product**

[ POST ] http://localhost:8080/api/products

[ BODY ]
```
{
    "name": "Guitarrita",
    "code": "A1",
    "brand": "Guitarras Manuel",
    "category": "electric guitar",
    "price": 94.99,
    "description": "Una guitarra para comenzar.",
    "thumbnail": "guitarrita-manuel.webp",
    "stock": 2,
    "status": true
}
```

---
#### PUT a product by ID
```
http://localhost:8080/api/products/p:id
```
**Example update a products ID=10 name**

[ PUT ] http://localhost:8080/api/products/p10

[ BODY ]
```
{
    "name": "Guitarron 12"
}
```

---
#### DELETE a product by ID
```
http://localhost:8080/api/products/p:id
```
**Example delete product ID=1**

[ DELETE ] http://localhost:8080/api/products/p1

---
### 2. Carts
```
 http://localhost:8080/api/carts
 ```
---
#### GET all carts
```
http://localhost:8080/api/carts
```
or
```
http://localhost:8080/api/carts?limit=0
```
---
#### GET a limit quantity of carts
```
http://localhost:8080/api/carts?limit=[QUANTITY]
```
  **Example limit=1**
  
[ GET ] http://localhost:8080/api/carts?limit=1

---
#### GET carts by ID
```
http://localhost:8080/api/carts/c:id
```
**Example ID=1**

[ GET ] http://localhost:8080/api/carts/c1

---
#### POST new cart
```
http://localhost:8080/api/carts
```
**Example new empty cart**

[ POST ] http://localhost:8080/api/carts

[ BODY ]
```
{
  {
    "products": [
    ]
  }
}
```

---
#### POST a product to a existing cart
```
http://localhost:8080/api/carts/c:id/products/p:id
```
**Example add product ID=1 to cart ID=1**

[ POST ] http://localhost:8080/api/carts/c1/products/p1

---
#### PUT a cart by ID
```
http://localhost:8080/api/carts/c:id
```
**Example update a cart ID=1 products**

[ PUT ] http://localhost:8080/api/carts/c1

[ BODY ]
```
  {
    "products": [
      {
        "id": 3,
		"quantity": 6
      }
    ]
  }
```

---
#### DELETE a cart by ID
```
http://localhost:8080/api/carts/c:id
```
**Example delete cart ID=1**

[ DELETE ] http://localhost:8080/api/carts/c1

---

# Build with

- Node.js
- Express.js
- Nodemon
- Moment.js
- Multer
- Eslint

# Course information
- Class: **70365**
- Instructor: **Sergio Regalado Alessi**
- Tutor: **Saúl Belbey**

