# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

## Important note: tokens are sent in the authorization bearer token.

#### Products

- Index ==> '/products' [GET]
- Show ==> '/products/:id' [GET]
- Products by category ==> '/products?category=food' [GET]
- Create [token required] ==> '/products' [POST]
- Delete [token required] ==> '/products/:id' [DELETE]

#### Users

- Index [token required] ==> '/users' [GET]
- Show [token required] ==> '/users/:id' [GET]
- Create ==> '/users' [POST]

#### Orders

- Index [token required] ==> '/orders' [GET]
- Current Order by user (args: user id)[token required] ==> '/orders/active/users/:id' [GET]
- Completed Orders by user (args: user id)[token required] ==> '/orders/complete/users/:id' [GET]
- create [token required] ==> '/orders' [POST]

## Data Shapes

#### Products table

- id (SERIAL PRIMARY KEY)
- name (VARCHAR(50) NOT NULL)
- price (FLOAT NOT NULL)
- category (VARCHAR(30))

#### Users table

- id (SERIAL PRIMARY KEY)
- firstName VARCHAR(100) NOT NULL
- lastName VARCHAR(100) NOT NULL
- password VARCHAR NOT NULL

#### Orders table

- id (SERIAL PRIMARY KEY)
- status (Status NOT NULL) (active or complete)
- user_id (INTEGER REFERENCES users(id) NOT NULL) ==> foreign key

#### order_products table

- id (SERIAL PRIMARY KEY)
- quantity (INTEGER),
- order_id (INTEGER REFERENCES orders(id)) ==> foreign key
- product_id (INTEGER REFERENCES products(id)) ==> foreign key
