CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
UPDATE pg_database SET datcollate = 'en_US.utf8' WHERE datname = 'template1';
UPDATE pg_database SET datcollate = 'en_US.utf8' WHERE datname = 'postgres';
CREATE USER test_user WITH PASSWORD 'test_pwd_12345678';
CREATE DATABASE IF NOT EXISTS test_db;
GRANT ALL PRIVILEGES ON DATABASE test_db TO test_user;