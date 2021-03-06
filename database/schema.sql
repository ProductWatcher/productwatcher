DROP DATABASE IF EXISTS target;

CREATE DATABASE target;
\c target;

CREATE SCHEMA product_list;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  product_id INTEGER PRIMARY KEY,
  product_name varchar(30) NOT NULL,
  link_to varchar(200) NOT NULL,
  img varchar(200)
);

DROP TABLE IF EXISTS price_data;

CREATE TABLE price_data (
  price_id SERIAL PRIMARY KEY,
  date_of DATE NOT NULL DEFAULT CURRENT_DATE,
  price numeric,
  id_of integer
);

ALTER TABLE public.price_data ADD CONSTRAINT price_belongs_to FOREIGN KEY (id_of) REFERENCES public.products (product_id);

\COPY products(product_id, product_name, link_to, img) FROM '../CSV/products.csv' DELIMITER ',' CSV HEADER;

\COPY price_data(date_of, price ,id_of) FROM '../CSV/prices.csv' DELIMITER ',' CSV HEADER;