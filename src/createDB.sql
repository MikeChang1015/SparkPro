DROP TABLE IF EXISTS homeowners;
DROP TABLE IF EXISTS cleaners;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    username VARCHAR(100) PRIMARY KEY,
    pwd TEXT NOT NULL,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    location VARCHAR(100) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('HomeOwner', 'Cleaner')) NOT NULL
);

CREATE TABLE homeowners (
    username VARCHAR PRIMARY KEY REFERENCES users(username) ON DELETE CASCADE,
    occupation VARCHAR(100) NOT NULL,
    budget NUMERIC(10, 2) NOT NULL
);

CREATE TABLE cleaners (
    username VARCHAR PRIMARY KEY REFERENCES users(username) ON DELETE CASCADE,
    experience INT NOT NULL,
    payPerHour INT NOT NULL,
    services TEXT[]  NOT NULL -- comma-separated in form, convert to array
);

select * from users;
select * from homeowners;
select * from cleaners;