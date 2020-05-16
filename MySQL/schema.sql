drop database if exists mysql_homework;
Create database mysql_homework;
use mysql_homework;

create table department (
id int not null auto_increment,
name varchar(30) not null,
primary key (id)
);

create table role (
id int not null auto_increment,
title varchar(30) not null,
salary decimal(10,2) not null,
department_id int not null,
primary key (id)
);

create table employee(
id int not null auto_increment,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id INT not null,
manager_id INT not null,
primary key (id)
);