CREATE TABLE categories (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE products (
    id int NOT NULL AUTO_INCREMENT,
    category_id int NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(1000) NOT NULL,
    img varchar(255),
    price int,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE users(
    id int NOT NULL AUTO_INCREMENT,
    username varchar(50) NOT NULL UNIQUE,
    password varchar(100) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO categories (name) VALUES ('Baby'),('Home'),('Furniture'),('Electronics');
INSERT INTO Products (category_id, name, description, img, price) VALUES
    (1,'Car Seat','Specifically for infants - convenience for you and comfort for baby.','1.jpg', 12379),
    (1,'Diaper','Made for your growing baby','2.jpg',3099),
    (2,'Area rug','Inspired by abstract art, distressed washes of blue, beige, brown, red and tan color come together in the modern design of Mohawk Homes Aqua Fusion Area Rug.','3.jpg',6999),
    (2,'Scale','Mechanical bathroom scale','4.jpg',1999),
    (3,'Home Office Set','Young and fresh, the Chrono Collection from Nexera has everything to please.','5.jpg',39999),
    (3,'Bookcase','Add the sleek Mainstays 3-Shelf Bookcase to almost any room for a functional and stylish look.','6.jpg',9999),
    (4,'Portable BLUETOOTH','Bring your music to life with EXTRA BASS','7.jpg',11579),
    (4,'Samsung Galaxy','We get you. The standout in the crowd, the one with relentless passion. ','8.jpg',79979);