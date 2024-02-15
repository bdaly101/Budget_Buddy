# BudgetBuddy - Personal Finance Tracker

BudgetBuddy is a personal finance tracker designed to help users manage their budgets, track expenses, and set financial goals. With a user-friendly interface and powerful features, BudgetBuddy makes it easy to stay in control of your finances.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features

- **Budget Creation:** Easily create monthly budgets with customizable categories and set limits for each category.

- **Expense Tracking:** Log daily expenses, categorize them according to your budget, and visualize spending patterns.

- **Financial Goals:** Set savings goals or debt reduction targets, and track your progress with interactive charts.

- **User Authentication:** Secure access with JWT-based user authentication.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm
- MongoDB
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/budget-buddy.git
```

2. Navigate to the project directory:

```bash
cd budget-buddy
```

3. Install dependencies:

```bash
npm install
```

4. Set up MongoDB: [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

5. Create a `.env` file in the root directory and add the following:

```env
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

Replace `your-mongodb-uri` with your MongoDB connection string and `your-jwt-secret` with a secure secret key for JWT.

6. Start the application:

```bash
npm start
```

The BudgetBuddy application should now be running locally.

## Usage

1. Register for a new account or log in if you already have one.
2. Create your monthly budget by specifying categories and limits.
3. Log your daily expenses and categorize them accordingly.
4. Track your financial goals and monitor your progress.

## Technologies Used

- **Frontend:**
  - React
  - GraphQL
  - TailwindCSS
  - Apollo Client

- **Backend:**
  - Node.js
  - Express.js
  - GraphQL
  - MongoDB (using Mongoose)

- **Authentication:**
  - JSON Web Tokens (JWT)

- **Deployment:**
  - [Heroku](https://www.heroku.com/) (or your preferred platform)

## Contributing

Contributions are welcome! If you have any ideas for improvements or find any issues, feel free to open an issue or submit a pull request.