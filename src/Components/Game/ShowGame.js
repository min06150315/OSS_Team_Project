import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import "./ShowGame.css";

const ShowGame = () => {
    const showGameApi = "https://66ff38172b9aac9c997e8ee3.mockapi.io/api/games";
    const [game, setGame] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
        console.log("id : -", id);
        setIsLoading(true);
        try {
            const response = await fetch(showGameApi.concat("/") + id, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete item");
            }
            setGame(game.filter((game) => game.id !== id));
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getGames();
    }, []);

    const getGames = () => {
        axios
            .get(showGameApi)
            .then((res) => {
                setGame(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (game.length < 0) {
        return <h1>No game found</h1>;
    } else {
        return (
            <div className="game-container">
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <div className="game-card-list">
                    {game?.map((item, i) => (
                        <div className="game-card" key={i}>
                            <h2>{item.gameName}</h2>
                            <p>Genre: {item.genre}</p>
                            <p>Developer: {item.developer}</p>
                            <p>Release Year: {item.releaseYear}</p>
                            <p>Platform: {item.platform}</p>
                            <p>Price: ${item.price}</p>
                            <p>Age Rating: {item.ageRating}</p>
                            <div className="actions">
                                <Link to={`/edit-game/${item.id}`}>
                                    <i className="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                                </Link>
                                <Link to={`/game/${item.id}`}>
                                    <i className="fa-solid fa-circle-info"></i>
                                </Link>
                                <Link>
                                    <i
                                        className="fa-solid fa-trash"
                                        aria-hidden="true"
                                        onClick={() => handleDelete(item.id)}
                                    ></i>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default ShowGame;
