UPDATE pg_database SET datcollate = 'en_US.utf8' WHERE datname = 'template1';
UPDATE pg_database SET datcollate = 'en_US.utf8' WHERE datname = 'postgres';

-- CREATE USER test_user WITH PASSWORD '12345678';
-- CREATE DATABASE test_db;
-- GRANT ALL PRIVILEGES ON DATABASE test_db TO test_user;