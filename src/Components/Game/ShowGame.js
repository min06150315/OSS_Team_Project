import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader"
import "./ShowGame.css";

const ShowGame = () => {
    const showGameApi = "http://localhost:3000/api/games";
    const [game, setGame] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handelDelete = async (id) => {
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
        return <h1>no game found</h1>;
    } else {
        return (
            <div className="mt-5">
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>게임 이름</th>
                            <th>장르</th>
                            <th>제작사</th>
                            <th>출시년도</th>
                            <th>플랫폼</th>
                            <th>가격</th>
                            <th>연령등급</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {game?.map((item, i) => {
                            return (
                                <tr key={i + 1}>
                                    <td>{item.gameName}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.developer}</td>
                                    <td>{item.releaseYear}</td>
                                    <td>{item.platform}</td>
                                    <td>{item.price}</td>
                                    <td>{item.ageRating}</td>
                                    <td className="actions">
                                        <Link to={`/edit-game/${item.id}`}>
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </Link>
                                        <Link to={`/game/${item.id}`}>
                                            <i className="fa fa-gamepad" aria-hidden="true"></i>
                                        </Link>
                                        <i
                                            className="fa fa-trash"
                                            aria-hidden="true"
                                            onClick={() => handelDelete(item.id)}
                                        ></i>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default ShowGame;