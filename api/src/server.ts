import "dotenv/config"; // Charge toutes les variables d'environnement de `.env` automatiquement
import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "./ormconfig"; // Assurez-vous que le chemin est correct
import express from "express";
import { User } from "./entity/User"; // Vérifiez le chemin après compilation

const app = express();
const port = 3001;

createConnection(config)
  .then(async (connection) => {
    app.get("/", async (req, res) => {
      try {
        const userRepository = connection.getRepository(User);
        const users = await userRepository.find();
        res.json(users);
      } catch (error) {
        if (error instanceof Error) {
          // Vérification du type de l'erreur
          res.status(500).json({ error: error.message });
        } else {
          res
            .status(500)
            .json({ error: "Une erreur inconnue s'est produite." });
        }
      }
    });

    app.listen(port, () => {
      console.log(`API server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    if (error instanceof Error) {
      // Vérification du type de l'erreur
      console.error(
        "Erreur lors de la connexion à la base de données : ",
        error.message
      );
    } else {
      console.error(
        "Une erreur inconnue s'est produite lors de la connexion à la base de données."
      );
    }
    process.exit(1); // Arrêter le processus en cas d'erreur de connexion
  });

// Gestion globale des promesses non traitées
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Vous pouvez ajouter une logique pour notifier l'équipe, logger, etc.
});
