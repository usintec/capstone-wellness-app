# Node.js, Express, and MongoDB

Web applications using Node.js, Express, and MongoDB. It's designed to help you quickly get started with building scalable and efficient backend services.

## Prerequisites
- Node.js installed on your machine
- MongoDB installed and running
- Code editor (e.g., Visual Studio Code)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/usintec/capstone-wellness-app
   ```

2. Navigate to the project directory:
   ```bash
   cd capstone-wellness-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure MongoDB:
   - Create a MongoDB database.
   - Update the `config.js` file with your MongoDB connection details.

5. Start the application:
   ```bash
   npm run build
   npm run dev
   ```

6. Open your browser and go to [http://localhost:5100](http://localhost:5100) to see the app in action.

## Project Structure

- `App.ts`: Entry point of the application.
- `server.ts` Main server to kick start app.ts
- `Routes/`: Contains route definitions.
- `Controllers/`: Houses controllers to handle business logic.
- `Models/`: Defines MongoDB data models.
- `Middleware/`: Defines middlewares for the roues.
- `config/`: Configurations for the App and MongoDB server.

## Features

- **Express Middleware**: Utilizes Express for routing and middleware.
- **MongoDB Integration**: Interacts with MongoDB for data storage.
- **RESTful API Structure**: Follows a RESTful API design pattern.
- **Scalable**: Designed for scalability and easy expansion.
- **Modular Codebase**: Separation of concerns for better maintainability.
- **Environment Variables**: Utilizes environment variables for configuration.

## Contributing

Feel free to contribute by opening issues or creating pull requests. Your feedback and contributions are highly appreciated!

## License

This project is licensed under the [MIT License](LICENSE).
