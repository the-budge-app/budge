
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
--user table
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "phone_number" VARCHAR (20),
    "profile_phone_url" VARCHAR (1000),
    "account_balance" INT,
    "admin" BOOL
);

--restaurant table
CREATE TABLE "restaurant" (
    "id" SERIAL PRIMARY KEY,
    "restaurant_name" VARCHAR (200),
    "phone_number" VARCHAR (20),
    "address" VARCHAR (500),
    "city" VARCHAR(100),
    "state" VARCHAR (20),
    "zip" VARCHAR (10),
    "longitude" VARCHAR (20),
    "latitude" VARCHAR (20)
);

--waitlist status table
CREATE TABLE "waitlist_status" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR (500)
);

--waitlist table
CREATE TABLE "waitlist" (
    "id" SERIAL PRIMARY KEY,
    "restaurant_id" INT REFERENCES "restaurant",
    "user_id" INT REFERENCES "user",
    "reservation_name" VARCHAR (100),
    "party_size" INT,
    "quote_date" DATE,
    "quote_time" TIME,
    "buy_now_price" INT,
    "join_waitlist_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "status_code" INT REFERENCES "waitlist_status"
);

--offer status table
CREATE TABLE "offer_status" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR (500)
);

--offer table
CREATE TABLE "offer" (
	"id" SERIAL PRIMARY KEY,
	"waitlist_id" INT REFERENCES "waitlist",
	"buyer_id" INT REFERENCES "user",
	"offer_price" INT,
    "status_code" INT REFERENCES "offer_status"
);

--customer rating table
CREATE TABLE "customer_rating" (
	"id" SERIAL PRIMARY KEY,
	"offer_id" INT REFERENCES "offer",
	"user_id" INT REFERENCES "user",
	"given_by" INT REFERENCES "user",
	"rating" INT
);

--insert dummy data to restaurant table
INSERT INTO "restaurant" ("restaurant_name", "phone_number", "address", "city", "state", "zip", "latitude", "longitude")
VALUES ('Red Cow', '6122380050', '208 N 1st Ave', 'Minneapolis', 'MN', '55401', '44.983550', '-93.269526'),
('Red Rabbit', '6127678855', '201 N Washington Ave', 'Minneapolis', 'MN', '55401', '44.983616', '-93.271683'),
('The Freehouse', '6123397011', '701 N Washington Ave #101', 'Minneapolis', 'MN', '55401', '44.987640', '-93.276965'),
('Nolos', '6128006033', '515 N Washington Ave #100', 'Minneapolis', 'MN', '55401', '44.986472', '-93.275365'),
('Jefe', '6122552000', '219 SE Main St', 'Minneapolis', 'MN', '55414', '44.984033', '-93.254192'),
('Jl Beers', '6122080400', '24 University Ave NE #100', 'Minneapolis', 'MN', '55413', '44.988868', '-93.257041');
