-- Création de la table user
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    age INT NOT NULL
);

-- Insertion de données initiales
INSERT INTO "user" (firstName, lastName, age) VALUES
    ('John', 'Doe', 30),
    ('Jane', 'Doe', 25),
    ('Alice', 'Smith', 35);
