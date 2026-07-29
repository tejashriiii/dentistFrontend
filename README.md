# Ojas Dental Clinic

A comprehensive React and Vite application designed for managing walk-in patient registration and dentist queues in private dental clinics. This application allows dentists to view real-time queues, patients to register at reception, and facilitates the management of patient records, all within a clean and responsive user interface.




## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [System Design](#system-design)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Environment Variables](#environment-variables)
* [Usage](#usage)
* [Contributing](#contributing)
* [Contact](#contact)

--- 

## Features

*   **Appointment Scheduling:** Streamlined process for front-desk staff to schedule patient appointments.
*   **Patient Registration:** Efficient system for walk-in patients to register at the reception.
*   **Role-Based Access Control:** Ensures secure access for different user roles including administrators, dentists, and patients.
*   **Patient Record Management:** Allows viewing, editing, and archiving of patient records.
*   **Real-time Queue View:** Dentists can view the real-time status of the patient queue.
*   **Responsive Design:** A clean and responsive UI that adapts well to various screen sizes (desktop and tablet).
*   **Treatment and Prescription Management:** Dedicated interfaces for managing treatments and prescriptions.
*   **Follow-up Tracking:** System for managing patient follow-ups and their completion status.
*   **Billing Summary:** Provides a clear overview of costs, discounts, and final charges.


## Tech Stack

*   **Frontend:** React 18, Vite
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React, React Icons
*   **Routing:** React Router DOM
*   **State Management:** React Context (implied)
*   **Form Handling:** React Toastify (for notifications)
*   **Utilities:** jwt-decode


---


## System-design

![image](https://github.com/user-attachments/assets/49d0b408-aa6b-4ea9-a6e8-788f0fb25f13)



---

## Getting Started

### Prerequisites

* Node.js v16 or higher
* npm v8 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/tejashriiii/dentistFrontend.git
cd dentistFrontend

# Install dependencies
npm install

# Set up environment files
cp .env.example .env.local
cp .env.example .env.production
# Edit .env.local with your local configuration
```

### Environment Variables

Create a `.env.local` file with the following keys:

```dotenv
VITE_API_URL=http://localhost:8000
```
**Do not commit** your real API keys or `.env.local` to version control.

---

## Usage

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes and push to your fork
4. Open a pull request against the main branch

Please follow the existing code style and include tests where appropriate.

---

## Contact

* GitHub: [https://github.com/tejashriiii](https://github.com/tejashriiii)
* Mail:  (masketejashri11@gmail.com)

