import "dotenv/config";
import "reflect-metadata";
import express from "express";
const bodyParser = require("body-parser");
import { AppDataSource } from "./ormconfig"; // Assurez-vous que le chemin est correct
import { User } from "./entity/User"; // Vérifiez le chemin après compilation
import cors from "cors";

const app = express();
const port = 3001;
// Middleware CORS
app.use(cors());

// Middleware qui analyse les requêtes contenant des JSON.
app.use(bodyParser.json());
// Middleware qui analyse les requêtes contenant des données encodées en URL
app.use(bodyParser.urlencoded({ extended: true }));

AppDataSource.initialize()
  .then(async () => {
    app.get("/", async (req, res) => {
      try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        res.json(users);
      } catch (error) {
        if (error instanceof Error) {
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
      console.error(
        "Erreur lors de la connexion à la base de données : ",
        error.message
      );
    } else {
      console.error(
        "Une erreur inconnue s'est produite lors de la connexion à la base de données."
      );
    }
    process.exit(1);
  });

// Gestion globale des promesses non traitées
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
