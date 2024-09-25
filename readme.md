# Firebase Authentication Project

This project implements a simple login and signup system using Firebase Authentication, featuring both email/password and Google sign-in options. Built with Vite for a fast development experience, it provides a user-friendly interface for managing user authentication.

## Features

- **User Authentication**: Users can sign up and log in using their email and password or through Google.
- **Responsive Design**: The interface is designed to be user-friendly on both desktop and mobile devices.
- **Dynamic User Feedback**: Users see relevant changes based on their login status.

## Tech Stack

- **Firebase**: For authentication and user management.
- **Vite**: A fast build tool for modern web development.
- **HTML/CSS/JavaScript**: For frontend development.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 12 or later)
- A code editor (like [VSCode](https://code.visualstudio.com/))

## Setup Instructions

### 1. Clone the Repository

Clone this repository to your local machine using:

```bash
git clone <https://github.com/Muhammadqasim1011/Login-SignUp.git>
cd <Login-SignUp>
```

### 2. Install Firebase

To use Firebase, you'll need to set up a Firebase project:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Enable Email/Password and Google authentication in the Authentication section.
4. Copy your Firebase config credentials (API key, Auth domain, etc.).

### 3. Install Vite

Make sure you're in your project directory and install Vite:

```bash
npm install vite --save-dev
```

### 4. Install Project Dependencies

Run the following command to install Firebase:

```bash
npm install firebase
```

### 5. Configure Firebase

Create a `.env` file in the root of your project and add your Firebase configuration:

```
VITE_API_KEY=<your-api-key>
VITE_AUTH_DOMAIN=<your-auth-domain>
VITE_PROJECT_ID=<your-project-id>
VITE_STORAGE_BUCKET=<your-storage-bucket>
VITE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
VITE_APP_ID=<your-app-id>
```

### 6. Run Vite

Start the Vite development server:

```bash
npx vite
```

### 7. Open in Browser

Once the server is running, open your browser and go to:

```
http://localhost:3000
```

## Troubleshooting

- Ensure you have correctly set up Firebase and enabled the required authentication methods.
- Check your console for any error messages during login or signup attempts.

## Contribution

Feel free to fork this project and make your own contributions! Open issues if you encounter any bugs or have suggestions for new features.

---