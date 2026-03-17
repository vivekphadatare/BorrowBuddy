CREATE DATABASE borrowbuddy;
use borrowbuddy;
SELECT * FROM users;
CREATE TABLE item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_email VARCHAR(255) NOT NULL
);
ALTER TABLE items
ADD COLUMN price DOUBLE,
ADD COLUMN rate_type VARCHAR(20);
UPDATE items SET price = 0.0 WHERE price IS NULL;
