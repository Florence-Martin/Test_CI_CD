import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { User } from "./entity/User";

const app = express();
const port = 3001;

createConnection()
  .then(async (connection) => {
    app.get("/", async (req, res) => {
      const userRepository = connection.getRepository(User);
      const users = await userRepository.find();
      res.json(users);
    });

    app.listen(port, () => {
      console.log(`API server running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
