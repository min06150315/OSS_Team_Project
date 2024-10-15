import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Game.css";

const CreateGame = () => {
    const navigate = useNavigate();
    const createGameApi = "https://66ff38172b9aac9c997e8ee3.mockapi.io/api/games";
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [game, setGame] = useState({
        gameName: "",
        genre: "",
        developer: "",
        releaseYear: "",
        platform: "",
        rating: "",
        price: "",
        description: "",
        gameModes: "",
        supportedLanguages: "",
        ageRating: "",
        downloadSize: "",
        systemRequirements: "",
        hasDLC: ""
    });

    const handelInput = (event) => {
        const { name, value } = event.target;
        setGame({ ...game, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(game)
        try {
            setIsLoading(true);
            const response = await fetch(createGameApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(game),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setGame({ 
                    gameName: "",
                    genre: "",
                    developer: "",
                    releaseYear: "",
                    platform: "",
                    rating: "",
                    price: "",
                    description: "",
                    gameModes: "",
                    supportedLanguages: "",
                    ageRating: "",
                    downloadSize: "",
                    systemRequirements: "",
                    hasDLC: ""
                });
                navigate('/');  // main 페이지로 이동
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="game-form">
            <div className="heading">
                {isLoading && <Loader/> }
                {error && <p>Error: {error}</p>}
                <p>Create New Game</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="gameName" className="form-label">게임 이름</label>
                    <input type="text" className="form-control" id="gameName" name="gameName" value={game.gameName} onChange={handelInput} required/>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="genre" className="form-label">장르</label>
                    <input type="text" className="form-control" id="genre" name="genre" value={game.genre} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="developer" className="form-label">제작사</label>
                    <input type="text" className="form-control" id="developer" name="developer" value={game.developer} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="releaseYear" className="form-label">출시년도</label>
                    <input type="number" className="form-control" id="releaseYear" name="releaseYear" value={game.releaseYear} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="platform" className="form-label">플랫폼</label>
                    <input type="text" className="form-control" id="platform" name="platform" value={game.platform} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="rating" className="form-label">평점</label>
                    <input type="number" className="form-control" id="rating" name="rating" value={game.rating} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="price" className="form-label">가격</label>
                    <input type="number" className="form-control" id="price" name="price" value={game.price} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="description" className="form-label">설명</label>
                    <input type="text" className="form-control" id="description" name="description" value={game.description} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="gameModes" className="form-label">게임 모드</label>
                    <input type="text" className="form-control" id="gameModes" name="gameModes" value={game.gameModes} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="supportedLanguages" className="form-label">지원 언어</label>
                    <input type="text" className="form-control" id="supportedLanguages" name="supportedLanguages" value={game.supportedLanguages} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                <label htmlFor="ageRating" className="form-label">연령 등급</label>
                <select className="form-control" id="ageRating" name="ageRating" value={game.ageRating} onChange={handelInput}>
                    <option value="" disabled selected>등급을 선택하세요</option> {/* placeholder 역할을 사용하기 위해서 disabled selected를 사용하여 기능 구현 */}
                    <option value="EC">EC (Early Childhood)</option>
                    <option value="E">E (Everyone)</option>
                    <option value="E10+">E10+ (Everyone 10+)</option>
                    <option value="T">T (Teen)</option>
                    <option value="M">M (Mature 17+)</option>
                    <option value="AO">AO (Adults Only 18+)</option>
                </select>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="downloadSize" className="form-label">다운로드 크기</label>
                    <input type="text" className="form-control" id="downloadSize" name="downloadSize" value={game.downloadSize} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="systemRequirements" className="form-label">시스템 요구 사항</label>
                    <input type="text" className="form-control" id="systemRequirements" name="systemRequirements" value={game.systemRequirements} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="hasDLC" className="form-label">DLC 여부</label>
                    <select className="form-control" id="hasDLC" name="hasDLC" value={game.hasDLC} onChange={handelInput}>
                        <option value="" disabled selected>DLC 여부를 선택하세요</option> {/* placeholder 역할을 사용하기 위해서 disabled selected를 사용하여 기능 구현 */}
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-5">
                    CREATE
                </button>
            </form>
        </div>
    );
};

export default CreateGame;