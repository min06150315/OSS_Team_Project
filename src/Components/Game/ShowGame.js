import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import "./ShowGame.css";

const API_KEY = '6745f210f63247ea92fb562f8dea3ed6';
const BASE_URL = 'https://api.rawg.io/api';

const ShowGame = ({ searchTerm }) => {
    const showGameApi = "https://66ff38172b9aac9c997e8ee3.mockapi.io/api/games"; // mockAPI
    const [game, setGame] = useState([]); // 게임 데이터를 저장하는 상태
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filteredGames, setFilteredGames] = useState([]); // 필터링된 게임 리스트 상태

    const handleDelete = async (id) => {
        console.log("Deleting game with ID:", id);
        setIsLoading(true);
        try {
            const response = await fetch(`${showGameApi}/${id}`, {
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

    useEffect(() => {
        setFilteredGames(game); // 처음에는 모든 게임을 필터링 리스트에 설정
    }, [game]);

    useEffect(() => {
        const filtered = game.filter((g) =>
            g.gameName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredGames(filtered); // 검색어에 따라 필터링된 게임 리스트 업데이트
    }, [searchTerm, game]);

    const getGames = async () => {
        setIsLoading(true); // 데이터를 가져오는 동안 로딩 상태로 설정
        try {
            const res = await axios.get(showGameApi);
            const gamesData = res.data;

            // 게임 이미지 데이터를 RAWG API에서 가져오기
            const gameDataWithImages = await Promise.all(
                gamesData.map(async (game) => {
                    const response = await axios.get(`${BASE_URL}/games`, {
                        params: {
                            key: API_KEY,
                            search: game.gameName,
                        },
                    });
                    const rawgGame = response.data.results[0]; // 첫 번째 검색 결과 가져오기
                    return {
                        ...game,
                        image: rawgGame?.background_image || '', // 이미지 추가
                    };
                })
            );
            setGame(gameDataWithImages);
        } catch (error) {
            console.log(error);
            setError("Failed to fetch games.");
        } finally {
            setIsLoading(false); // 데이터 로드가 완료되면 로딩 상태를 해제
        }
    };

    if (isLoading) {
        return <Loader />; // 로딩 중일 때 Loader 컴포넌트를 렌더링
    }

    if (filteredGames.length === 0 && !isLoading) {
        return <h1>No game found</h1>;
    }

    return (
        <div className="game-container mb-3 mt-3">
            {error && <p>Error: {error}</p>}
            <div className="game-card-list">
                {filteredGames?.map((item, i) => (
                    <div className="game-card" key={i}>
                        {item.image && (
                            <img src={item.image} alt={item.gameName} className="game-image" />
                        )}
                        <h2>{item.gameName}</h2>
                        <div className="actions">
                            <Link to={`/edit-game/${item.id}`}>
                                <i className="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                            </Link>
                            <Link to={`/game/${item.id}`}>
                                <i className="fa-solid fa-circle-info"></i>
                            </Link>
                            <i
                                className="fa-solid fa-trash"
                                aria-hidden="true"
                                onClick={() => handleDelete(item.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowGame;
