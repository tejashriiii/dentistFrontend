# Ojas Dental Clinic

**A React and Vite application for managing walk-in patient registration and dentist queues in private dental clinics.**
Allow dentists to view real-time queue, walk-in patients to register at reception, and manage patient records—all in a clean, responsive UI.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [System Design](#system-design)
* [Demo](#demo)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Environment Variables](#environment-variables)
* [Usage](#usage)
* [Contributing](#contributing)
* [Contact](#contact)

---

## Features

* Appointment Scheduling, Patient registration by front-desk staff
* Role Base Access, Ensures secure access for administrators, doctors, and patients
* View, edit, and archive patient records
* Responsive layout for desktop and tablet

---

## Tech Stack

* Frontend: React 18, Vite
* Styling: Tailwind CSS


---

## System-design

![image](https://github.com/user-attachments/assets/49d0b408-aa6b-4ea9-a6e8-788f0fb25f13)



---

## Demo

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
