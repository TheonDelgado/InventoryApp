import express from "express";
import { getAllGames, gameById, createGame, updateGame, deleteGame} from "../controller/apiController.js";

export const router = express.Router();

router.get("/api", getAllGames);

router.get("/api/:id", gameById);

router.post("/api/create", createGame);

router.post("/api/update", updateGame);

router.post("/api/delete", deleteGame);