CREATE DATABASE innerstudy;

USE innerstudy;

CREATE TABLE
    users(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255),
        tos BOOLEAN,
        newsletter BOOLEAN
    ) COMMENT '';

CREATE TABLE
    content(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        topic VARCHAR(255),
        content VARCHAR(255)
    ) COMMENT '';

CREATE TABLE
    contact(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        topic VARCHAR(255) NOT NULL,
        issue VARCHAR(255) NOT NULL
    ) COMMENT '';