CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >=1 and price_range <=5)
);

INSERT INTO restaurants (name,location, price_range) values ('chipolte', 'atlanta', 2);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 and rating <=5)
);

INSERT INTO reviews (restaurant_id, name, review, rating) values ( 2, 'Maria', 'the best restaurant', 4);

INSERT INTO reviews (restaurant_id, name, review, rating) values (4, 'Mark', 'restaruant horrible', 2);