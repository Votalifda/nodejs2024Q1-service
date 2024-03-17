UPDATE pg_database SET datcollate = 'en_US.utf8' WHERE datname = 'template1';
UPDATE pg_database SET datcollate = 'en_US.utf8' WHERE datname = 'postgres';