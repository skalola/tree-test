CREATE DATABASE tree_db;

USE tree_db;

CREATE TABLE branches
(
	branch_id int NOT NULL AUTO_INCREMENT,
	branch_name varchar(50),
    branch_range_start int,
    branch_range_end int,
    children int,
    create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modify_timestamp TIMESTAMP DEFAULT 0 ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (branch_id)
);

CREATE TABLE leaves
(
	branch_id int NOT NULL,
	leaf_number int,
    create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);