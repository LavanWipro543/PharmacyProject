# Online Pharmacy Management System

A full-stack capstone project for an **Online Pharmacy Management System** built with a Spring Boot microservices backend and an Angular frontend. The backend is designed using API Gateway, Eureka Service Discovery, JWT authentication, role-based authorization, MySQL databases, Feign Client inter-service communication, and Swagger/OpenAPI API testing.

> **Current Status**
>
> - Backend: Completed and tested through Swagger/API Gateway.
> - Frontend: Angular frontend structure and major pages are planned/in-progress. The frontend will consume only API Gateway endpoints.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Backend Microservices](#backend-microservices)
- [Frontend Application](#frontend-application)
- [Roles and Authorization](#roles-and-authorization)
- [Database Setup](#database-setup)
- [Service Startup Order](#service-startup-order)
- [API Gateway Routes](#api-gateway-routes)
- [Swagger URLs](#swagger-urls)
- [Authentication JSON Examples](#authentication-json-examples)
- [Core API Endpoints](#core-api-endpoints)
- [Sample Request JSONs](#sample-request-jsons)
- [Prescription-Based Medicine Flow](#prescription-based-medicine-flow)
- [Inventory and Order Flow](#inventory-and-order-flow)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Testing Guide](#testing-guide)
- [Important Notes](#important-notes)
- [Future Enhancements](#future-enhancements)

---

## Project Overview

The **Online Pharmacy Management System** is designed to manage online pharmacy operations such as user registration, login, medicine management, prescription upload and approval, inventory management, cart management, order placement, and notifications.

The project follows a microservices architecture where every service has a separate responsibility and database. The API Gateway acts as the central entry point for clients and performs JWT validation and role-based authorization.

---

## Key Features

### Backend Features

- User registration and login
- JWT-based authentication
- Role-based access control
- API Gateway routing
- Eureka service discovery
- Centralized configuration support
- Medicine CRUD operations
- Prescription upload, approve, and reject workflow
- Inventory stock and reorder level management
- Cart management
- Order placement
- Stock reduction during order placement
- Notification creation and viewing
- Swagger/OpenAPI testing
- Feign Client communication between services
- Global exception handling

### Frontend Features Planned / In Progress

- Angular-based pharmacy portal
- Public home page
- Login and registration pages
- Role-based dashboards
- Admin dashboard
- Customer dashboard
- Pharmacist dashboard
- Medicine listing and management
- Inventory management page
- Cart page
- Orders page
- Prescription upload page
- Prescription approval/rejection page
- Notifications page
- Profile page
- JWT interceptor
- Role guard
- Dynamic navbar and logout

---

## System Architecture

```text
Angular Frontend
      |
      v
API Gateway : 8080
      |
      +--> AUTH-SERVICE : 8081
      +--> MEDICINE-SERVICE : 8082
      +--> PRESCRIPTION-SERVICE : 8083
      +--> INVENTORY-SERVICE : 8084
      +--> CART-SERVICE : 8085
      +--> NOTIFICATION-SERVICE : 8086
      +--> ORDER-SERVICE : 8087

Supporting Services:

CONFIG-SERVER : 8888
EUREKA-SERVER : 8761
```

The frontend must call only API Gateway URLs on port `8080`. Direct service calls such as `8081`, `8082`, or `8083` should be avoided in the frontend because Gateway security and routing are bypassed.

---

## Technology Stack

### Backend

- Java 17
- Spring Boot 3.2.5
- Spring Cloud 2023.0.2
- Spring Cloud Gateway
- Netflix Eureka Server
- Spring Cloud Config Server
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- MySQL
- OpenFeign
- Swagger / Springdoc OpenAPI
- Maven
- Lombok
- STS / Spring Tool Suite

### Frontend

- Angular
- TypeScript
- HTML
- CSS
- Bootstrap
- Angular Routing
- Angular Services
- HTTP Interceptor
- Route Guards
- LocalStorage for JWT session data

---

## Backend Microservices

```text
online-pharmacy-system
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

| Service | Port | Responsibility |
|---|---:|---|
| Config Server | 8888 | Centralized configuration |
| Eureka Server | 8761 | Service discovery and registration |
| API Gateway | 8080 | Single entry point, routing, JWT validation, role checks |
| Auth Service | 8081 | Register, login, JWT generation |
| Medicine Service | 8082 | Medicine CRUD and search |
| Prescription Service | 8083 | Upload, approve, reject prescriptions |
| Inventory Service | 8084 | Stock and reorder level management |
| Cart Service | 8085 | Customer cart management |
| Notification Service | 8086 | Notification management |
| Order Service | 8087 | Order placement and order tracking |

---

## Frontend Application

The Angular frontend is intended to provide a professional pharmacy portal UI for different roles.

```text
online-pharmacy-frontend
│
├── src/app
│   ├── core
│   │   ├── guards
│   │   ├── interceptors
│   │   └── services
│   │
│   ├── pages
│   │   ├── home
│   │   ├── login
│   │   ├── register
│   │   ├── profile
│   │   ├── medicines
│   │   ├── inventory
│   │   ├── cart
│   │   ├── orders
│   │   ├── prescriptions
│   │   ├── notifications
│   │   ├── admin
│   │   │   ├── admin-dashboard
│   │   │   └── all-orders
│   │   ├── customer
│   │   │   └── customer-dashboard
│   │   └── pharmacist
│   │       ├── pharmacist-dashboard
│   │       └── prescription-management
│   │
│   └── shared
│       ├── navbar
│       └── footer
```

### Frontend API Base URL

```text
http://localhost:8080
```

Example frontend service URL:

```ts
private baseUrl = 'http://localhost:8080/auth-service/auth';
```

---

## Roles and Authorization

### ADMIN

- Full access to all APIs
- Can manage medicines
- Can manage inventory
- Can view all orders
- Can view/manage prescriptions
- Can access admin dashboard

### CUSTOMER

- Can register and login
- Can view medicines
- Can upload prescriptions
- Can add approved/OTC medicines to cart
- Can place orders
- Can view own orders
- Can view notifications

### PHARMACIST

- Can register only with secret key
- Can login
- Can view prescriptions
- Can approve prescriptions
- Can reject prescriptions

---

## Privileged Registration Security

To prevent unauthorized users from registering as ADMIN or PHARMACIST, privileged roles require a secret key.

### Customer Registration

No secret required.

```json
{
  "name": "CustomerUser",
  "email": "customer@gmail.com",
  "password": "1234",
  "role": "CUSTOMER"
}
```

### Admin Registration

Secret required.

```json
{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "1234",
  "role": "ADMIN",
  "adminSecret": "PHARMACY_ADMIN_2026"
}
```

### Pharmacist Registration

Secret required.

```json
{
  "name": "PharmacistUser",
  "email": "pharma@gmail.com",
  "password": "1234",
  "role": "PHARMACIST",
  "adminSecret": "PHARMACY_ADMIN_2026"
}
```

---

## Database Setup

Create these MySQL databases before starting services:

```sql
CREATE DATABASE pharmacy_auth_db;
CREATE DATABASE pharmacy_medicine_db;
CREATE DATABASE pharmacy_prescription_db;
CREATE DATABASE pharmacy_inventory_db;
CREATE DATABASE pharmacy_cart_db;
CREATE DATABASE pharmacy_order_db;
CREATE DATABASE pharmacy_notification_db;
```

Each microservice owns its own database.

---

## Service Startup Order

Start services in this order:

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
11. angular frontend
```

---

## API Gateway Routes

All frontend calls should go through:

```text
http://localhost:8080
```

Example routes:

```text
/auth-service/auth/login
/auth-service/auth/register
/medicine-service/medicines
/prescription-service/prescriptions
/inventory-service/inventory
/cart-service/cart/add
/order-service/orders
/notification-service/notifications
```

---

## Swagger URLs

### Gateway Swagger

```text
http://localhost:8080/swagger-ui.html
```

### Individual Swagger URLs

```text
Auth Service:          http://localhost:8081/swagger-ui.html
Medicine Service:      http://localhost:8082/swagger-ui.html
Prescription Service:  http://localhost:8083/swagger-ui.html
Inventory Service:     http://localhost:8084/swagger-ui.html
Cart Service:          http://localhost:8085/swagger-ui.html
Notification Service:  http://localhost:8086/swagger-ui.html
Order Service:         http://localhost:8087/swagger-ui.html
```

For role-based testing, use only Gateway URLs on port `8080`.

---

## Authentication JSON Examples

### Login as Admin

```json
{
  "email": "admin@gmail.com",
  "password": "1234"
}
```

### Login as Customer

```json
{
  "email": "customer@gmail.com",
  "password": "1234"
}
```

### Login as Pharmacist

```json
{
  "email": "pharma@gmail.com",
  "password": "1234"
}
```

### Expected Login Response

```json
{
  "token": "JWT_TOKEN",
  "tokenType": "Bearer",
  "userId": 1,
  "name": "CustomerUser",
  "email": "customer@gmail.com",
  "role": "CUSTOMER"
}
```

The frontend stores these values in `localStorage`:

```text
token
role
email
name
customerId
```

---

## Core API Endpoints

### Auth Service

```http
POST /auth-service/auth/register
POST /auth-service/auth/login
GET  /auth-service/auth/test
```

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
GET    /cart-service/cart/{customerId}
DELETE /cart-service/cart/remove/{customerId}/{medicineId}
DELETE /cart-service/cart/clear/{customerId}
```

### Order Service

```http
POST /order-service/orders
GET  /order-service/orders
GET  /order-service/orders/{orderId}
GET  /order-service/orders/customer/{customerId}
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
  "imageUrl": "prescription.png"
}
```

### Add to Cart

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

---

## Prescription-Based Medicine Flow

### OTC Medicine

```text
Medicine prescriptionRequired = false
        |
        v
Customer can add to cart directly
        |
        v
Customer can place order
```

### Prescription Medicine

```text
Medicine prescriptionRequired = true
        |
        v
Customer uploads prescription
        |
        v
Prescription status = PENDING
        |
        v
Pharmacist approves prescription
        |
        v
Prescription status = APPROVED
        |
        v
Customer can add medicine to cart
        |
        v
Customer can place order
```

If prescription is not approved, Cart Service blocks adding prescription-required medicine to cart.

---

## Inventory and Order Flow

```text
Admin adds medicine
        |
        v
Admin adds inventory using medicineId
        |
        v
Customer adds medicine to cart
        |
        v
Customer places order
        |
        v
Order Service gets cart details
        |
        v
Order Service reduces inventory stock
        |
        v
Order Service clears cart
        |
        v
Order Service sends notification
```

---

## Frontend Setup

Create Angular project:

```bash
ng new online-pharmacy-frontend --routing --style=css --standalone=false
```

Move into project:

```bash
cd online-pharmacy-frontend
```

Install Bootstrap:

```bash
npm install bootstrap
```

Add Bootstrap in `angular.json`:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
```

Run frontend:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

---

## Backend Setup

Run each Spring Boot service from STS or terminal using Maven:

```bash
mvn spring-boot:run
```

Recommended run order:

```text
config-server
Eureka-server
auth-service
medicine-service
prescription-service
inventory-service
cart-service
notification-service
order-service
api-gateway
```

---

## Testing Guide

### Register Users

Use Auth APIs through Gateway.

### Login

Copy the JWT token from response.

### Swagger Authorization

Use:

```text
Bearer JWT_TOKEN
```

### Role Testing

Use Gateway endpoints only:

```text
http://localhost:8080/<service-name>/...
```

Do not use direct microservice ports for role-based testing.

---

## Important Notes

- `medicineId` is generated by Medicine Service when medicine is added.
- Inventory does not automatically get created when medicine is added.
- Inventory must be added separately using `medicineId`.
- `reorderLevel` is the minimum stock threshold.
- API Gateway must handle CORS for Angular frontend.
- Login and register APIs should not require JWT token.
- Privileged roles such as ADMIN and PHARMACIST require `adminSecret`.
- Customer self-registration does not require secret key.
- Frontend should use only API Gateway URLs.

---

## Future Enhancements

- Complete Angular frontend with advanced UI polishing
- Add real dashboard statistics
- Add medicine update form
- Add inventory update form
- Add payment gateway integration
- Add email/SMS notifications
- Add Docker deployment
- Add Kubernetes deployment
- Add centralized logging
- Add distributed tracing
- Add audit logs
- Add unit tests and integration tests

---

## Project Status

```text
Backend: Completed
Frontend: In Progress / Future Enhancement
Authentication: Completed
JWT Authorization: Completed
Swagger Testing: Completed
Role-Based Access: Completed
Prescription Approval Flow: Completed
Inventory and Order Flow: Completed
```

---

## Author

```text
NOMULA LAVAN REDDY
Online Pharmacy Management System
Backend Microservices + Angular Frontend Project
```
