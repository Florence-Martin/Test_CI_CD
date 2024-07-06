# Utiliser une image de base officielle Node.js
FROM node:20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Construire l'application TypeScript
RUN npm install typescript

# Assurez-vous que `tsc` a les permissions d'exécution correctes
RUN chmod +x node_modules/.bin/tsc

# Construire l'application TypeScript
RUN npm run build

# Exposer le port de l'application
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm","run","start"]
