# Test_CI_CD

## Mettre en place un Docker compose

**Docker** utilise :

- des **conteneurs** pour isoler et exécuter des applications
- des **images** pour stocker les états prédéfinis de ces applications
- des **volumes** pour persister les données au-delà de la durée de vie des conteneurs (mémoire Morte)
<details>
  <summary>Étape 1 : Créer les fichiers nécessaires (front/api/db)</summary>

- [fichier docker-compose.yaml](./docker-compose.yml)
- fichiers Dockerfile

- [fichier init.sql dans le répertoire postgres](./postgres/init.sql)

- fichier .env pour les variables d'environnement à la racine du projet
</details>

<details>
  <summary>Étape 2 : Démarrer les services Docker</summary>

- shell : naviguer vers le répertoire où se trouve le fichier docker-compose.yml

- Lance tous les services définis dans le fichier docker-compose.yml

```sh
docker-compose up
```

- Démarrer l'API et le serveur Nginx (si le reverse proxy est configuré) en arrière-plan

```sh
docker-compose up -d
```

- Arrête les services sans les supprimer, permettant un redémarrage rapide

```sh
docker-compose stop
```

- Redémarrer tous les services ou 1 seul

```sh
// tous les services
docker-compose restart

// un seul
docker-compose restart [service_name]
```

- Arrêter et supprimer les ressources utilisées par les services avec Docker Compose

```sh
docker-compose down
```

- Redémarrer les services avec une reconstruction des images

```sh
docker-compose up --build -d
```

- Reconstruire les conteneurs sans utiliser le cache.

```sh
docker-compose build --no-cache
docker-compose up
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

## Mettre en place un workflow

<details>
  <summary>Étape 1 : Exemple d'automatisation de tests (workflow GitHub actions)</summary>

- Créer par exemple le fichier de test test_db.py : [fichier test_db.py](./tests/test_db.py)
</details>
<details>
  <summary>Étape 2 : Créer le workflow GitHub Actions</summary>

- Créer ou modifier le répertoire .github/workflows
- Configurer les clés chiffrées sur le repo sur gitHub action
</details>
<details>
  <summary>Étape 3 : Vérifier le statut du workflow GitHub Actions</summary>

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

## Vérifier le déploiement sur le VPS

<details>
  <summary>Étape 1 : Vérifier les services Docker & les gérer</summary>

- utiliser SSH pour se connecter à votre VPS

```sh
ssh username@your-vps-ip -p your-ssh-port
```

- lister les conteneurs Docker actifs et inactifs

```sh
sudo docker ps -a
```

- vérifier les conteneurs Docker actifs (si ok, on a en cours d’exécution les services front, api, et db)

```sh
sudo docker ps
```

- analyser l'utilisation des ressources par les conteneurs

```sh
sudo docker stats [CONTENEUR]
```

- démarrer un conteneur

```sh
sudo docker run [CONTENEUR_ID_OU_NOM]
```

- stopper un conteneur

```sh
sudo docker stop [CONTENEUR_ID_OU_NOM]
```

- supprimer un conteneur

```sh
docker rm [CONTENEUR_ID_OU_NOM]
```

</details>
<details>
  <summary>Étape 2 : Vérifier les logs des conteneurs</summary>

- afficher les logs pour détecter d’éventuelles erreurs

```sh
// tous les logs
sudo docker logs

// un seul services
sudo docker logs <container_id>

// en temps réel
sudo docker-compose logs -f
```

</details>
<details>
  <summary>Étape 3 : Tester l’application</summary>

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

</details>
<details>
  <summary>Étape 4 : Vérifier la base de données</summary>

- Connexion à PostgreSQL

```sh
psql -h your-vps-ip -U postgres -d base_test -W
```

Entrez le mot de passe défini dans le fichier docker-compose.yml

</details>

<details>
  <summary>Étape 5 : Ajouter une étape au Workflow</summary>

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

</details>

## Construction et déconstruction image Docker

<details>
  <summary>Étape 1 : Gérer image(s) Docker</summary>

- Remove les conteneurs et le volume associé

```sh
docker-compose down -v
```

- Destruction de l'image

```sh
udo docker image prune -a
```

- Démarre avec l'image existante

```sh
docker-compose up
```

- Démarre avec reconstruction de l'image

```sh
docker-compose up --build
```

---

- (facultatif) - Parfois il est nécessaire de remove les fichiers transpilés avant

```sh
// api : .dist
# Naviguez vers le dossier api
cd api

# Supprimez le dossier dist
rm -rf dist

# Reconstruisez le projet
npm run build
```

```sh
// front : .next
# Naviguez vers le dossier front
cd front

# Supprimez le dossier .next
rm -rf .next

# Reconstruisez le projet
npm run build
```

</details>
