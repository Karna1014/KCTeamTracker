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
INSERT INTO 
department (id, name)
value (08, "Delivery");
INSERT INTO 
department (id, name)
value (10, "Data Processing");
INSERT INTO 
department (id, name)
value (11, "Maintenance");


-- Seed Role Table

insert into 
role (id, title, salary, department_id)
value (01, "CEO", 142500.00, 01);
insert into 
role (id, title, salary, department_id)
value (36, "Accountant", 42500.00, 06);
insert into 
role (id, title, salary, department_id)
value (13, "HRManager", 83500.00, 05);
insert into 
role (id, title, salary, department_id)
value (31, "AcctgManager", 73500.00, 06);
insert into 
role (id, title, salary, department_id)
value (116, "Shipper", 27500.00, 07);
insert into 
role (id, title, salary, department_id)
value (41, "OpsManager", 95500.00, 07);
insert into
role (id, title, salary, department_id)
value (48, "Facility Tech", 37500.00, 07);
insert into 
role (id, title, salary, department_id)
value (125, "Driver", 57500.00, 08);
insert into 
role (id, title, salary, department_id)
value (101, "Delivery Manager", 82500.00, 08);
insert into 
role (id, title, salary, department_id)
value (15, "HR Specialist", 38500.00, 05);
insert into 
role (id, title, salary, department_id)
value (300, "Custodian", 95500.00, 07);
insert into 
role (id, title, salary, department_id)
value (320, "Sales Manager", 95500.00, 09);
insert into 
role (id, title, salary, department_id)
value (350, "DP Manager", 100500.00, 01);


-- Seed Employee Table

insert into 
employees (first_name, last_name, role_id, manager_id)
value ("Ralph", "Baldo", 13, 01);
insert into 
employees (first_name, last_name, role_id, manager_id)
value ("Katie", "Klein", 116, 41);
insert into 
employees (first_name, last_name, role_id, manager_id)
value ("Mike", "Jones", 36, 31);
insert into 
employees (first_name, last_name, role_id, manager_id)
value ("Kayla", "Greene", 101, 01);
insert into 
employees (first_name, last_name, role_id, manager_id)
value ("Kevin", "Brown", 350, 01);
insert into 
employees (first_name, last_name, role_id, manager_id)
value ("Jana", "Smith", 15, 13);
insert into 
employees (first_name, last_name, role_id, manager_id)
value ("Katie", "Klein", 36, 31);
insert into 
employees (first_name, last_name, role_id, manager_id)
value ("Mike", "Jameson", 01, 01);
insert into 
employees (first_name, last_name, role_id, manager_id)
value ("Katie", "Bushnell", 41, 01);
insert into 
employees (first_name, last_name, role_id, manager_id)
value ("Casey", "Bell", 116, 41);
insert into 
employees (first_name, last_name, role_id, manager_id)
value ("Tonya", "Smith", 320, 01);








