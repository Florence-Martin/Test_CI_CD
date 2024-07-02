# Test_CI_CD

## Mettre en place un Docker compose

<details>
  <summary>Étape 1 : Créer les fichiers nécessaires (front/api/db)</summary>

- [fichier docker-compose.yaml](./docker-compose.yml)
- fichiers Dockerfile

- [fichier init.sql dans le répertoire postgres](./postgres/init.sql)

- fichier .env pour les variables d'environnement à la racine du projet
</details>

<details>
  <summary>Étape 2 : Démarrer les services Docker</summary>

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

</details>
<details>
  <summary>Étape 3 : Interagir avec la base de données PostgreSQL</summary>

- Accéder au conteneur PostgreSQL

```sh
docker exec -it test_ci_cd-db-1 psql -U your-username -d mydb
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

- Quitter psql

```sh
\q
```

</details>
<details>
  <summary>Étape 4 : Automatisation des tests (workflow GitHub actions)</summary>

- Créer par exemple le fichier de test test_db.py : [fichier test_db.py](./tests/test_db.py)
</details>
<details>
  <summary>Étape 5 : Créer le workflow GitHub Actions</summary>

- Créer ou modifier le répertoire .github/workflows
- Configurer les clés chiffrées sur le repo sur gitHub action
</details>
<details>
  <summary>Étape 6 : Vérifier le statut du workflow GitHub Actions</summary>

- Ouvrez le dépôt sur GitHub.
- Accéder à l'onglet "Actions".
- Voir le workflow en cours d'exécution.
- Commandes pour vérifier localement

/**Vérifier les linters**

```sh
cd ./front
npm install
npm run lint

cd ../api
npm install
npm run lint

```

/**Vérifier les tests de la base de données**

```sh
docker-compose up -d

pip install pytest psycopg2-binary
pytest tests/test_db.py

```

</details>
<details>
  <summary>Étape 7 : Vérifier le le déploiement sur le VPS</summary>

#### 1. Vérifier les services Docker

- utiliser SSH pour se connecter à votre VPS

```sh
ssh username@your-vps-ip -p your-ssh-port
```

- vérifier les conteneurs Docker (si ok, on a en cours d’exécution les services front, api, et db)

```sh
sudo docker ps
```

#### 2. Vérifier les logs des conteneurs

- afficher les logs pour détecter d’éventuelles erreurs

```sh
sudo docker logs <container_id>
```

#### 3. Tester l’application

- Accéder àl'application depuis lenavigateur ou utilisez curl pour vérifier que les services sont accessibles.

  - Tester le front-end

    - Ouvrir le navigateur et accéder à l’adresse IP du VPS suivie du port exposé pour le front-end :

```sh
http://your-vps-ip:3000
```

- Tester l’API
  - Utilisez curl pour tester un endpoint de l’API :

```sh
curl http://your-vps-ip:3001/your-api-endpoint
```

#### 4. Vérifier la base de données

- Connexion à PostgreSQL

```sh
psql -h your-vps-ip -U postgres -d base_test -W
```

Entrez le mot de passe défini dans le fichier docker-compose.yml

#### 5. Ajouter une étape avec GitHub Actions

- Ajouter une étape pour vérifier que les conteneurs sont en cours d’exécution après le déploiement

```yml
- name: Check running containers
  uses: appleboy/ssh-action@v0.1.8
  with:
    host: ${{ secrets.HOST }}
    port: ${{ secrets.SSH_PORT }}
    username: ${{ secrets.USERNAME }}
    password: ${{ secrets.PASSWORD }}
    script: |
      sudo docker ps
```
