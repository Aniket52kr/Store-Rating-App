# ⭐ FullStack Store Rating Platform

A full-stack web application that allows users to rate stores and provides role-based functionalities for System Administrators, Normal Users, and Store Owners.

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MySQL

### Frontend
- React.js
- Tailwind CSS

---

## 🔐 User Roles & Functionalities

### 1. System Administrator
- Add new:
  - Stores
  - Normal Users
  - Admin Users
- Dashboard:
  - Total Users
  - Total Stores
  - Total Ratings
- User Management:
  - View and filter users by Name, Email, Address, Role
  - View details of all users (including store owners' ratings)
- Store Management:
  - View and filter stores by Name, Email, Address, Rating
- Authentication:
  - Login
  - Logout

---

### 2. Normal User
- Sign up & Log in
- Update password after login
- View all registered stores
- Search stores by Name and Address
- Store Listings:
  - Store Name
  - Address
  - Overall Rating
  - User's Submitted Rating
  - Submit/Update Rating (1 to 5)
- Logout

---

### 3. Store Owner
- Log in
- Update password after login
- Dashboard:
  - View list of users who rated their store
  - View average rating of their store
- Logout

---

## 📝 Form Validations

- **Name**: Min 20 characters, Max 60 characters
- **Address**: Max 400 characters
- **Password**: 8-16 characters, must contain:
  - At least one uppercase letter
  - At least one special character
- **Email**: Must be a valid email format

