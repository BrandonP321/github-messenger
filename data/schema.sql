DROP DATABASE IF EXISTS github_users_db;
CREATE DATABASE github_users_db;

USE github_users_db;

-- table of all users 
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gitUserName VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY (id)
);

-- table containing all users who are in a group with details of the group they are in
CREATE TABLE user_group (
    id INTEGER NOT NULL AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    group_id INTEGER NOT NULL,
    PRIMARY KEY (id)
)

-- table of all groups on the site
CREATE TABLE groups (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    PRIMARY KEY (id)
);

-- table containing details on ever message sent
CREATE TABLE messages (
    id INT NOT NULL AUTO_INCREMENT,
    creator_id INT NOT NULL,
    message_body TEXT NOT NULL,
    create_date DATE,
    PRIMARY KEY (id)
);

-- table for recipients of every message sent, including messages sent to groups
CREATE TABLE message_recipient (
    id INT NOT NULL AUTO_INCREMENT,
    recipient_id INT NOT NULL,
    recipient_group_id INT NOT NULL,
    message_id INT NOT NULL,
    PRIMARY KEY (id)
);