# Test_CI_CD

- **CI (Continuous Integration)**: Intégration continue du code qui doit être testé et répondre aux attentes (scores).

  - **Processus** : On code les fonctionnalités et on les teste automatiquement pour s'assurer qu'elles répondent aux critères de qualité avant de les fusionner avec la branche principale.

- **CD (Continuous Deployment/Delivery)**: Automatisation du déploiement des applications, permettant la mise en ligne pour les utilisateurs finaux.
  - **Continuous Deployment** : Chaque changement validé passe par un pipeline d'automatisation et est mis en ligne automatiquement en production sans intervention manuelle.
  - **Continuous Delivery** : Les changements validés sont prêts à être déployés en production de manière automatisée, mais le déploiement nécessite une étape manuelle pour être finalisé.

## Mettre en place un Docker compose

**Docker** utilise :

- des **conteneurs** pour isoler et exécuter des applications
- des **images** pour stocker les états prédéfinis de ces applications
- des **volumes** pour persister les données au-delà de la durée de vie des conteneurs (mémoire Morte)

<details>
    <summary>Étape 1 : Créer les fichiers nécessaires (front/api/db)</summary>

- **fichiers Dockerfile**
  - Utilisé pour créer des images Docker. Ce fichier contient les instructions pour construire une image Docker, incluant l’installation des dépendances, la configuration de l’environnement, et la définition de la commande par défaut ou des processus à exécuter. Il est généralement placé à la racine du répertoire du service spécifique qu’il construit ou à la racine du projet si le projet est relativement simple.
- **fichier docker-compose** [fichier docker-compose.yml](./docker-compose.yml)
  - Utilisé pour définir et exécuter des applications multi-conteneurs Docker. Ce fichier spécifie comment les conteneurs interagissent, comment ils sont construits, quels volumes sont partagés entre eux, et d’autres configurations réseau. Il est souvent placé à la racine du projet pour centraliser la gestion des services.
- **Fichier Workflow GitHub Actions**
  - Le fichier de workflow pour GitHub Actions est stocké dans un répertoire .github/workflows à la racine du dépôt. Ces fichiers définissent les workflows automatisés pour la construction, les tests, et le déploiement du projet. Il est écrit en YAML et peut gérer divers événements tels que les push, les pull requests, ou les événements programmés.
- [fichier init.sql dans le répertoire postgres](./postgres/init.sql) (facultatif)
- fichier `.env` pour les variables d'environnement à la racine du projet **MAIS** bien mieux de mettre les variables d'environnement sur GitHub Action ("Secrets and Variables")

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

- penser à modifier les ports dans le fichier docker-compose.yml avec ceux du VPS

```yml
// exemple
version: '3'
services:
  api:
    build:
      context: ./api
    container_name: api-container
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production

  front:
    build:
      context: ./front
    container_name: front-container
    ports:
      - "9015:3000"  # Mappe le port 9015 de l'hôte au port 3000 du conteneur
    environment:
      - NODE_ENV=production
```

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

- Accéder à l'application depuis le navigateur ou utilisez curl pour vérifier que les services sont accessibles.

  - Tester le front-end

    - Ouvrir le navigateur et accéder à l’adresse IP du VPS suivie du port exposé pour le front-end :

```sh
http://your-vps-ip:port_vps
```

- Tester l’API
  - Utilisez curl pour tester un endpoint de l’API :

```sh
curl http://your-vps-ip:port_vps/your-api-endpoint
```

- Vérifier les ports exposés (ouverts et accessibles):

```sh
//front
sudo ss -tuln | grep port_vps

//api
sudo ss -tuln | grep port_vps
```

- Vérifier les règles de pare-feu du VPS (autorisation du trafic sur les ports):

```sh
//front
sudo ufw allow port_vps

//api
sudo ufw allow port_vps
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

<details>
  <summary>Étape 6 : Résolution de conflits dans les fichiers locaux et commit de ces changements</summary>

- les cmd classiques

```sh
git add .
git commit -m "Resolved conflicts and updated file_name"
git push origin main
```

- Configuration de mon identité Git

```sh
git config --global user.email "mon_email@exemple.com"
git config --global user.name "Mon Nom"
```

- Essai de pousser vos modifications mais rencontré un problème de non-fast-forward (Git a rejeté la mise à jour car ma branche locale était derrière la branche distante)

```sh
git pull --rebase origin main
```

- Vérification de l’état de votre dépôt local

```sh
git status
```

</details>

## Construction et déconstruction image Docker

<details>
  <summary>Étape 1 : Gérer image(s) Docker</summary>
  
- [Documentation de la commande docker-compose build](https://docs.docker.com/reference/cli/docker/compose/build/)
- Remove les conteneurs et le volume associé

```sh
docker-compose down -v
```

- Destruction de l'image

```sh
docker image prune -a
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

## Changement d'environnement

<details>
  <summary>Étape 1 : Problèmes liés aux dépendances et aux artefacts</summary>

- Résoudre les problèmes liés aux dépendances et aux artefacts de build provenant d’un environnement différent (Windows <=> Mac)

```sh
#!/bin/bash

# Pour l'API
cd path/to/api
rm -rf node_modules dist package-lock.json
npm install
npm run build

# Pour le Frontend
cd path/to/frontend
rm -rf node_modules .next package-lock.json
npm install
npm run build

# Retour au répertoire principal du projet
cd path/to/project/root

# Reconstruire et redémarrer les conteneurs Docker
docker-compose build --no-cache
docker-compose up
```

  </details>
