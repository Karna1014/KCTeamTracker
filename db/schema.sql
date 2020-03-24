-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS teamTracker_db;

-- Created the DB "teamTracker_db" (only works on local connections)
CREATE DATABASE teamTracker_db;

-- Use the DB teamTracker_db for all the rest of the script
USE teamTracker_db;

CREATE TABLE department (
	id INT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY(id)
    );
    
CREATE TABLE role (
	id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE employees (
	id int NOT NULL AUTO_INCREMENT,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id INT Null,
    PRIMARY KEY(id)
);

ALTER TABLE employees AUTO_INCREMENT=1000;

SELECT * FROM role;
SELECT * FROM department;
SELECT * FROM employees;

-- Manager Search
SELECT * FROM employees WHERE manager_id = 01;