import { getGames, getGameById, insertGame, replaceGame, removeGame } from "../database.js";

export async function getAllGames(req, res) {
    const games = await getGames();
    res.json(games);
}

export async function gameById (req, res) {
    const id = req.params.id;
    const game = await getGameById(id);
    res.json(game[0]);
}

export async function createGame(req, res) {

    const {title, description, price, onHand} = req.body;

    const game = insertGame(title, description, price, onHand);

    res.json(game);
}

export async function updateGame(req, res) {
    const {id, title, description, price, onHand} = req.body;

    const game = replaceGame(id, title, description, price, onHand);

    res.json(game);
}

export async function deleteGame(req, res) {
    const {id} = req.body;

    const game = removeGame(id);

    res.json(game);
}