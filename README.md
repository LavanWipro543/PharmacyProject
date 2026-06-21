# Online Pharmacy Management System - Backend

A Spring Boot microservices-based backend project for an Online Pharmacy Management System. The system supports user authentication, role-based access control, medicine management, prescription management, inventory tracking, cart operations, order placement, notifications, API Gateway routing, Eureka service discovery, and Swagger-based API testing.

---

## Project Type

Backend-only microservices project.

Testing is done using Swagger UI and API Gateway endpoints. No frontend is included in this repository.

---

## Tech Stack

- Java 17
- Spring Boot 3.2.5
- Spring Cloud 2023.0.2
- Spring Cloud Gateway
- Netflix Eureka Server
- Spring Cloud Config Server
- Spring Security
- JWT Authentication
- Spring Data JPA
- MySQL
- OpenFeign
- Swagger / Springdoc OpenAPI
- Lombok
- Maven
- STS / Spring Tool Suite

---

## Microservices

```text
ONLINE-PHARMACY-SYSTEM
│
├── config-server
├── eureka-server
├── api-gateway
├── auth-service
├── medicine-service
├── prescription-service
├── inventory-service
├── cart-service
├── order-service
└── notification-service
```

---

## Service Ports

| Service | Port | Description |
|---|---:|---|
| Config Server | 8888 | Centralized configuration server |
| Eureka Server | 8761 | Service discovery registry |
| API Gateway | 8080 | Single entry point for all APIs |
| Auth Service | 8081 | Registration, login, JWT generation |
| Medicine Service | 8082 | Medicine CRUD and search |
| Prescription Service | 8083 | Prescription upload, approve, reject |
| Inventory Service | 8084 | Stock and reorder level management |
| Cart Service | 8085 | Customer cart management |
| Notification Service | 8086 | Customer notification management |
| Order Service | 8087 | Order placement and tracking |

---

## Features

### Authentication and Authorization

- User registration
- User login
- JWT token generation
- Role-based authorization
- API Gateway JWT validation

### Roles

```text
ADMIN
CUSTOMER
PHARMACIST
```

### ADMIN Access

- Full access to all APIs
- Add, update, delete medicines
- Manage inventory
- View and manage orders
- Access prescription and notification APIs

### CUSTOMER Access

- View medicines
- Upload prescription
- Add items to cart
- Place order
- View orders
- View notifications

### PHARMACIST Access

- View prescriptions
- Approve prescriptions
- Reject prescriptions

---

## Databases

Create the following MySQL databases before running services:

```sql
CREATE DATABASE pharmacy_auth_db;
CREATE DATABASE pharmacy_medicine_db;
CREATE DATABASE pharmacy_prescription_db;
CREATE DATABASE pharmacy_inventory_db;
CREATE DATABASE pharmacy_cart_db;
CREATE DATABASE pharmacy_order_db;
CREATE DATABASE pharmacy_notification_db;
```

---

## Service Startup Order

Run the services in this order:

```text
1. config-server
2. eureka-server
3. auth-service
4. medicine-service
5. prescription-service
6. inventory-service
7. cart-service
8. notification-service
9. order-service
10. api-gateway
```

---

## Eureka Dashboard

After starting Eureka Server, open:

```text
http://localhost:8761
```

All services should be visible as registered instances.

---

## Swagger URLs

### API Gateway Swagger

```text
http://localhost:8080/swagger-ui.html
```

### Individual Service Swagger URLs

```text
Auth Service:          http://localhost:8081/swagger-ui.html
Medicine Service:      http://localhost:8082/swagger-ui.html
Prescription Service:  http://localhost:8083/swagger-ui.html
Inventory Service:     http://localhost:8084/swagger-ui.html
Cart Service:          http://localhost:8085/swagger-ui.html
Notification Service:  http://localhost:8086/swagger-ui.html
Order Service:         http://localhost:8087/swagger-ui.html
```

For role-based access testing, use API Gateway URLs on port `8080`.

---

## API Gateway Base URL

```text
http://localhost:8080
```

Example:

```text
http://localhost:8080/auth-service/auth/login
http://localhost:8080/medicine-service/medicines
http://localhost:8080/cart-service/cart/add
http://localhost:8080/order-service/orders
```

---

## Authentication APIs

### Register User

```http
POST /auth-service/auth/register
```

### Login User

```http
POST /auth-service/auth/login
```

---

## Register JSON Examples

### ADMIN

```json
{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "1234",
  "role": "ADMIN"
}
```

### CUSTOMER

```json
{
  "name": "CustomerUser",
  "email": "customer@gmail.com",
  "password": "1234",
  "role": "CUSTOMER"
}
```

### PHARMACIST

```json
{
  "name": "PharmacistUser",
  "email": "pharma@gmail.com",
  "password": "1234",
  "role": "PHARMACIST"
}
```

---

## Login JSON Examples

### ADMIN Login

```json
{
  "email": "admin@gmail.com",
  "password": "1234"
}
```

### CUSTOMER Login

```json
{
  "email": "customer@gmail.com",
  "password": "1234"
}
```

### PHARMACIST Login

```json
{
  "email": "pharma@gmail.com",
  "password": "1234"
}
```

---

## JWT Authorization Format

After login, copy the JWT token and use it in Swagger/Postman as:

```text
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Main APIs

### Medicine Service

```http
POST   /medicine-service/medicines
GET    /medicine-service/medicines
GET    /medicine-service/medicines/{id}
GET    /medicine-service/medicines/category/{category}
GET    /medicine-service/medicines/search?name=para
PUT    /medicine-service/medicines/{id}
DELETE /medicine-service/medicines/{id}
```

### Prescription Service

```http
POST /prescription-service/prescriptions
GET  /prescription-service/prescriptions/{id}
GET  /prescription-service/prescriptions/customer/{customerId}
GET  /prescription-service/prescriptions/status/{status}
PUT  /prescription-service/prescriptions/{id}/approve
PUT  /prescription-service/prescriptions/{id}/reject
```

### Inventory Service

```http
POST /inventory-service/inventory
GET  /inventory-service/inventory
GET  /inventory-service/inventory/{medicineId}
PUT  /inventory-service/inventory/{medicineId}
PUT  /inventory-service/inventory/increase-stock
PUT  /inventory-service/inventory/reduce-stock
GET  /inventory-service/inventory/check-stock?medicineId=1&quantity=5
```

### Cart Service

```http
POST   /cart-service/cart/add
PUT    /cart-service/cart/update
DELETE /cart-service/cart/remove/{customerId}/{medicineId}
GET    /cart-service/cart/{customerId}
DELETE /cart-service/cart/clear/{customerId}
```

### Order Service

```http
POST /order-service/orders
GET  /order-service/orders/{orderId}
GET  /order-service/orders/customer/{customerId}
GET  /order-service/orders
PUT  /order-service/orders/{orderId}/status/{status}
PUT  /order-service/orders/{orderId}/cancel
```

### Notification Service

```http
POST /notification-service/notifications/send
GET  /notification-service/notifications/customer/{customerId}
GET  /notification-service/notifications
```

---

## Sample Request JSONs

### Add Medicine

```json
{
  "name": "Paracetamol",
  "description": "Used for fever and mild pain relief",
  "price": 25.0,
  "category": "OTC_MEDICINE",
  "prescriptionRequired": false
}
```

### Add Prescription Medicine

```json
{
  "name": "Amoxicillin",
  "description": "Antibiotic medicine used for bacterial infections",
  "price": 180.0,
  "category": "PRESCRIPTION_MEDICINE",
  "prescriptionRequired": true
}
```

### Add Inventory

```json
{
  "medicineId": 2,
  "availableQuantity": 100,
  "reorderLevel": 10
}
```

### Upload Prescription

```json
{
  "customerId": 1,
  "doctorName": "Dr. Lavan",
  "imageUrl": "lavan.png"
}
```

### Add To Cart

```json
{
  "customerId": 1,
  "medicineId": 2,
  "quantity": 2
}
```

### Place Order

```json
{
  "customerId": 1
}
```

### Send Notification

```json
{
  "customerId": 1,
  "message": "Order placed successfully"
}
```

---

## Complete Demo Flow

```text
1. Register ADMIN, CUSTOMER, and PHARMACIST.
2. Login as ADMIN and copy JWT token.
3. ADMIN adds medicines.
4. ADMIN/PHARMACIST adds inventory using medicineId.
5. CUSTOMER logs in and copies JWT token.
6. CUSTOMER views medicines.
7. CUSTOMER uploads prescription if required.
8. PHARMACIST logs in and approves/rejects prescription.
9. CUSTOMER adds medicine to cart.
10. CUSTOMER places order.
11. ORDER-SERVICE reduces inventory stock.
12. ORDER-SERVICE clears cart.
13. ORDER-SERVICE sends notification.
14. CUSTOMER views order and notifications.
```

---

## Role-Based Access Validation

### ADMIN

```text
Can access all APIs.
```

### CUSTOMER Allowed

```text
GET  /medicine-service/medicines
POST /cart-service/cart/add
POST /order-service/orders
GET  /order-service/orders
POST /prescription-service/prescriptions
```

### CUSTOMER Blocked

```text
POST   /medicine-service/medicines
PUT    /medicine-service/medicines/{id}
DELETE /medicine-service/medicines/{id}
POST   /inventory-service/inventory
PUT    /prescription-service/prescriptions/{id}/approve
```

### PHARMACIST Allowed

```text
All /prescription-service/prescriptions APIs
```

### PHARMACIST Blocked

```text
Medicine POST/PUT/DELETE
Cart APIs
Order APIs
Inventory APIs if not allowed in Gateway filter
```

---

## Important Notes

- API Gateway is the single entry point on port `8080`.
- For role-based testing, always use Gateway URLs.
- Direct service Swagger URLs may bypass Gateway authorization.
- `medicineId` is the `id` generated by Medicine Service.
- Inventory must be added separately after adding medicines.
- `reorderLevel` is the minimum stock threshold for low-stock indication.
- Use `localhost` consistently to avoid CORS issues.

---

## Troubleshooting

### CORS Issue

Use Gateway URLs:

```text
http://localhost:8080/<service-name>/...
```

Avoid mixing:

```text
localhost
192.168.x.x
```

### Customer Can Delete Medicine

Check if request is going through Gateway:

```text
Correct: http://localhost:8080/medicine-service/medicines/{id}
Wrong:   http://localhost:8082/medicines/{id}
```

### Feign Client Bean Not Found

Add this annotation in the main application class:

```java
@EnableFeignClients
```

### Swagger Executes Direct Service Port

Add `@Server(url = "/service-name")` in each service `OpenApiConfig.java`.

---

## Project Status

```text
Backend microservices completed.
Swagger testing supported.
API Gateway routing supported.
JWT authentication implemented.
Role-based access implemented.
```

---

## Author

Online Pharmacy Management System - Backend Project
