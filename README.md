# Ojas Dental Clinic

A comprehensive React and Vite application designed for managing walk-in patient registration and dentist queues in private dental clinics. This application allows dentists to view real-time queues, patients to register at reception, and facilitates the management of patient records, all within a clean and responsive user interface. 

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

## System-design

![image](https://github.com/user-attachments/assets/49d0b408-aa6b-4ea9-a6e8-788f0fb25f13)

## Getting Started

### Prerequisites

*   Node.js v16 or higher
*   npm v8 or higher

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/craniacshencil/dentistFrontend.git
    cd dentistFrontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Copy the example environment file:
    ```bash
    cp .env.example .env.local
    cp .env.example .env.production
    ```
    Edit `.env.local` with your local configuration, particularly the `VITE_API_URL`.

### Environment Variables

Create a `.env.local` file in the root directory with the following structure:

```dotenv
VITE_API_URL=http://localhost:8000
```


## Usage

### Development

To start the development server:

```bash
npm run dev
```

### Building for Production

To create a production build:

```bash
npm run build
```

### Previewing Production Build

To preview the production build locally:

```bash
npm run preview
```


