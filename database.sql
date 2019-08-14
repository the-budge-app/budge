
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

--database name at localhost: budge_app
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "phone_number" VARCHAR (20),
    "email_address" VARCHAR (50),
    "profile_phone_url" VARCHAR (1000),
    "account_balance" INT DEFAULT 0,
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
    "quote_time" INT,
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
    "status_code" INT REFERENCES "offer_status",
    "status_time" timestamp
);

--customer rating table

CREATE TABLE "customer_rating" (
    "id" SERIAL PRIMARY KEY,
    "offer_id" INT REFERENCES "offer",
    "user_id" INT REFERENCES "user",
    "given_by" INT REFERENCES "user",
    "rating" INT
);

-- feedback table
CREATE TABLE "customer_feedback" (
    "id" SERIAL PRIMARY KEY,
    "email_address" VARCHAR (50),
    "description" VARCHAR (2000),
    "feedback_date" DATE DEFAULT CURRENT_DATE
);

-- admin table
CREATE TABLE "admin" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (80) UNIQUE NOT NULL,
    "last_name" VARCHAR (1000) NOT NULL,
     "email_address" VARCHAR (50) NOT NULL,
    "phone_number" VARCHAR (20),
    "comments" VARCHAR (1000) NOT NULL
);



--insert dummy data to restaurant table
INSERT INTO "public"."restaurant"("restaurant_name","phone_number","address","city","state","zip","longitude","latitude")
VALUES
('Red Cow','6122380050','208 N 1st Ave','Minneapolis','MN','55401','-93.269526','44.983550'),
(E'Red Rabbit',E'6127678855',E'201 N Washington Ave',E'Minneapolis',E'MN',E'55401',E'-93.271683',E'44.983616'),
(E'The Freehouse',E'6123397011',E'701 N Washington Ave #101',E'Minneapolis',E'MN',E'55401',E'-93.276965',E'44.987640'),
(E'Nolos',E'6128006033',E'515 N Washington Ave #100',E'Minneapolis',E'MN',E'55401',E'-93.275365',E'44.986472'),
(E'Jefe',E'6122552000',E'219 SE Main St',E'Minneapolis',E'MN',E'55414',E'-93.254192',E'44.984033'),
(E'Jl Beers',E'6122080400',E'24 University Ave NE #100',E'Minneapolis',E'MN',E'55413',E'-93.257041',E'44.988868');

INSERT INTO "public"."waitlist_status"("description")
VALUES
(E'active'),
(E'inactive'),
(E'pending');

INSERT INTO "public"."offer_status"("description")
VALUES
(E'active'),
(E'rejected by seller'),
(E'retracted by buyer'),
(E'completed'),
(E'expired');


