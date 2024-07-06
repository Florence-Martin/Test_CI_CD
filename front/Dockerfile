# Utiliser une image de base officielle Node.js
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie des fichiers nécessaires
COPY package*.json ./
COPY next.config.mjs ./
COPY pages ./pages

# Installation des dépendances
RUN npm install --production

# Construire l'application Next.js
RUN npm run build

# Exposer le port de l'application
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]
