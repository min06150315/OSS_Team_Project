import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Game.css";

const CreateGame = () => {
    const navigate = useNavigate(); // 페이지 네비게이션을 위한 훅
    const createGameApi = "https://66ff38172b9aac9c997e8ee3.mockapi.io/api/games"; // 게임 생성 API URL
    const [error, setError] = useState(null); // 에러 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [game, setGame] = useState({ // 게임 정보를 담는 상태
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

    // 입력값을 상태로 업데이트하는 함수
    const handelInput = (event) => {
        const { name, value } = event.target; // 이벤트 타겟에서 name과 value 추출
        setGame({ ...game, [name]: value }); // 기존 상태를 유지하며 입력값 업데이트
    }

    // 폼 제출을 처리하는 함수
    const handelSubmit = async (event) => {
        event.preventDefault(); // 폼 제출의 기본 동작 방지
        console.log(game) // 현재 게임 정보 콘솔에 출력
        try {
            setIsLoading(true); // 로딩 시작
            const response = await fetch(createGameApi, {
                method: 'POST', // POST 요청
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(game), // 게임 정보를 JSON 문자열로 변환
            });

            if (response.ok) {
                console.log('Form submitted successfully!'); // 제출 성공 로그
                // 입력 필드 초기화
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
                navigate('/');  // 메인 페이지로 이동
            } else {
                console.error('Form submission failed!'); // 제출 실패 로그
            }

        } catch (error) {
            setError(error.message); // 에러 메시지 업데이트
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    }

    return (
        <div className="game-form">
            <div className="heading">
                {isLoading && <Loader/> } {/* 로딩 중일 때 Loader 컴포넌트 표시 */}
                {error && <p>Error: {error}</p>} {/* 에러가 있을 경우 에러 메시지 표시 */}
                <p>Create New Game</p> {/* 제목 표시 */}
            </div>
            <form onSubmit={handelSubmit}> {/* 폼 제출 이벤트 처리 */}
                <div className="mb-3">
                    <label htmlFor="gameName" className="form-label">게임 이름</label>
                    <input type="text" className="form-control" id="gameName" name="gameName" value={game.gameName} onChange={handelInput} required/> {/* 게임 이름 입력 필드 */}
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="genre" className="form-label">장르</label>
                    <input type="text" className="form-control" id="genre" name="genre" value={game.genre} onChange={handelInput} /> {/* 장르 입력 필드 */}
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="developer" className="form-label">제작사</label>
                    <input type="text" className="form-control" id="developer" name="developer" value={game.developer} onChange={handelInput} /> {/* 제작사 입력 필드 */}
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="releaseYear" className="form-label">출시년도</label>
                    <input type="number" className="form-control" id="releaseYear" name="releaseYear" value={game.releaseYear} onChange={handelInput} /> {/* 출시년도 입력 필드 */}
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="platform" className="form-label">플랫폼</label>
                    <input type="text" className="form-control" id="platform" name="platform" value={game.platform} onChange={handelInput} /> {/* 플랫폼 입력 필드 */}
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="rating" className="form-label">평점</label>
                    <input type="number" className="form-control" id="rating" name="rating" value={game.rating} onChange={handelInput} /> {/* 평점 입력 필드 */}
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="price" className="form-label">가격</label>
                    <input type="number" className="form-control" id="price" name="price" value={game.price} onChange={handelInput} /> {/* 가격 입력 필드 */}
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="description" className="form-label">설명</label>
                    <input type="text" className="form-control" id="description" name="description" value={game.description} onChange={handelInput} /> {/* 설명 입력 필드 */}
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="gameModes" className="form-label">게임 모드</label>
                    <input type="text" className="form-control" id="gameModes" name="gameModes" value={game.gameModes} onChange={handelInput} /> {/* 게임 모드 입력 필드 */}
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="supportedLanguages" className="form-label">지원 언어</label>
                    <input type="text" className="form-control" id="supportedLanguages" name="supportedLanguages" value={game.supportedLanguages} onChange={handelInput} /> {/* 지원 언어 입력 필드 */}
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="ageRating" className="form-label">연령 등급</label>
                    <select className="form-control" id="ageRating" name="ageRating" value={game.ageRating} onChange={handelInput}>
                        <option value="" disabled selected>등급을 선택하세요</option> {/* 등급 선택을 위한 placeholder */}
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
                    <input type="text" className="form-control" id="downloadSize" name="downloadSize" value={game.downloadSize} onChange={handelInput} /> {/* 다운로드 크기 입력 필드 */}
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="systemRequirements" className="form-label">시스템 요구 사항</label>
                    <input type="text" className="form-control" id="systemRequirements" name="systemRequirements" value={game.systemRequirements} onChange={handelInput} /> {/* 시스템 요구 사항 입력 필드 */}
                </div>
                <div className="mb-3">
                    <label htmlFor="hasDLC" className="form-label">DLC 여부</label>
                    <select className="form-control" id="hasDLC" name="hasDLC" value={game.hasDLC} onChange={handelInput}>
                        <option value="" disabled selected>DLC 여부를 선택하세요</option> {/* DLC 여부 선택을 위한 placeholder */}
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-5"> {/* 제출 버튼 */}
                    CREATE
                </button>
            </form>
        </div>
    );
};

export default CreateGame;