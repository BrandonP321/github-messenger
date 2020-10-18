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
);

-- table of all groups on the site
CREATE TABLE all_groups (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    PRIMARY KEY (id)
);

-- table containing details on ever message sent
CREATE TABLE messages (
    id INT NOT NULL AUTO_INCREMENT,
    creator_id INT NOT NULL,
    recipient_group_id INT NOT NULL,
    message_body TEXT NOT NULL,
    create_date DATE,
    PRIMARY KEY (id)
);

-- VIEW to view all relevant info on each message sent so messages can then be pulled for any specific group chat
CREATE VIEW all_messages_data AS
SELECT messages.id AS message_id, message_body AS message, first_name AS creator, users.id AS creator_id, all_groups.name AS recipient_group_name, all_groups.id AS recipient_group_id, messages.create_date AS creation_date
FROM message_recipient
INNER JOIN messages ON messages.id = message_recipient.message_id
INNER JOIN all_groups ON all_groups.id = message_recipient.recipient_group_id
INNER JOIN users ON users.id = messages.creator_id;