# ServiceDesk Frontend

A frontend prototype for a Service Desk application built with **React, Vite, and Tailwind CSS**.

The application provides a simple Service Desk interface where users can log in, view dashboard information, manage customers, and interact with service-request and customer data using mock data.

---

## Technologies and Libraries Used

* **React** – UI development and component-based architecture
* **Vite** – Development server and build tool
* **Tailwind CSS** – Styling and responsive UI
* **React Router DOM** – Client-side routing and navigation
* **Lucide React** – Icons
* **JavaScript (ES6+)** – Application logic and data handling

---

## Main Pages and Features

### Login

* Email validation
* Password validation
* Password visibility toggle
* Login/logout flow
* User information stored using `localStorage`

### Dashboard

* Summary cards
* Date filter:

  * Today
  * This Week
  * This Month
* Service request search
* Status filtering
* Newest/oldest sorting
* Service request table
* Empty state
* Loading state

### Customers

* Customer list
* Customer search
* Status filtering
* Add customer functionality
* Form validation
* Duplicate email validation
* Customer details modal
* Delete customer functionality
* Delete confirmation
* Success messages
* Empty state
* Loading state
* Missing/optional data handling

---

## Reusable Components

The project uses reusable components to avoid duplicate UI code.

* `DataTable` – Reusable table component for different datasets
* `TableToolbar` – Reusable search, filter, and sorting controls
* `StatusBadge` – Displays customer/request status
* `SummaryCard` – Dashboard summary information
* `PageHeader` – Page title and action button
* `Header` – Application header
* `Sidebar` – Navigation sidebar
* `AddCustomerModal` – Add customer form and validation
* `CustomerModal` – Customer details view
* `Button` – Button

---

## Folder Structure

 
src/
│
├── components/
│   ├── AddCustomerModal.jsx
│   ├── Button.jsx
│   ├── CustomerModal.jsx
│   ├── DataTable.jsx
│   ├── Header.jsx
│   ├── PageHeader.jsx
│   ├── Sidebar.jsx
│   ├── StatusBadge.jsx
│   ├── SummaryCard.jsx
│   └── TableToolbar.jsx
│
├── data/
│   ├── customers.js
│   ├── dashboard.js
│   └── serviceRequests.js
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Customers.jsx
│   └── Login.jsx
│
├── App.jsx
├── main.jsx
└── index.css
 

---

## Mock Data Management

The application currently uses local mock data instead of a backend API.

Mock data is stored separately inside the `src/data/` directory:

 
src/data/
├── customers.js
├── dashboard.js
└── serviceRequests.js
 

This keeps the data separate from the UI components and follows separation of concerns.

For example, the customer data is imported into the Customers page:

```js
import { customers as initialCustomers } from "../data/customers";
```

The customer list is then stored in React state:

```js
const [customers, setCustomers] = useState(initialCustomers);
```

Customer operations such as **add and delete** update the local React state.

The mock data can later be replaced with API calls without requiring major changes to the reusable UI components.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/sohanlalpatel/Foundation-Core-Ui.git
```

### 2. Open the project

```bash
cd Foundation-Core-Ui
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

The application will be available at the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

---

## Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Known Limitations / Incomplete Features

* The application currently uses **mock data** instead of a real backend/API.
* Customer changes are stored only in React state and are **not persisted after page refresh**.
* Login is a frontend prototype and does not use real authentication.
* No real database is connected.
* Dashboard summary data is currently based on mock data.
* Service request data is currently read from local mock data.
* No real-time service request updates are implemented.
* No backend/API error handling is required because the current version does not use a backend.

---

## Project Approach

The application follows a component-based React architecture.

Reusable components such as `DataTable` and `TableToolbar` are shared across pages to reduce duplicate code.

State is managed using React hooks such as `useState` and `useEffect`.

Common JavaScript array methods such as:

* `map()`
* `filter()`
* `sort()`
* `some()`

are used for rendering, searching, filtering, sorting, and validating mock data.

The project is structured so that the current mock-data implementation can later be replaced with a backend API.
