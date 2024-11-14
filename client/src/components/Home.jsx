import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { createContext } from 'react';
import GameContext from "./GameContext";

export default function Home() {

    const emptyGame = {
        id: "",
        title: '',
        description: '',
        price: '',
        onHand: ''
    }

    const [formData, setFormData] = useState(emptyGame);

    const [gameData, setGameData] = useState([]);

    const gameContext = createContext(gameData);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:3001/api");
            const data = await response.json();

            setGameData(data);
        }

        fetchData();
    }, [gameData])



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        for (let i = 0; i < 4; i++) {
            e.target[i].value = "";
        }

        setGameData([]);
    };

    return (
        <GameContext.Provider value={gameData}>
            <div>
                <form method='POST' onSubmit={handleSubmit}>
                    <label htmlFor='title'>Title</label>
                    <input name='title' type='text' onChange={handleChange}></input>
                    <label htmlFor='description'>Description</label>
                    <input name='description' type='text' onChange={handleChange}></input>
                    <label htmlFor='price'>Price</label>
                    <input name='price' type='text' onChange={handleChange}></input>
                    <label htmlFor='onHand'>On Hand</label>
                    <input name='onHand' type='text' onChange={handleChange}></input>
                    <button type='submit'>Submit</button>
                </form>
                <div>
                    {gameData.map((game) =>
                        <ul>
                            <Card id={game.id} title={game.title} description={game.description} price={game.price} onHand={game.onHand}></Card>
                        </ul>)}
                </div>
            </div>
        </GameContext.Provider>
    );
}