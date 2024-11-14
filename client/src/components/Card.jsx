import React, { useEffect, useRef, useState, useContext } from "react";
import "./Card.css"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import GameContext from "./GameContext";

export default function Card({ id, title, description, price, onHand }) {

    const emptyForm = {
        id: id, 
        title: "",
        description: "",
        price: "",
        onHand: ""
    }

    const [formData, setFormData] = useState(emptyForm);
    const [isPopOverOpen, setIsPopOverOpen] = useState(false);
    const gameData = useContext(GameContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleEdit = async () => {    
        setIsPopOverOpen(true);
    }

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: id}),
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormData(prevState => ({...prevState, id: id}));
      
        try {
            const response = await fetch('http://localhost:3001/api/update', {
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

        setIsPopOverOpen(false);
    }

    return (
        <li key={id}>
            <div className="card">
                <p>{title}</p>
                <p>{description}</p>
                <p>{price}</p>
                <p>{onHand}</p>
            </div>
            <div className="buttons">
                <Popover open={isPopOverOpen}>
                    <PopoverTrigger className="w-24 h-12 mt-8" onClick={handleEdit}>Edit</PopoverTrigger>
                    <PopoverContent>
                        <form method='POST' className="flex flex-col" onSubmit={handleSubmit}>
                            <label htmlFor='title'>Title</label>
                            <input name='title' type='text' onChange={handleChange} value={formData.title}></input>
                            <label htmlFor='description'>Description</label>
                            <input name='description' type='text' onChange={handleChange} value={formData.description}></input>
                            <label htmlFor='price'>Price</label>
                            <input name='price' type='text' onChange={handleChange} value={formData.price}></input>
                            <label htmlFor='onHand'>On Hand</label>
                            <input name='onHand' type='text' onChange={handleChange} value={formData.onHand}></input>
                            <button type='submit'>Submit</button>
                        </form>
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger className="w-24 h-12 mt-8 mx-8">Delete</PopoverTrigger>
                    <PopoverContent>
                        <p className="mb-4">Are you sure you want to delete {title}?</p>
                        <button type="button" className="bg-rose-500" onClick={handleDelete}>Delete</button>
                    </PopoverContent>
                </Popover>
            </div>
        </li>
    );
}