# Utiliser une image de base officielle Node.js
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application TypeScript
RUN npm run build

# Exposer le port de l'application
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "start"]
