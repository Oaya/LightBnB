DROP TABLE IF EXISTS users,properties, reservations, property_reviews  CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE properties (
    id SERIAL PRIMARY KEY NOT NUll,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    thunbmail_photo_url VARCHAR(255),
    cover_photo_url VARCHAR(255),
    cost_per_night INTEGER NOT NULL,
    parking_spaces INTEGER ,
    number_of_bathrooms INTEGER NOT NULL,
    number_of_bedrooms INTEGER NOT NULL,
    country VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    post_code VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL,
    
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE reservations (
    id SERIAL PRIMARY KEY NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,

    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE property_reviews (
    id SERIAL PRIMARY KEY NOT NULL,
    rating SMALLINT NOT NULL,
    message TEXT,

    guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    reservation_id INTEGER REFERENCES reservations(id) ON DELETE CASCADE
);    