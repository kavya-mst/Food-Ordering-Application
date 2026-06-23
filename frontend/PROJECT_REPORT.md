# 🍕 BiteSpeed | Food Ordering Web Application Project Report

This document provides a detailed breakdown of the **BiteSpeed** web application. It is structured to help you understand the architecture, data management, and functionality of your website so you can confidently explain it to evaluators during a project review or presentation.

---

## 📌 Project Overview
**BiteSpeed** is a fast, responsive, client-side single-page food ordering application built using **ReactJS**. The project simulates a full-stack food delivery experience entirely in the browser. It features user registration, secure credential validation, cart checkout, and an **automated order tracking progress timeline** that behaves like a real-time tracking page.

---

## 🛠️ Technology Stack & Libraries

1. **ReactJS (Vite Build Tool)**: 
   - Utilizes functional components, hooks (`useState`, `useEffect`, `useContext`, `useCallback`), and modular contexts to handle UI rendering and data propagation.
2. **React Router DOM**:
   - Manages routing and client-side page transitions without page reloads.
3. **Vanilla CSS (CSS3)**:
   - Configured with global design tokens (CSS Custom Properties/Variables) for a unified orange-and-white theme, Poppins typography, flexible layouts (flexbox/grid), and responsive styling.
4. **HTML5 IndexedDB**:
   - Serves as the local system database engine, storing client records and transactions directly in the user's browser database file.

---

## 📐 Project Architecture & Directory Layout

The application has a clean directory layout separating concerns:

```text
src/
├── components/          # Reusable layout UI blocks
│   ├── FoodCard.jsx     # Renders a dish's card with category, description, rating, and add button
│   ├── Footer.jsx       # Custom quick-links, schedules, and college credit footer
│   └── Navbar.jsx       # Sticky header displaying routes, cart badge count, and user session status
├── context/             # Global State Providers
│   ├── AuthContext.jsx  # Asynchronous sign-up, sign-in, and sign-out handler querying IndexedDB
│   └── CartContext.jsx  # Consolidated Cart updates, placed orders, auto status timers, and Toast alerts
├── data/
│   ├── db.js            # Database wrapper handling IndexedDB transaction lifecycle
│   └── foodData.js      # Raw menu items list containing 20 dishes across 5 categories
├── pages/               # Top-level route pages
│   ├── Home.jsx         # Hero display, category navigation chips, and top-rated dishes
│   ├── Menu.jsx         # Category filter chips, query searching, and menus grid
│   ├── Cart.jsx         # Item summary cards, checkout inputs, and price summary
│   ├── SignIn.jsx       # Login card checking IndexedDB emails and passwords
│   ├── SignUp.jsx       # Register card with regex validation and data writes
│   ├── OrderConfirmation.jsx # Interactive 5-stage progress timeline showing live status
│   └── NotFound.jsx     # Custom 404 handler page
├── App.jsx              # Registers routes and wraps layout in Auth and Cart Providers
├── index.css            # Root stylesheet defining margins, fonts, and colors
└── main.jsx             # React strict mode mounting script
```

---

## 💾 Where is the Data Stored? (The Local Database)

Unlike typical basic projects that lose all data on refresh or rely solely on simple key-value `localStorage` strings, BiteSpeed implements a structured browser database using **IndexedDB**.

### The Database Structure:
* **Database Name**: `BiteSpeedDB` (Version 1)
* **Tables (Object Stores)**:
  1. `users` (Primary Key: `email` - unique): Stores customer credentials.
  2. `orders` (Primary Key: `id` - unique): Stores customer checkout history.

### How it behaves:
* **Storage Location**: The data is stored in binary files inside the user's local browser profile folder on their local system.
* **Inspectability**: Go to browser **Inspect Element (F12) -> Application tab -> IndexedDB -> BiteSpeedDB** to see your tables live.
* **Session Persistence**: User registration data, credentials, and order history survive cache clearing, computer restarts, and browser reopens.

---

## ⚡ Key Features Explained

### 1. Unified State Context (`CartContext`)
To simplify the app structure and avoid over-engineering, Cart, Orders, and Toasts are managed in one file. 
* **Cart Logic**: Calculates item counts, food subtotal, standard delivery fee (₹40), and GST (5%) dynamically.
* **Toast Banner Container**: Includes self-dismissing alerts mapped directly to the context tree so adding a burger, logging in, or checking out fires clean notifications anywhere.

### 2. Auto-Progression Status Timeline (Simulated Real-Time Backend)
When a checkout form is submitted:
1. The order is created with a `placedAt: Date.now()` timestamp and written to IndexedDB.
2. The user is redirected to `/order-confirmation/BITE-XXXXXX`.
3. In [CartContext.jsx](file:///c:/Users/sahus/Desktop/Practice/Kavya_Foodorder/src/context/CartContext.jsx), a background polling interval checks active orders in the database every **3 seconds**:
   - **Elapsed < 10s**: `Order Received`
   - **10s - 20s**: `Order Accepted`
   - **20s - 35s**: `Preparing Food`
   - **35s - 50s**: `Out For Delivery`
   - **Elapsed >= 50s**: `Delivered`
4. When a threshold is crossed, the context updates the database record, writes the timestamp to `statusTimeline`, and refreshes the React state. The customer sees the progress node move forward automatically.

### 3. Asynchronous Decoupled Authentication
* Registration and login queries are written as `Promises` in [db.js](file:///c:/Users/sahus/Desktop/Practice/Kavya_Foodorder/src/data/db.js).
* [AuthContext.jsx](file:///c:/Users/sahus/Desktop/Practice/Kavya_Foodorder/src/context/AuthContext.jsx) resolves these queries asynchronously. If login credentials match, the customer's active session is logged, saved to `localStorage` (as `currentUser`), and the navbar updates to show a personalized greeting (*"Hi, John 👋"*).

---

## 🗣️ Presentation / Viva Q&A Guide
Here are typical questions examiners ask about React projects and how you should answer them:

> [!NOTE]
> **Q: What is the difference between LocalStorage and IndexedDB?**
> **A**: LocalStorage is a synchronous key-value store that only accepts strings (max 5MB capacity). IndexedDB is an asynchronous, transactional object database built into the browser. It supports large amounts of structured data, handles key paths, supports indices, and doesn't block the browser's UI thread since operations run asynchronously.

> [!NOTE]
> **Q: How does the order status progress without a node server or socket connection?**
> **A**: I implemented a client-side database simulation in `CartContext.jsx`. The context registers the precise epoch timestamp (`placedAt`) when the order is committed to IndexedDB. A background `setInterval` checks active orders every 3 seconds, compares the current time against `placedAt`, and automatically transitions the order status in the database. The React component re-renders the progress tracker when the state changes.

> [!NOTE]
> **Q: Why did you combine the Cart, Order, and Toast contexts?**
> **A**: To prevent provider wrapping bloat (over-engineering) and avoid context circular dependencies. In standard React, parents cannot consume contexts of children. Placing auth session checkers and order builders in separate hierarchies often causes rendering conflicts. Combining transaction-related details into a single `CartContext` simplifies data sharing and mirrors clean junior developer architectures.

> [!NOTE]
> **Q: How are you displaying images locally?**
> **A**: I downloaded Unsplash stock images and placed them in the `public/images/` directory. By storing them inside `public/`, they are served statically by Vite at build time. I can query them as simple URL strings like `/images/pizza.jpg` directly in `foodData.js` without having to declare dozens of imports.
