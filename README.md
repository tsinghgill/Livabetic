# Livabetic

Livabetic is a web application designed to help diabetics manage their blood sugar levels by logging and visualizing their daily readings, nutrition, and exercise data. This app was developed as a final project at Lighthouse Labs, combining real-world needs with newly acquired coding skills.

## Features

- User authentication and session management with Passport.js.
- CSV data import for logging blood sugar levels and other health metrics.
- Visualization of blood sugar levels, insulin intake, and nutritional information using Plotly.
- Integration with Twilio for sending SMS reminders to users.
- Web scraping of nutritional data from MyFitnessPal using Cheerio.

## Tech Stack

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for routing and server setup.
- **Sequelize**: ORM for managing PostgreSQL database interactions.
- **PostgreSQL**: Relational database management system.
- **EJS**: Templating engine for generating dynamic HTML.
- **Passport.js**: Middleware for user authentication.
- **Twilio**: API for sending SMS reminders.
- **Multer**: Middleware for handling file uploads.
- **Cheerio**: Library for web scraping.
- **Plotly**: Library for data visualization.

## Installation and Setup

### Prerequisites

- Node.js (version 6.2.1 or higher)
- PostgreSQL

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/livabetic.git
cd livabetic/myapp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the Database

Ensure that PostgreSQL is installed and running. Create a database named livabetic and update the database credentials in config/database.js.

```bash
var connection = new Sequelize('livabetic', 'yourusername', 'yourpassword', {
  host: 'localhost',
  dialect: 'postgres',
  ...
});
```

### 4. Set Up Environment Variables

Create a .env file in the root directory to store environment variables. Include your Twilio credentials and any other necessary configurations.

```bash
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
SENDING_NUMBER=your_twilio_number
```

### 5. Run Database Migrations

```bash
npx sequelize db:migrate
```

### 6. Start the Application

```bash
npm start
```
The app will start on http://localhost:3000.

## Usage

	1.	Sign Up: Create an account to start logging your data.
	2.	Upload Data: Use the CSV upload feature to import your blood sugar readings and other health metrics.
	3.	View Dashboard: Access the dashboard to see visualizations of your data.
	4.	Set Reminders: Use the reminders feature to receive SMS notifications.

### Contributing

Feel free to submit issues or pull requests if you’d like to contribute to the project.

### License

This project is licensed under the MIT License.