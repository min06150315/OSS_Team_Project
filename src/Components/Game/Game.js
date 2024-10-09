import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./Game.css";

const Game = () => {
    const [game, setGame] = useState({});
    const { id } = useParams();
    const getGameApi = "https://66ff38172b9aac9c997e8ee3.mockapi.io/api/games";
  
    const getGame = useCallback(() => {
      axios
        .get(`${getGameApi}/${id}`)
        .then((item) => {
          setGame(item.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [id]);
  
    useEffect(() => {
      getGame();
    }, [getGame]);

    return (
        <div className="game mt-5">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>오픈소스 스튜디오</th>
                        <th>웹 서비스 개발</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>게임 이름</td>
                        <td>{game.gameName}</td>
                    </tr>
                    <tr>
                        <td>장르</td>
                        <td>{game.genre}</td>
                    </tr>
                    <tr>
                        <td>제작사</td>
                        <td>{game.developer}</td>
                    </tr>
                    <tr>
                        <td>출시 년도</td>
                        <td>{game.releaseYear}</td>
                    </tr>
                    <tr>
                        <td>플랫폼</td>
                        <td>{game.platform}</td>
                    </tr>
                    <tr>
                        <td>평점</td>
                        <td>{game.rating}</td>
                    </tr>
                    <tr>
                        <td>가격</td>
                        <td>{game.price}</td>
                    </tr>
                    <tr>
                        <td>설명</td>
                        <td>{game.description}</td>
                    </tr>
                    <tr>
                        <td>게임 모드</td>
                        <td>{game.gameModes}</td>
                    </tr>
                    <tr>
                        <td>지원 언어</td>
                        <td>{game.supportedLanguages}</td>
                    </tr>
                    <tr>
                        <td>연령 등급</td>
                        <td>{game.ageRating}</td>
                    </tr>
                    <tr>
                        <td>다운로드 크기</td>
                        <td>{game.downloadSize}</td>
                    </tr>
                    <tr>
                        <td>시스템 요구 사항</td>
                        <td>{game.systemRequirements}</td>
                    </tr>
                    <tr>
                        <td>DLC 여부</td>
                        <td>{game.hasDLC}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default Game;