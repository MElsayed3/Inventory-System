# 📚 Inventory Management System - Backend API Documentation

---

## 🌟 1. Overview

This document details the backend API for the Inventory Management System. The system is designed to manage item transactions (Issue, Return) and generate real-time stock reports. It strictly enforces **Role-Based Access Control (RBAC)** for security and proper operation segmentation.

* **Project Status:** Server logic (API, Security, Database connection, Core Business Logic) is **Complete and Tested**.

---

## 🛠️ 2. Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Backend Core** | **Node.js / Express** | Fast, scalable runtime environment and web framework. |
| **Database** | **PostgreSQL** | Primary relational database for data integrity and storage. |
| **Security** | **JWT / bcrypt** | Token-based authentication and secure one-way password hashing. |
| **Reporting Logic** | **PostgreSQL Functions** | Core business logic (stock calculation) is handled efficiently within the database engine. |

---

## ⚙️ 3. Setup and Installation

### 3.1 Prerequisites

Ensure you have **Node.js** and **PostgreSQL** installed on your system.
### Node.js Verification:

Open your terminal or command prompt.

Verify Node.js is installed by checking its version (I recommend version 16 or newer):

```Bash
node -v
 ```
If this command fails, you must download and install Node.js from their official website.

### 3.2 Installation Steps

1.  **Navigate to the Server Directory:**
    ```
    cd server
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```

### 3.3 Environment Configuration (`.env`)

You must create a file named **`.env`** inside the `server/` directory and configure your credentials. **Replace placeholder values with actual data.**

```
# Example .env file content
DB_USER=inventory_user
DB_HOST=localhost
DB_DATABASE=inventory_db
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE
DB_PORT=5432
```
# Security Key
JWT_SECRET=YOUR_SECURE_JWT_SECRET
### 3.4 Running the Server
Start the API server using the development 
```script:
npm run dev
The server will be available at: http://localhost:3000.
```
## 🛡️ 4. Role-Based Access Control (RBAC)
Access to sensitive endpoints is strictly managed by the user's role. All roles are defined in the database:

| Role Identifier | Core Responsibilities |
|---|---|
| **مدير (Manager)** | User Management, Item Creation, Reporting. |
| **مخزن (Store Keeper)** | Issue Item, Item Creation, Reporting. |
| **صيانة (Maintenance)** | Return Item only. |

## 🚀 5. API Endpoints Reference
| Function | Method | Endpoint | Access Roles | Authentication Required |
|---|---|---|---|---|
| **Login** | POST | `/api/auth/login` | Public | No |
| **Create User** | POST | `/api/auth/register` | مدير | Yes |
| **Create Item** | POST | `/api/inventory/item/create` | مدير, مخزن | Yes |
| **Issue Item** | POST | `/api/inventory/issue` | مخزن | Yes |
| **Return Item** | POST | `/api/inventory/return` | صيانة | Yes |
| **Stock Report** | GET | `/api/inventory/report` | مدير, مخزن | Yes |


Authentication Note
All protected routes require a valid JWT Token passed in the Authorization header:

```
 Header: Authorization: Bearer [JWT Token] 
```



