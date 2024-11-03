# Online Grievances Redressal - Frontend

This is the frontend component of the Online Grievances Redressal System, developed to streamline the handling and resolution of grievances for students, teachers, and staff members. The frontend is built using HTML, CSS, and JavaScript, and provides an intuitive user interface for different user roles to file, view, update, and manage grievances efficiently.

## Table of Contents

- [Overview](#overview)
- [Folder Structure](#folder-structure)
- [Pages and Interactions](#pages-and-interactions)
- [API Calls and Data Handling](#api-calls-and-data-handling)
- [Setup Instructions](#setup-instructions)
- [Key Functionalities](#key-functionalities)

## Overview

This frontend enables different types of users (students, teachers, staff) to:
- File a grievance
- View and edit profile information
- Access resolved and pending grievances
- Administrators can review, approve, or delete grievances

### Main Technologies Used
- HTML5, CSS3, JavaScript (ES6)
- LocalStorage for temporary data handling
- (Optional) Add your backend API URL for API interactions.

## Folder Structure

The main files and folders include:

```
📂 project-root/
├── 📂 css/
│   └── styles.css                # Main stylesheet for layout and component styling
├── 📂 js/
│   ├── main.js                   # Contains main functions and event handlers
│   └── api.js                    # Handles API calls for CRUD operations
├── index.html                    # Main page where users log in
├── dashboard.html                # Admin dashboard to manage grievances
├── profile.html                  # User profile page for viewing/editing profile
└── grievances.html               # Page where users can file and track grievances
```

## Pages and Interactions

### `index.html` (Login Page)

1. **User Login**: Allows users to enter their credentials and select their role (student, teacher, staff, or admin).
2. **Navigation**: On successful login, users are directed to their respective dashboard pages (`grievances.html` for users, `dashboard.html` for admin).

### `dashboard.html` (Admin Dashboard)

1. **View Grievances**: Admins can see a list of all grievances filed by users.
2. **Approve/Delete Grievances**: Admins can approve or delete grievances, updating the status in the system.
3. **Profile Management**: Admins can navigate to view or update profiles of students, teachers, or staff.

### `profile.html` (Profile Page)

1. **View Profile Information**: Users can view their personal profile information.
2. **Edit Profile**: Users can update their contact information. On submission, updates are reflected in LocalStorage or sent to the backend API if configured.
3. **Save Changes**: The form allows users to save profile changes, which updates the relevant section in the LocalStorage (or backend if API is connected).

### `grievances.html` (Grievance Management Page)

1. **File a Grievance**: Users can submit a grievance with details, which will be saved to LocalStorage or posted to the API.
2. **View Filed Grievances**: Displays a list of filed grievances categorized by status (Pending, Approved, Resolved).
3. **Edit/Delete Grievance**: Users can edit or delete their grievances before they are approved by admin.

## API Calls and Data Handling

The project uses LocalStorage for storing temporary data in development. In a production setup, API endpoints are utilized for CRUD operations. The API URLs should be configured in the `api.js` file.

### Example API Endpoints (Defined in `api.js`)

- **Login**: `POST /api/login` — Validates user credentials and returns session details.
- **Get Grievances**: `GET /api/grievances` — Retrieves all grievances.
- **File a Grievance**: `POST /api/grievances` — Submits a new grievance.
- **Update Grievance**: `PUT /api/grievances/:id` — Updates a grievance by ID.
- **Delete Grievance**: `DELETE /api/grievances/:id` — Deletes a grievance by ID.
- **Update Profile**: `PUT /api/users/:id/profile` — Updates user profile information.

Ensure to replace placeholders with actual API URLs in the `api.js` file.

### Interaction between Pages and API Calls

1. **User Login** (`index.html`)
   - Calls `POST /api/login` to authenticate users.
   - On success, redirects to the respective page based on user type.

2. **File and Manage Grievances** (`grievances.html`)
   - Calls `POST /api/grievances` when filing a new grievance.
   - Fetches data using `GET /api/grievances` to display user-specific grievances.
   - Allows users to update or delete grievances via `PUT` and `DELETE` methods.

3. **Admin Dashboard** (`dashboard.html`)
   - Loads all grievances using `GET /api/grievances`.
   - Approves grievances via `PUT /api/grievances/:id`.
   - Deletes grievances via `DELETE /api/grievances/:id`.

## Setup Instructions

1. Clone the repository to your local machine.
2. Open `index.html` in your web browser.
3. Ensure the browser supports LocalStorage for data handling.
4. (Optional) Configure the backend API endpoints in `api.js` for full functionality.

## Key Functionalities

- **User Authentication**: Secure login for students, teachers, and staff.
- **Grievance Filing and Management**: Easy-to-use forms for filing and managing grievances.
- **Role-Based Access**: Different functionalities for users based on their roles.
- **Responsive Design**: Mobile-friendly layout for accessibility.

For any issues or feature requests, please open an issue on the repository.

---
