"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const User_1 = require("./entity/User");
const app = (0, express_1.default)();
const port = 3001;
(0, typeorm_1.createConnection)()
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userRepository = connection.getRepository(User_1.User);
        const users = yield userRepository.find();
        res.json(users);
    }));
    app.listen(port, () => {
        console.log(`API server running at http://localhost:${port}`);
    });
}))
    .catch((error) => console.log(error));
