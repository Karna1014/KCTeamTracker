-- Seed Department Table
INSERT INTO 
department (id, name)
value (01, "CEO");
INSERT INTO 
department (id, name)
value (05, "HR");
INSERT INTO 
department (id, name)
value (06, "Accounting");
INSERT INTO 
department (id, name)
value (07, "Operations");
INSERT INTO 
department (id, name)
value (09, "Sales");

-- Seed Role Table
INSERT INTO 
role (id, title, salary, department_id)
value (01, "CEO", 142500.00, 01);
INSERT INTO 
role (id, title, salary, department_id)
value (36, "Accountant", 42500.00, 06);
INSERT INTO 
role (id, title, salary, department_id)
value (13, "HRManager", 83500.00, 05);
INSERT INTO 
role (id, title, salary, department_id)
value (31, "AcctgManager", 73500.00, 06);
INSERT INTO 
role (id, title, salary, department_id)
value (116, "Shipper", 27500.00, 07);
INSERT INTO 
role (id, title, salary, department_id)
value (41, "OpsManager", 95500.00, 07);

-- Seed Employee Table
INSERT INTO 
employees (first_name, last_name, role_id, manager_id)
value ("Ralph", "Baldo", 13, 01);
INSERT INTO 
employees (first_name, last_name, role_id, manager_id)
value ("Katie", "Klein", 116, 41);
INSERT INTO 
employees (first_name, last_name, role_id, manager_id)
value ("Mike", "Jones", 36, 31);
INSERT INTO 
employees (first_name, last_name, role_id, manager_id)
value ("Kayla", "Greene", 41, 01);
INSERT INTO 
employees (first_name, last_name, role_id, manager_id)
value ("Kevin", "Brown", 117, 41);

-- Manager Search
SELECT * FROM employees WHERE manager_id = 01;