var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "dotenv/config"; // Charge toutes les variables d'environnement de `.env` automatiquement
import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "./ormconfig"; // Assurez-vous que le chemin est correct
import express from "express";
import { User } from "./entity/User"; // Vérifiez le chemin après compilation
const app = express();
const port = 3001;
createConnection(config)
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userRepository = connection.getRepository(User);
            const users = yield userRepository.find();
            res.json(users);
        }
        catch (error) {
            if (error instanceof Error) {
                // Vérification du type de l'erreur
                res.status(500).json({ error: error.message });
            }
            else {
                res
                    .status(500)
                    .json({ error: "Une erreur inconnue s'est produite." });
            }
        }
    }));
    app.listen(port, () => {
        console.log(`API server running at http://localhost:${port}`);
    });
}))
    .catch((error) => {
    if (error instanceof Error) {
        // Vérification du type de l'erreur
        console.error("Erreur lors de la connexion à la base de données : ", error.message);
    }
    else {
        console.error("Une erreur inconnue s'est produite lors de la connexion à la base de données.");
    }
    process.exit(1); // Arrêter le processus en cas d'erreur de connexion
});
// Gestion globale des promesses non traitées
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    // Vous pouvez ajouter une logique pour notifier l'équipe, logger, etc.
});
