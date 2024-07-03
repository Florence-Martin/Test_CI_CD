# Utiliser une image de base appropriée
FROM python:3.8-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers de l'application dans le conteneur
COPY . .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Installer pytest et psycopg2-binary
RUN pip install pytest psycopg2-binary

# Définir la commande par défaut
CMD ["pytest"]
