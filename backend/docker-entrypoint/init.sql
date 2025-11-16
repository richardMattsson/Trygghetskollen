DROP TABLE IF EXISTS reportedlinks CASCADE;
DROP TABLE IF EXISTS reportedphonenumbers CASCADE;
DROP TABLE IF EXISTS testResults CASCADE;
DROP TABLE IF EXISTS testQuestion CASCADE;
DROP TABLE IF EXISTS testQuestionPhone CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS wallPosts CASCADE;


CREATE TABLE users (
  id serial PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE reportedPhoneNumbers (
  id serial PRIMARY KEY,
  phone_number TEXT UNIQUE NOT NULL,
  report_count INTEGER DEFAULT 1,
  freetext TEXT,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE reportedLinks (
  id serial PRIMARY KEY,
  link TEXT UNIQUE NOT NULL,
  report_count INTEGER DEFAULT 1,
  last_reported TIMESTAMP DEFAULT now(),
  freetext TEXT,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE testQuestion (
  id serial PRIMARY KEY,
  question TEXT NOT NULL
);

CREATE TABLE testQuestionPhone (
  id serial PRIMARY KEY,
  question TEXT NOT NULL
);

CREATE TABLE testResults (
  id serial PRIMARY KEY,
  user_id INTEGER,
  suspect_details TEXT,
  result INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE wallPosts (
  id serial PRIMARY KEY,
  report_count INTEGER DEFAULT 1,
  phone_number TEXT NOT NULL,
  free_text TEXT NOT NULL,
  severity TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

INSERT INTO testQuestion(question)
VALUES
('Innehöll meddelandet en länk som du uppmanades att klicka på?'),
('Bad meddelandet dig att logga in, lämna personuppgifter eller uppge kortinformation?'),
('Kom meddelandet oväntat eller från någon du inte känner?'),
('Stod det att något brådskande skulle hända om du inte agerade direkt (t.ex. att ditt konto skulle spärras eller ett paket skulle gå förlorat)?'),
('Verkade avsändarens nummer eller e-postadress konstig (t.ex. felstavad, ovanlig domän eller ett vanligt mobilnummer istället för en officiell kontakt)?');

INSERT INTO testQuestionPhone(question)
VALUES
('Presenterade sig personen som någon från en bank, myndighet eller ett företag utan att du själv kontaktat dem först?'),
('Bad personen dig att lämna personliga uppgifter, kortnummer, BankID eller annan känslig information under samtalet?'),
('Lät personen stressad, hotfull eller försökte skapa panik för att få dig att agera snabbt (t.ex. "någon försöker ta dina pengar just nu!")?'),
('Sa personen att du behövde ladda ner en app, logga in på din bank eller dela en kod för att lösa ett problem?'),
('Verkade numret misstänkt t.ex. dolt, ovanligt långt eller liknade ett svenskt nummer men inte exakt (ex. +46701 i stället för 0701)?');

INSERT INTO users (username, password) VALUES ('Jane Doe', 'password'), ('Adam Pålsson', '1234'), ('Hugo Larsson', 'secret');

INSERT INTO reportedPhoneNumbers (phone_number, freetext) VALUES ('077-8137813', 'Använde kivra');

INSERT INTO reportedLinks (link, freetext) VALUES ('www.scam.com', 'internetbedrägeri');

INSERT INTO testResults (user_id, suspect_details, result) VALUES (1, '077-8137813', 13);

INSERT INTO wallPosts (free_text, phone_number, severity) VALUES
('Svara inte på detta numret!!!', '077-8137813', 'red'),
('Ringer hela tiden', '071-121212', 'yellow'),
('Påstår sig komma från Kivra', '08-121212', 'red'),
('Påstår sig komma från Kivra nr2', '08-121212', 'orange');

CREATE INDEX testResults_user_id ON testResults (user_id);

SELECT * FROM reportedPhoneNumbers;
SELECT * FROM reportedLinks;
SELECT * FROM testResults;
SELECT * FROM testQuestion;
SELECT * FROM testQuestionPhone;
SELECT * FROM wallPosts;
