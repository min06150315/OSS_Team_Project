import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Game.css";

const EditGame = () => {
    const [game, setGame] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const getGameApi = "https://66ff38172b9aac9c997e8ee3.mockapi.io/api/games";

    const getGame = useCallback(() => {
        axios
            .get(`${getGameApi}/${id}`)
            .then((item) => {
                setGame(item.data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    }, [id]);

    useEffect(() => {
        getGame();
    }, [getGame]);

    const handelInput = (e) => {
        const { name, value } = e.target;
        setGame({ ...game, [name]: value});
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        fetch(`${getGameApi}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(game),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(() => {
                navigate("/"); // main 페이지로 이동
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="game-form">
            <div className="heading">
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <p>Edit Game Information</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="gameName" className="form-label">
                        게임 이름
                    </label>
                    <input
                     type="text"
                     className="form-control"
                     id="gameName"
                     name="gameName"
                     value={game.gameName || ''}
                     onChange={handelInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="genre" className="form-label">
                        장르
                    </label>
                    <input
                     type="text"
                     className="form-control"
                     id="genre"
                     name="genre"
                     value={game.genre || ''}
                     onChange={handelInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="developer" className="form-label">
                        제작사
                    </label>
                    <input
                     type="text"
                     className="form-control"
                     id="developer"
                     name="developer"
                     value={game.developer || ''}
                     onChange={handelInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="releaseYear" className="form-label">
                        출시 년도
                    </label>
                    <input
                     type="text"
                     className="form-control"
                     id="releaseYear"
                     name="releaseYear"
                     value={game.releaseYear || ''}
                     onChange={handelInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="platform" className="form-label">
                        플랫폼
                    </label>
                    <input
                     type="text"
                     className="form-control"
                     id="platform"
                     name="platform"
                     value={game.platform || ''}
                     onChange={handelInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="rating" className="form-label">
                        평점
                    </label>
                    <input
                     type="text"
                     className="form-control"
                     id="rating"
                     name="rating"
                     value={game.rating || ''}
                     onChange={handelInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="price" className="form-label">
                        가격
                    </label>
                    <input
                     type="text"
                     className="form-control"
                     id="price"
                     name="price"
                     value={game.price || ''}
                     onChange={handelInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="description" className="form-label">
                        설명
                    </label>
                    <input
                     type="text"
                     className="form-control"
                     id="description"
                     name="description"
                     value={game.description || ''}
                     onChange={handelInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="gameModes" className="form-label">
                        게임 모드
                    </label>
                    <input
                     type="text"
                     className="form-control"
                     id="gameModes"
                     name="gameModes"
                     value={game.gameModes || ''}
                     onChange={handelInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="supportedLanguages" className="form-label">
                        지원 언어
                    </label>
                    <input
                     type="text"
                     className="form-control"
                     id="supportedLanguages"
                     name="supportedLanguages"
                     value={game.supportedLanguages || ''}
                     onChange={handelInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="ageRating" className="form-label">
                        연령 등급
                    </label>
                    <input
                     type="text"
                     className="form-control"
                     id="ageRating"
                     name="ageRating"
                     value={game.ageRating || ''}
                     onChange={handelInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="downloadSize" className="form-label">
                        다운로드 크기
                    </label>
                    <input
                     type="text"
                     className="form-control"
                     id="downloadSize"
                     name="downloadSize"
                     value={game.downloadSize || ''}
                     onChange={handelInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="systemRequirements" className="form-label">
                        시스템 요구 사항
                    </label>
                    <input
                     type="text"
                     className="form-control"
                     id="systemRequirements"
                     name="systemRequirements"
                     value={game.systemRequirements || ''}
                     onChange={handelInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="hasDLC" className="form-label">
                        DLC 여부
                    </label>
                    <input
                     type="text"
                     className="form-control"
                     id="hasDLC"
                     name="hasDLC"
                     value={game.hasDLC || ''}
                     onChange={handelInput}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    UPDATE
                </button>
            </form>
        </div>
    );
};

export default EditGame;