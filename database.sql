create database nofap;
use nofap;
create table db_ws
(username varchar(255) primary key,
password varchar(255),
start_count varchar(255),
max varchar(255),
attempt_no int);

select * from db_ws ;