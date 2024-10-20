import React, { useEffect, useState } from "react";
import "./Game.css";

const ViewTable = () => {
    const viewTableApi = "https://66ff38172b9aac9c997e8ee3.mockapi.io/api/games"; // API 주소
    const [games, setGames] = useState([]); // 상태 변수 선언

    // 데이터 불러오는 비동기 함수
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(viewTableApi); // API 호출
                const data = await response.json(); // JSON 파싱
                setGames(data); // 불러온 데이터 설정
            } catch (error) {
                console.error("Error fetching data:", error); // 에러 처리
            }
        };

        fetchData(); // 데이터 호출
    }, []); // 의존성 배열이 비어 있으므로 한 번만 실행

    return (
        <div className="heading">
            <h3>Game Information</h3>
            <table className="table-view-info">
                <thead>
                    <tr>
                        <th>게임이름</th>
                        <th>장르</th>
                        <th>제작사</th>
                        <th>출시연도</th>
                        <th>플랫폼</th>
                        <th>평점</th>
                        <th>가격</th>
                        <th>설명</th>
                        <th>게임모드</th>
                        <th>지원언어</th>
                        <th>연령등급</th>
                        <th>다운로드 크기</th>
                        <th>시스템 요구 사항</th>
                        <th>DLC 여부</th>
                    </tr>
                </thead>
                <tbody>
                    {games.length > 0 ? (
                        games.map((game) => (
                            <tr key={game.id}>
                                <td>{game.gameName}</td>
                                <td>{game.genre}</td>
                                <td>{game.developer}</td>
                                <td>{game.releaseYear}</td>
                                <td>{Array.isArray(game.platform) ? game.platform.join(", ") : game.platform}</td>
                                <td>{game.rating}</td>
                                <td>${game.price}</td>
                                <td>{game.description}</td>
                                <td>{Array.isArray(game.gameModes) ? game.gameModes.join(", ") : game.gameModes}</td>
                                <td>{Array.isArray(game.supportedLanguages) ? game.supportedLanguages.join(", ") : game.supportedLanguages}</td>
                                <td>{game.ageRating}</td>
                                <td>{game.downloadSize}</td>
                                <td>{game.systemRequirements}</td>
                                <td>{game.hasDLC ? "Yes" : "No"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="14">{games.length === 0 ? "No games found" : "Loading..."}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewTable;
