# My Notes App

## Overview
This application consists of a mobile frontend built with Expo and a backend server that communicates with the mobile app. The mobile app provides a user-friendly interface, while the backend handles data management and business logic.

## Requirements
Before setting up this project, ensure that you have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/get-npm) (comes bundled with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional but recommended for mobile development)

## Setup Instructions

### Mobile App Setup
1. Open your terminal and navigate to the mobile app directory.
2. Install the required packages by running:
   ```bash
   npm install
   ```
3. Start the mobile app by executing:
   ```bash
   npx expo start --clear
   ```

### Backend Setup
1. Open a new terminal window and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the required packages for the backend:
   ```bash
   npm install
   ```
3. Start the backend server. You can choose one of the following commands:
   - If you want to use `nodemon` (make sure it's installed globally):
     ```bash
     nodemon index.js
     ```
   - If you prefer to use Node directly:
     ```bash
     node index.js
     ```

### Notes
- Ensure that you have `nodemon` installed globally if you intend to use it for development. You can install it using:
  ```bash
  npm install -g nodemon
  ```

## Conclusion
Once both the mobile app and backend server are running, you should be able to interact with the application seamlessly. If you encounter any issues, please check the console for error messages and ensure that all dependencies are correctly installed. Happy coding!