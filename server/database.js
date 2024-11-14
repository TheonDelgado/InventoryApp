import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise();

export async function getGames() {
    const [rows] = await pool.query("SELECT * FROM inventory");
    return rows;
}

export async function getGameById(id) {
    const game = await pool.query("SELECT * FROM inventory WHERE id = ?", [id]);
    return game;
}

export async function insertGame(title, description, price, onHand) {
    const [result] = await pool.query(`
        INSERT INTO inventory (title, description, price, onHand)
        VALUES (?, ?, ?, ?)
        `, [title, description, price, onHand]);

        const id = result.insertId;
        return getGameById(id);
}

export async function replaceGame(id, title, description, price, onHand) {
    const [result] = await pool.query(`UPDATE inventory
        SET title = '${title}', description = '${description}', price = ${price}, onHand = ${onHand}
        WHERE id = ${id}`)
        
}

export async function removeGame(id) {
    const game = await pool.query(`DELETE FROM inventory 
        WHERE id = ${id}`);
        
    return game;
}