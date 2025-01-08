# Weather Application with Role-Based Authentication
This project is a full-stack weather application built using React for the frontend, Node.js for the backend, and MySQL for database management. The application allows users to sign up, log in with JWT-based authentication, search for weather information for any city, and view weather search reports based on user roles.
### Features
- User Authentication: JWT-based login and sign-up functionality with user roles (Admin and User).
- Weather Search: Users can search for the current weather in a specific city.
- Role-Based Access:
  - Admin can view weather search reports.
  - User can search for weather information but cannot access reports.
### Technologies Used:
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MySQL 
- Authentication: JWT (JSON Web Tokens)
- API: WeatherStack API for weather data
### Prerequisites
Before running the project, ensure you have the following installed:
- Node.js 
- MySQL 
- WeatherStack API Key for fetching weather data
### Getting Started 
#### Step 1: Clone the repository
      git clone https://github.com/TejalGittHub/Weather-Application
#### Step 2: Navigate to Your Project Folder:
      cd YourProjectFolderName
#### Step 3: Backend Setup
  1. Navigate to the Backend Folder:

         cd backend

  2. Install backend dependencies:

         npm install

     The backend uses the following dependencies:

     - express: A minimal web framework for building the server.
     - jsonwebtoken: For generating and verifying JWT tokens for authentication.
     - bcrypt: To hash and compare passwords securely.
     - mysql2: For connecting to and querying the MySQL database.
     - axios: For making HTTP requests.
     - cors: To enable Cross-Origin Resource Sharing between frontend and backend.

   3. Create a .env file in the backend folder to store your environment variables:

  Example .env file:

            WEATHER_API_KEY=your_weatherstack_api_key
 
            DB_HOST=localhost

            DB_USER=root

            DB_PASSWORD=your_password

            DB_NAME=weather_app

            JWT_SECRET=your_jwt_secret_key

  Replace your_weatherstack_api_key and your_jwt_secret_key with your actual API key and secret. Update the database credentials accordingly.

   4. Create the database tables using MySQL schema provided below. Make sure you have MySQL running and a database created.
 #### Step 4. Database Setup
   1. Create the necessary tables in your MySQL database:

      #### users Table:

          CREATE TABLE users (

                id INT AUTO_INCREMENT PRIMARY KEY,
  
                user_name VARCHAR(255) NOT NULL UNIQUE,
  
                username VARCHAR(255) NOT NULL UNIQUE,
  
                password VARCHAR(255) NOT NULL,
  
                role ENUM('admin', 'user') NOT NULL
  
           );
      
      #### weather_logs Table:

          CREATE TABLE weather_logs (

              id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

              user_id INT NOT NULL,

              city VARCHAR(255) NOT NULL,

              weather_info JSON NOT NULL,

              FOREIGN KEY (user_id) REFERENCES users(id)
   
          );

3. Start the backend server

   To run the backend server, navigate to the backend directory and run the following command:

       node index.js

   This will start the backend on http://localhost:5000.

#### Step 5. Frontend Setup

1. Navigate to the frontend folder:

       cd frontend

3. Install frontend dependencies:

       npm install

 4. Start the frontend server

        npm start

     This will start the frontend on http://localhost:3000.

#### Step 6: Running the Application

To run the backend and frontend applications, follow the instructions below.
  
1. Start the frontend server:
   
 Navigate to the frontend directory and run following command in terminal:

       npm start

  Running npm start will automatically open the application in your browser at http://localhost:3000.
  
2. Start the backend server:

   Navigate to the backend directory and run following command in terminal:

       node index.js
   
   This starts the backend server.

   Now the Application has started and is ready to test. You will see the application with Sign Up and Login options.

 3. Sign Up: Register a new user by providing a name, username, password, and role (user or admin).
   
 4. Login: Use the registered credentials to log in.
 
 5. Weather Search: Users with the role of "user" can search for weather data of a city. This feature is only accessible by users with the "user" role. **An active internet connection** is required to test this feature.
 
7. Admin Dashboard: Admin users(users with role 'admin') can view the weather search reports.

### API Usage
- WeatherStack API: This app uses the WeatherStack API to fetch weather data. You need to create an account on their platform and get an API key to use the service.
### Roles and Permissions
- User:
  - Can log in, sign up, and search for weather information for cities.
  - Cannot view weather search reports.
- Admin:
  - Can log in, sign up, and access weather search reports.
  - Can view the weather information searched by users along with the details.
### Error Handling
- If the user is not found or the password is incorrect during login, an error message will be shown.
- If the WeatherStack API fails or an error occurs during weather data retrieval, an error message will be displayed.   

