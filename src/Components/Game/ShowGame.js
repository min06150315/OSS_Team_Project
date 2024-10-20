import React, { useEffect, useState } from "react"; // React의 useEffect와 useState Hook 가져오기
import axios from "axios"; // Axios를 이용해 API 요청을 처리
import { Link } from "react-router-dom"; // 게임 수정 및 상세보기 링크를 위해 React Router의 Link 사용
import Loader from "../Common/Loader"; // 로딩 상태에서 사용할 Loader 컴포넌트 가져오기
import "./ShowGame.css";

const API_KEY = 'eb0fc6b70d9c4a3a926b7b7151c63b98'; // RAWG API 키
const BASE_URL = 'https://api.rawg.io/api'; // RAWG API의 기본 URL

const ShowGame = ({ searchTerm }) => {
    const showGameApi = "https://66ff38172b9aac9c997e8ee3.mockapi.io/api/games"; // 게임 데이터를 가져올 mockAPI URL
    const [game, setGame] = useState([]); // 게임 데이터를 저장하는 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
    const [error, setError] = useState(null); // 오류 상태 관리
    const [filteredGames, setFilteredGames] = useState([]); // 필터링된 게임 리스트 상태

    // 게임 삭제 함수
    const handleDelete = async (id) => {
        console.log("Deleting game with ID:", id); // 삭제할 게임의 ID 출력
        setIsLoading(true); // 삭제 중 로딩 상태로 전환
        try {
            const response = await fetch(`${showGameApi}/${id}`, {
                method: "DELETE", // DELETE 메소드로 삭제 요청
            });
            if (!response.ok) {
                throw new Error("Failed to delete item"); // 삭제 실패 시 오류 발생
            }
            setGame(game.filter((game) => game.id !== id)); // 삭제된 게임을 리스트에서 제거
        } catch (error) {
            setError(error.message); // 오류 발생 시 에러 상태 업데이트
        } finally {
            setIsLoading(false); // 삭제 작업이 끝나면 로딩 상태 해제
        }
    };

    // 페이지 로드 시 게임 데이터를 가져옴
    useEffect(() => {
        getGames();
    }, []);

    // 게임 데이터를 가져왔을 때 필터링 리스트도 업데이트
    useEffect(() => {
        setFilteredGames(game); // 처음에는 모든 게임을 필터링된 리스트에 설정
    }, [game]);

    // 검색어가 변경될 때마다 필터링
    useEffect(() => {
        const filtered = game.filter((g) =>
            g.gameName.toLowerCase().includes(searchTerm.toLowerCase()) // 검색어에 따라 게임 이름 필터링
        );
        setFilteredGames(filtered); // 필터링된 게임 리스트 업데이트
    }, [searchTerm, game]);

    // 게임 데이터를 mockAPI에서 가져오는 함수
    const getGames = async () => {
        setIsLoading(true); // 데이터를 가져오는 동안 로딩 상태로 전환
        try {
            const res = await axios.get(showGameApi); // API 호출
            const gamesData = res.data; // 가져온 데이터 저장
            // RAWG API에서 각 게임의 이미지 데이터를 가져옴
            const gameDataWithImages = await Promise.all(
                gamesData.map(async (game) => {
                    const response = await axios.get(`${BASE_URL}/games`, {
                        params: {
                            key: API_KEY, // API 키를 사용하여 RAWG API에서 검색
                            search: game.gameName, // 게임 이름으로 검색
                        },
                    });
                    const rawgGame = response.data.results[0]; // 검색 결과 중 첫 번째 게임 정보
                    return {
                        ...game,
                        image: rawgGame?.background_image || '', // 게임 이미지 추가 (없으면 빈 값)
                    };
                })
            );
            setGame(gameDataWithImages); // 이미지가 추가된 게임 데이터를 상태에 저장
        } catch (error) {
            console.log(error); // 오류 발생 시 에러 메시지 설정
        } finally {
            setIsLoading(false); // 데이터 로드가 완료되면 로딩 상태 해제
        }
    };

    // 로딩 중일 때 Loader 컴포넌트를 표시
    if (isLoading) {
        return <Loader />;
    }

    // 검색 결과가 없을 때 메시지 표시
    if (filteredGames.length === 0 && !isLoading) {
        return <h1>No game found</h1>;
    }

    // 게임 리스트를 화면에 렌더링
    return (
        <div className="game-container mb-3 mt-3">
            {error && <p>Error: {error}</p>} {/* 오류 메시지 표시 */}
            <div className="game-card-list">
                {filteredGames?.map((item, i) => (
                    <div className="game-card" key={i}>
                        {item.image && (
                            <img src={item.image} alt={item.gameName} className="game-image" />
                        )} {/* 게임 이미지 표시 */}
                        <h2>{item.gameName}</h2>{/* 게임 이름 표시 */}
                        <div className="actions">
                            <Link to={`/edit-game/${item.id}`}>
                                <i className="fa-solid fa-pen-to-square" aria-hidden="true"></i>{/* 수정 아이콘 */}
                            </Link>
                            <Link to={`/view-game/${item.id}`}>
                                <i className="fa-solid fa-circle-info"></i>{/* 상세보기 아이콘 */}
                            </Link>
                            <i
                                className="fa-solid fa-trash"
                                aria-hidden="true"
                                onClick={() => handleDelete(item.id)} // 삭제 버튼 클릭 시 삭제 함수 호출
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowGame;