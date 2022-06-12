/* Replace with your SQL commands */

CREATE TYPE Status AS ENUM ('active', 'complete');
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status Status NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL
);