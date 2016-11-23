CREATE TABLE employees (
id SERIAL PRIMARY KEY,
first_name VARCHAR(80) NOT NULL,
last_name VARCHAR(80) NOT NULL,
employee_id INTEGER NOT NULL,
job_title VARCHAR(80) NOT NULL,
yearly_salary INTEGER NOT NULL,
status VARCHAR(20)
);
