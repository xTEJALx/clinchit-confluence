commands for setting up the database:

CREATE DATABASE clinchit_confluence;

\c clinchit_confluence;

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

commands to run the code:

cd app
npm i
npm start
cd server
node server.js


# clinchit-confluence
# clinchit-confluence
# clinchit-confluence
