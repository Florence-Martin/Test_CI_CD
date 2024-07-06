-- Suppression de la table user si elle existe déjà
DROP TABLE IF EXISTS "user";

-- Création de la table user
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    age INT NOT NULL
);

-- Insertion de données initiales
INSERT INTO "user" (firstname, lastname, age) VALUES
    ('John', 'Doe', 30),
    ('Jane', 'Doe', 25),
    ('Alice', 'Smith', 35),
    ('Fred', 'Smith', 40);