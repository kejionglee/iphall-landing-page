-- Database schema for IP AI Landing Page quotation system
-- This creates the quotationlist table for storing service, country, item, and fee details

CREATE TABLE IF NOT EXISTS quotationlist (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    service text,
    country text,
    item text,
    "prof fee" integer,
    "official fee" integer,
    disbursement integer,
    currency text
);
