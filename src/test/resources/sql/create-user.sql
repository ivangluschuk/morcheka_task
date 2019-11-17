delete from usr;
delete from note;
delete from user_role;

insert into usr(id, username, password, acc_non_exp, acc_non_lock, cred_non_exp, enabled) values
(1, 'z1', '$2a$10$7phTkQNqjePAnx5rbb8iGe437EzYr.lrA0f6qGhyom3Ew3rwSMlBq', true, true, true, true);

insert into user_role(user_id, authorities) values (1, 'USER');