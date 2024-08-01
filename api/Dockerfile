# Utiliser une image de base officielle Node.js
FROM node:20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier les fichiers source de l'application
COPY . .

# Compiler
RUN npm run build

# Exposer le port de l'application
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]
