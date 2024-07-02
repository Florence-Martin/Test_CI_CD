# Test_CI_CD

## Mettre en place un Docker compose

### Étape 1 : Créer les fichiers nécessaires

- [fichier docker-compose.yaml](./docker-compose.yml)

- [fichier init.sql dans le répertoire postgres](./postgres/init.sql)

- fichier .env pour les variables d'environnement à la racine du projet

### Étape 2 : Démarrer les services Docker

- shell : naviguez vers le répertoire où se trouve le fichier docker-compose.yml
- Démarrez les services avec Docker Compose

```sh
docker-compose up -d
```

- Arrêtez les services avec Docker Compose

```sh
docker-compose down
```
  - Redémarrez les services avec une reconstruction des images
  ```sh
  docker-compose up --build -d
  ```

### Étape 3 : Interagir avec la base de données PostgreSQL

- Accéder au conteneur PostgreSQL

```sh
docker exec -it test_ci_cd-db-1 psql -U myuser -d mydb
```

- Insérer des données

```sh
INSERT INTO "user" ("firstName", "lastName", "age") VALUES ('JOHN', 'DOE', 30), ('JANE', 'DOE', 25), ('ALICE', 'SMITH', 15);
```

- Vérifier les données

```sh
SELECT * FROM "user";
```

- Résultat

La sortie a montré les lignes insérées correctement :

```sh
 id | firstName | lastName | age
----+-----------+----------+-----
  1 | JOHN      | DOE      |  30
  2 | JANE      | DOE      |  25
  3 | ALICE     | SMITH    |  15
(3 rows)
```

### Étape 4 : Quitter psql

```sh
\q
```
