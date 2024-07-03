# Utiliser une image de base Python
FROM python:3.9-slim

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers de test et les dépendances
COPY test/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le script de test dans le conteneur
COPY test/test_database.py .

# Commande par défaut pour exécuter le test
CMD ["python", "test_database.py"]
