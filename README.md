## Database Setup Commands

1. **Create Database**:  

    ```sql
    CREATE DATABASE clinchit_confluence;
    \c clinchit_confluence;
    ```

2. **Create Tables**:  

    ```sql
    CREATE TABLE resources (
        id serial4 PRIMARY KEY,
        resource_id varchar(255) NOT NULL,
        name varchar(255) NOT NULL,
        url varchar(255) NOT NULL,
        access_token text NOT NULL,
        posts jsonb NOT NULL
    );

    CREATE TABLE posts_data (
        page_id varchar NOT NULL,
        content jsonb NOT NULL
    );
    ```

## Code Execution Commands

1. **Navigate to the App Directory**:  

    ```bash
    cd app
    ```

2. **Install Dependencies**:  

    ```bash
    npm i
    ```

3. **Start the Application**: 

    ```bash
    npm start
    ```

4. **Navigate to the Server Directory**:  

    ```bash
    cd server
    ```

5. **Run the Server**:  

    ```bash
    node server.js
    ```

