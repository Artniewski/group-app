INSERT into USERS (id, nickname, rating, is_old_man)
VALUES ('1', 'John', 5, true);
INSERT into USERS (id, nickname, rating, is_old_man)
VALUES ('2', 'Jane', 4, true);
INSERT into USERS (id, nickname, rating, is_old_man)
VALUES ('3', 'Jack', 3, true);
INSERT into USERS (id, nickname, rating, is_old_man)
VALUES ('4', 'Jill', 2, true);


INSERT into COURSES (name, id)
VALUES ('Java', 'c1');
INSERT into COURSES (name, id)
VALUES ('Python', 'c2');


INSERT into TASKLISTS (list_number)
VALUES (1);
INSERT into TASKLISTS (list_number)
VALUES (2);

INSERT into TASKLISTS (list_number)
VALUES (1);


INSERT into TASKS (task_number, tasklist_id)
VALUES (1, 1);
INSERT into TASKS (task_number, tasklist_id)
VALUES (2, 1);
INSERT into TASKS (task_number, tasklist_id)
VALUES (3, 1);

INSERT into TASKS (task_number, tasklist_id)
VALUES (1, 2);
INSERT into TASKS (task_number, tasklist_id)
VALUES (2, 2);

INSERT into TASKS (task_number, tasklist_id)
VALUES (1, 3);
INSERT into TASKS (task_number, tasklist_id)
VALUES (2, 3);

