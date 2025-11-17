# 💼 desempregados.com

![Desempregados.com Banner](./public/img/desempregados-logo.png)

**A support platform for unemployed professionals in Brazil**

_"Welcome, unemployed! How can we help you today?"_

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=render)](https://desempregados-com.onrender.com/)
[![GitHub Stars](https://img.shields.io/github/stars/adrian1715/desempregados.com?style=for-the-badge)](https://github.com/adrian1715/desempregados.com/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/adrian1715/desempregados.com?style=for-the-badge)](https://github.com/adrian1715/desempregados.com/issues)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![Language](https://img.shields.io/badge/language-Portuguese-green?style=for-the-badge)](READMEpt-br.md)

[🌐 Live Demo](https://desempregados-com.onrender.com/) • [📝 Report Bug](https://github.com/adrian1715/desempregados.com/issues) • [✨ Request Feature](https://github.com/adrian1715/desempregados.com/issues)

> **Note:** This project was originally developed in Portuguese for the Brazilian market. The platform interface is in Portuguese (pt-BR).

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About the Project

**desempregados.com** (literally "Unemployed.com" in Portuguese) is a full-stack web platform built with **Node.js**, **Express**, and **MongoDB** for the Brazilian job market.

### 💡 Why This Project?

This platform provides:

- 🎯 **Career Guidance** - Resources and guides for job placement
- 📚 **Career Pages** - Dynamic career information and resources
- 🤝 **Community Platform** - Connection between candidates and companies
- 💼 **Job Listings** - Post and browse job opportunities
- 👥 **Dual User Roles** - Separate interfaces for candidates and companies

### 🌍 Localization

Designed specifically for the **Brazilian market**:

- 🇧🇷 Interface entirely in Brazilian Portuguese (pt-BR)
- 📍 Focus on Brazilian labor market regulations
- 💰 Salary information in Brazilian Real (BRL)
- 📋 Compliance with Brazilian labor laws and LGPD
- 🏢 Tailored for Brazilian employment culture

---

## ✨ Key Features

### 🔐 Authentication System

- Email-based login with Passport.js
- Dual user roles: Candidates and Companies
- Session management with express-session

### 👤 User Profiles

- Separate models for Candidates and Companies
- Profile creation and management
- Admin role support

### 💼 Job Management

- Create, read, update, and delete job listings
- Company-specific job postings
- Job search and filtering

### 📄 Career Pages

- Dynamic career resource pages
- Content management system
- Educational materials and guides

### 📸 Image Upload

- Cloudinary integration for file storage
- Profile pictures and company logos
- Optimized image handling

### 🎨 Responsive UI

- Bootstrap 5 framework
- Bootstrap Icons
- Mobile-friendly design
- Custom CSS styling

### 🔔 Flash Messages

- Success and error notifications
- User feedback system

### 📝 Logging System

- Request logging with UUID
- Error tracking and monitoring

---

## 🛠️ Tech Stack

### 🎨 Frontend

- **Template Engine** - EJS (Embedded JavaScript)
- **Layout Engine** - EJS-Mate
- **CSS Framework** - Bootstrap 5
- **Icons** - Bootstrap Icons
- **Styling** - Custom CSS3
- **JavaScript** - Vanilla JS

### ⚙️ Backend

- **Runtime** - Node.js
- **Framework** - Express.js
- **Template Engine** - EJS
- **Session Store** - express-session
- **Flash Messages** - connect-flash
- **HTTP Method Override** - method-override

### 🗄️ Database & ODM

- **Database** - MongoDB
- **ODM** - Mongoose
- **Schema Models**:
  - User (with role-based profiles)
  - Candidate
  - Company
  - Job
  - Career
  - CareerPage

### 🔐 Authentication

- **Strategy** - Passport.js
- **Plugin** - passport-local-mongoose
- **Method** - Email-based authentication (custom strategy)
- **Session Management** - express-session with cookies

### ☁️ File Upload & Storage

- **Cloud Storage** - Cloudinary
- **Upload Middleware** - Multer
- **Storage** - multer-storage-cloudinary
- **Supported Formats** - JPEG, JPG, PNG

### 🛠️ Utilities & Helpers

- **Environment Variables** - dotenv
- **Date Formatting** - date-fns
- **Unique IDs** - uuid
- **Async Handling** - express-async-handler

### 🚀 Infrastructure & Deployment

- **Hosting** - [Render.com](https://render.com/)
- **Database Hosting** - MongoDB Atlas
- **SSL** - Automatic HTTPS (Render)
- **Process Manager** - nodemon (development)

### 📦 Development Tools

- **Version Control** - Git / GitHub
- **Package Manager** - npm
- **Development Server** - nodemon

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or higher)

  ```bash
  node --version
  ```

- **npm** (comes with Node.js)

  ```bash
  npm --version
  ```

- **MongoDB** (local or Atlas account)

  - Local: [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)

- **Cloudinary Account** (for image uploads)
  - Sign up at [Cloudinary](https://cloudinary.com/) for free

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/adrian1715/desempregados.com.git
   cd desempregados.com
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root:

   ```bash
   touch .env
   ```

   Add the following variables (see [Environment Variables](#environment-variables) section for details)

4. **Set up MongoDB**

   **Option A: Local MongoDB**

   ```bash
   # Start MongoDB service
   mongod

   # The connection will be:
   # DB_URL=mongodb://localhost:27017/desempregados
   ```

   **Option B: MongoDB Atlas**

   - Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Get your connection string
   - Replace `<password>` and database name in the connection string

5. **Start the development server**

   ```bash
   npm start
   ```

   This will start nodemon on port 3000 (or your specified PORT)

6. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Node Environment
NODE_ENV=development

# Server Configuration
PORT=3000

# MongoDB Database
DB_URL=mongodb://localhost:27017/desempregados
# For MongoDB Atlas, use:
# DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/desempregados?retryWrites=true&w=majority

# Session Secret (use a strong random string)
SESSION_SECRET=your_super_secret_session_key_here_change_in_production

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

#### Getting Your Credentials

**MongoDB Atlas:**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password

**Cloudinary:**

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Paste into `.env` file

**Session Secret:**

- Generate a strong random string:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

---

## 💻 Usage

### For Candidates (Job Seekers)

1. **Register**

   - Go to `/cadastro` (Registration)
   - Select "Candidate" role
   - Fill in your information
   - Create account

2. **Browse Jobs**

   - Navigate to `/vagas` (Jobs)
   - Filter by category, location, or company
   - View job details

3. **Apply for Jobs**

   - Click on job listing
   - View requirements and description
   - Apply directly through the platform

4. **Manage Profile**
   - Update your information
   - Upload profile picture
   - Track your applications

### For Companies (Employers)

1. **Register**

   - Go to `/cadastro` (Registration)
   - Select "Company" role
   - Fill in company details
   - Create account

2. **Post Jobs**

   - Navigate to `/vagas/new` (New Job)
   - Fill in job details
   - Publish listing

3. **Manage Listings**

   - View all your job postings
   - Edit or delete jobs
   - Track applications

4. **Company Profile**
   - Update company information
   - Upload company logo
   - Manage job listings

### For Admins

- Access admin panel for content management
- Manage career pages and resources
- Monitor platform activity
- Moderate content

---

## 📁 Project Structure

```
desempregados.com/
├── config/                    # Configuration files
│   ├── cloudinary.js         # Cloudinary setup
│   └── db.js                 # MongoDB connection
│
├── middlewares/              # Express middlewares
│   ├── auth.js               # Authentication middleware
│   ├── errorHandler.js       # Error handling
│   ├── getPages.js           # Page fetching middleware
│   └── logEvents.js          # Request logging
│
├── models/                   # Mongoose models
│   ├── User.js               # User model (with roles)
│   ├── Candidate.js          # Candidate profile
│   ├── Company.js            # Company profile
│   ├── Job.js                # Job listings
│   ├── Career.js             # Career resources
│   └── CareerPage.js         # Career pages
│
├── routes/                   # Express routes
│   ├── api/                  # RESTful API routes
│   │   ├── index.js          # API router
│   │   ├── users.js          # User API
│   │   ├── careers.js        # Career API
│   │   ├── careerPages.js    # Career Pages API
│   │   └── jobs.js           # Jobs API
│   ├── auth.js               # Authentication routes
│   ├── careers.js            # Career page routes
│   ├── jobs.js               # Job listing routes
│   └── index.js              # Main routes
│
├── views/                    # EJS templates
│   ├── layouts/              # Layout templates
│   │   └── boilerplate.ejs   # Main layout
│   ├── pages/                # Page templates
│   │   ├── auth/             # Login/Register pages
│   │   ├── carreiras/        # Career pages
│   │   ├── vagas/            # Job pages
│   │   ├── index.ejs         # Homepage
│   │   ├── candidatos.ejs    # Candidates page
│   │   ├── empresas.ejs      # Companies page
│   │   └── sobre.ejs         # About page
│   ├── partials/             # Reusable components
│   │   ├── auth/             # Auth forms
│   │   ├── navbar.ejs        # Navigation bar
│   │   ├── footer.ejs        # Footer
│   │   └── flash.ejs         # Flash messages
│   └── error.ejs             # Error page
│
├── public/                   # Static files
│   ├── css/                  # Stylesheets
│   │   ├── styles.css        # Global styles
│   │   ├── auth.css          # Auth page styles
│   │   ├── index.css         # Homepage styles
│   │   └── careers/          # Career page styles
│   ├── js/                   # Client-side JavaScript
│   │   ├── app.js            # Main app JS
│   │   ├── auth/             # Auth scripts
│   │   ├── careers/          # Career scripts
│   │   └── jobs/             # Job scripts
│   ├── img/                  # Images
│   │   ├── home/             # Homepage images
│   │   └── footer/           # Footer icons
│   └── bootstrap/            # Bootstrap files
│       ├── bootstrap.min.css
│       ├── bootstrap.bundle.js
│       ├── validateForm.js
│       └── icons/            # Bootstrap Icons
│
├── utils/                    # Utility functions
│   ├── CustomError.js        # Custom error class
│   ├── validation.js         # Validation helpers
│   └── string.js             # String utilities
│
├── .env                      # Environment variables (not in repo)
├── .gitignore               # Git ignore rules
├── index.js                 # Application entry point
├── package.json             # Dependencies and scripts
├── package-lock.json        # Dependency lock file
├── README.md                # This file (English)
└── README-ptbr.md           # Portuguese README
```

---

## 🔌 API Routes

### Authentication

- `POST /cadastro` - User registration
- `POST /login` - User login
- `GET /logout` - User logout

### Jobs (Vagas)

- `GET /vagas` - List all jobs
- `GET /vagas/new` - New job form (companies only)
- `POST /vagas` - Create new job
- `GET /vagas/:id` - View job details
- `GET /vagas/:id/edit` - Edit job form
- `PUT /vagas/:id` - Update job
- `DELETE /vagas/:id` - Delete job

### Careers (Carreiras)

- `GET /carreiras` - List all careers
- `GET /carreiras/new` - New career form (admin only)
- `POST /carreiras` - Create new career
- `GET /carreiras/:id` - View career details
- `GET /carreiras/:id/edit` - Edit career form
- `PUT /carreiras/:id` - Update career
- `DELETE /carreiras/:id` - Delete career
- `GET /carreiras/:id/pages` - Career pages

### RESTful API (JSON)

- `GET /api/users` - Get users
- `GET /api/jobs` - Get jobs (JSON)
- `GET /api/careers` - Get careers (JSON)
- `GET /api/careerPages` - Get career pages (JSON)

### Public Pages

- `GET /` - Homepage
- `GET /candidatos` - Candidates page
- `GET /empresas` - Companies page
- `GET /sobre` - About page

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn and create. Any contributions are **greatly appreciated**!

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your Changes**

   ```bash
   git commit -m 'feat: Add some AmazingFeature'
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

### 📝 Commit Standards

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code formatting
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 🌍 Language Guidelines

- **Code**: English comments preferred
- **UI/UX**: Portuguese (pt-BR) required
- **Documentation**: Both English and Portuguese
- **Commits**: English preferred, Portuguese accepted
- **Issues/PRs**: Either language acceptable

### 🐛 Reporting Bugs

Use [GitHub Issues](https://github.com/adrian1715/desempregados.com/issues):

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (browser, OS)

---

## 📝 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 📧 Contact

**Adrian** - [@adrian1715](https://github.com/adrian1715)

**Project Link:** [https://github.com/adrian1715/desempregados.com](https://github.com/adrian1715/desempregados.com)

**Live Demo:** [https://desempregados-com.onrender.com/](https://desempregados-com.onrender.com/)

---

## 🙏 Acknowledgments

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [Passport.js](http://www.passportjs.org/) - Authentication middleware
- [EJS](https://ejs.co/) - Embedded JavaScript templating
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [Cloudinary](https://cloudinary.com/) - Image hosting and management
- [Render.com](https://render.com/) - Free and reliable hosting
- The Brazilian tech community for their support
- All contributors who helped build this platform

---

## 💪 Support the Project

- ⭐ Star this repository
- 🐛 Report bugs and suggest improvements
- 💻 Contribute code
- 📢 Share with other professionals
- 💬 Provide feedback

---

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/adrian1715/desempregados.com?style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/adrian1715/desempregados.com?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/adrian1715/desempregados.com?style=flat-square)

---

## 🇧🇷 Para falantes de português

Este README está disponível em português brasileiro. [Clique aqui para ler em português](README-ptbr.md).

---

_"Unemployed today, employed tomorrow. We believe in you!"_

_"Desempregado hoje, empregado amanhã. Nós acreditamos em você!"_

[⬆ Back to Top](#-desempregadoscom)
