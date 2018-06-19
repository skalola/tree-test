USE qziykso7n4bw0u6d;

INSERT INTO branches(branch_name,branch_range_start,branch_range_end,children)
VALUES("Parent One",10,50,5);

INSERT INTO leaves(branch_id,leaf_number)
VALUES(1,15);

INSERT INTO leaves(branch_id,leaf_number)
VALUES(1,30);

INSERT INTO leaves(branch_id,leaf_number)
VALUES(1,44);

INSERT INTO leaves(branch_id,leaf_number)
VALUES(1,27);

INSERT INTO leaves(branch_id,leaf_number)
VALUES(1,48);