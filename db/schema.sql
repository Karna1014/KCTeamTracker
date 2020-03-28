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
    FOREIGN KEY(department_id) references department(id) ON DELETE CASCADE, 
    PRIMARY KEY(id)
);
USE teamTracker_db;

CREATE TABLE employees (
	id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE,
    PRIMARY KEY(id)
    );


ALTER TABLE employees AUTO_INCREMENT=1000;

SELECT * FROM role;
SELECT * FROM department;
SELECT * FROM employees;

-- Manager Search
SELECT * FROM employees WHERE manager_id = 01;
-- Dept View
SELECT * FROM employees JOIN (department, role) ON (role.department_id=department.id AND employees.role_id=role.id) WHERE department.id = 7;

-- Dept Delete
DELETE FROM department WHERE id = 52;