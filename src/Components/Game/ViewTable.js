import React, { useEffect, useState } from "react"; // React에서 useEffect와 useState Hook 가져오기
import "./Game.css";

const ViewTable = () => {
    const viewTableApi = "https://66ff38172b9aac9c997e8ee3.mockapi.io/api/games"; // 게임 데이터를 가져올 API 주소
    const [games, setGames] = useState([]); // 게임 데이터를 저장할 상태 선언, 초기값은 빈 배열

    // 컴포넌트가 마운트될 때 데이터 불러오기
    useEffect(() => {
        // API에서 데이터를 가져오는 비동기 함수
        const fetchData = async () => {
            try {
                const response = await fetch(viewTableApi); // fetch를 이용해 API에서 데이터 요청
                const data = await response.json(); // 응답을 JSON 형태로 파싱
                setGames(data); // 불러온 데이터를 games 상태로 설정
            } catch (error) {
                console.error("Error fetching data:", error); // 에러가 발생하면 콘솔에 출력
            }
        };

        fetchData(); // 데이터를 가져오는 함수 호출
    }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 처음 렌더링될 때 한 번만 실행

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
                    {games.length > 0 ? ( // games 배열에 데이터가 있으면
                        games.map((game) => (
                            <tr key={game.id}> {/* 각 게임의 id를 key로 설정하여 반복 렌더링 */}
                                <td>{game.gameName}</td> {/* 게임 이름 출력 */}
                                <td>{game.genre}</td> {/* 장르 출력 */}
                                <td>{game.developer}</td> {/* 제작사 출력 */}
                                <td>{game.releaseYear}</td> {/* 출시년도 출력 */}
                                <td>{Array.isArray(game.platform) ? game.platform.join(", ") : game.platform}</td> {/* 플랫폼이 배열이면 쉼표로 연결 */}
                                <td>{game.rating}</td> {/* 평점 출력 */}
                                <td>${game.price}</td> {/* 가격 출력 */}
                                <td>{game.description}</td> {/* 설명 출력 */}
                                <td>{Array.isArray(game.gameModes) ? game.gameModes.join(", ") : game.gameModes}</td> {/* 게임 모드가 배열이면 쉼표로 연결 */}
                                <td>{Array.isArray(game.supportedLanguages) ? game.supportedLanguages.join(", ") : game.supportedLanguages}</td> {/* 지원 언어가 배열이면 쉼표로 연결 */}
                                <td>{game.ageRating}</td> {/* 연령 등급 출력 */}
                                <td>{game.downloadSize}</td> {/* 다운로드 크기 출력 */}
                                <td>{game.systemRequirements}</td> {/* 시스템 요구 사항 출력 */}
                                <td>{game.hasDLC ? "Yes" : "No"}</td> {/* DLC 여부가 true면 "Yes", false면 "No" 출력 */}
                            </tr>
                        ))
                    ) : ( // 데이터가 없으면 로딩 메시지 출력
                        <tr>
                            <td colSpan="14">Loading...</td> {/* 데이터가 아직 로딩 중일 때 표시 */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewTable;