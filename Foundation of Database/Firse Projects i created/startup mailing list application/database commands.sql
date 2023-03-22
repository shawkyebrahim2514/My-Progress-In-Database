create database student_registration;

use student_registration;

create table session(
    id int auto_increment primary key ,
    username varchar(50) unique ,
    password varchar(50) ,
    name varchar(255) ,
    email varchar(255) ,
    phone varchar(11) ,
    year int ,
    GPA decimal(3,2)
);