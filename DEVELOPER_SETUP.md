# Planext CRM - Developer Setup Guide

**Welcome to the Planext CRM Project!** 🚀

This guide will help you set up the project on your machine so you can start coding immediately.

## 1. Prerequisites
Before you start, make sure you have the following installed on your computer:
*   **Node.js** (Version 18 or higher recommended). [Download Here](https://nodejs.org/)
*   **VS Code** (Recommended Code Editor). [Download Here](https://code.visualstudio.com/)

## 2. Setting Up
1.  **Unzip the File**: Extract the `Planext_CRM_Source.zip` file to a folder on your computer.
2.  **Open in VS Code**: Right-click the extracted folder and select "Open with Code".
3.  **Install Dependencies**:
    *   Open the Terminal in VS Code (`Ctrl + ~` or `Terminal > New Terminal`).
    *   Run the following command to download all required libraries:
        ```bash
        npm install
        ```
    *   *This may take 1-3 minutes depending on your internet speed.*

## 3. Running the App
Once installed, start the development server:

```bash
npm run dev
```

*   Open your browser and visit: [http://localhost:3000](http://localhost:3000)
*   You should see the Planext CRM login screen!

## 4. Project Structure (Where to find things)

*   **`src/app`**: This is where the **Pages** are.
    *   `page.tsx`: The Dashboard (after login).
    *   `login/page.tsx`: The Login Page.
    *   `properties/page.tsx`: The Property List & Map page.
*   **`src/components`**: This is where the **UI Blocks** are.
    *   `properties/PropertyCard.tsx`: The card design for each property.
    *   `layout/AppSidebar.tsx`: The side navigation menu.

## 5. Login Credentials (Demo)
Use these to log in and test different roles:

*   **Admin**: `admin@planext.com` / `admin123`
*   **Agent**: `agent@planext.com` / `agent123`
*   **Client**: `client@gmail.com` / `client123`

---
*Happy Coding!* 👨‍💻
