INSERT INTO users (first_name, last_name, gitUserName, password) VALUES("Brandon", "Phillips", 'BrandonP321', 'scooby321');
INSERT INTO users (first_name, last_name, gitUserName, password) VALUES("parker", "Phillips", 'BrandonP321', 'scoobydoo');
INSERT INTO users (first_name, last_name, gitUserName, password) VALUES("dylan", "sandbak", 'sandback15', 'dylanPassword');
INSERT INTO users (first_name, last_name, gitUserName, password) VALUES("ryan", "larson", 'ryanl390', 'ryanPassword');

INSERT INTO all_groups (name) VALUES("first group");
INSERT INTO all_groups (name) VALUES("second group");

INSERT INTO user_group (user_id, group_id) VALUES(1, 2);
INSERT INTO user_group (user_id, group_id) VALUES(2, 1);
INSERT INTO user_group (user_id, group_id) VALUES(3, 2);
INSERT INTO user_group (user_id, group_id) VALUES(4, 2);
INSERT INTO user_group (user_id, group_id) VALUES(4, 1);

INSERT INTO messages (creator_id, message_body, create_date) VALUES(2, 'i am person of id 2 sending my first message', '2020-10-9');
INSERT INTO messages (creator_id, message_body, create_date) VALUES(4, 'i am person of id 4 sending my first message', '2020-10-10');
INSERT INTO messages (creator_id, message_body, create_date) VALUES(1, 'i am person of id 1 sending my first message', '2020-10-11');
INSERT INTO messages (creator_id, message_body, create_date) VALUES(4, 'i am person of id 4 sending my second message', '2020-10-12');

INSERT INTO message_recipient (recipient_group_id, message_id) VALUES(1, 1);
INSERT INTO message_recipient (recipient_group_id, message_id) VALUES(2, 2);
INSERT INTO message_recipient (recipient_group_id, message_id) VALUES(2, 3);
INSERT INTO message_recipient (recipient_group_id, message_id) VALUES(1, 4);