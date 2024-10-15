import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Game.css";

const EditGame = () => {
    // 게임 정보와 상태 관리를 위한 state 초기화
    const [game, setGame] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    // URL 파라미터에서 게임 ID를 추출
    const { id } = useParams();
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 초기화
    
    // 게임 정보를 가져오기 위한 API URL
    const getGameApi = "https://66ff38172b9aac9c997e8ee3.mockapi.io/api/games";

    // 게임 정보를 가져오는 함수
    const getGame = useCallback(() => {
        axios
            .get(`${getGameApi}/${id}`) // 특정 ID에 대한 게임 정보 요청
            .then((item) => {
                setGame(item.data); // 가져온 게임 정보를 state에 저장
            })
            .catch((err) => {
                console.log(err); // 에러 로그 출력
                setError(err.message); // 에러 메시지 state에 저장
            });
    }, [id]);

    useEffect(() => {
        getGame(); // 컴포넌트가 마운트되면 게임 정보 가져오기
    }, [getGame]);

    // 입력 값 변화를 처리하는 함수
    const handelInput = (e) => {
        const { name, value } = e.target;
        setGame({ ...game, [name]: value }); // 입력된 값을 state에 업데이트
    };

    // 폼 제출 처리 함수
    const handelSubmit = (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
        setIsLoading(true); // 로딩 상태 설정

        fetch(`${getGameApi}/${id}`, {
            method: "PUT", // PUT 메소드를 사용하여 게임 정보 업데이트
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(game), // state에 저장된 게임 정보를 JSON 형태로 변환하여 전송
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); // 성공 시 JSON 데이터 반환
            })
            .then(() => {
                navigate("/"); // 업데이트 후 메인 페이지로 이동
            })
            .catch((error) => {
                setError(error.message); // 에러 발생 시 에러 메시지 state에 저장
            })
            .finally(() => {
                setIsLoading(false); // 로딩 상태 해제
            });
    };

    return (
        <div className="game-form">
            <div className="heading">
                {isLoading && <Loader />} {/* 로딩 중일 때 Loader 컴포넌트 표시 */}
                {error && <p>Error: {error}</p>} {/* 에러가 발생하면 에러 메시지 표시 */}
                <p>Edit Game Information</p>
            </div>
            <form onSubmit={handelSubmit}>
                {/* 게임 정보를 입력하기 위한 폼 필드들 */}
                <div className="mb-3">
                    <label htmlFor="gameName" className="form-label">
                        게임 이름
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="gameName"
                        name="gameName"
                        value={game.gameName || ''} // 기본값 설정
                        onChange={handelInput} // 입력값 변화 시 처리
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
                        value={game.genre || ''} // 기본값 설정
                        onChange={handelInput} // 입력값 변화 시 처리
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
                        value={game.developer || ''} // 기본값 설정
                        onChange={handelInput} // 입력값 변화 시 처리
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
                        value={game.releaseYear || ''} // 기본값 설정
                        onChange={handelInput} // 입력값 변화 시 처리
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
                        value={game.platform || ''} // 기본값 설정
                        onChange={handelInput} // 입력값 변화 시 처리
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
                        value={game.rating || ''} // 기본값 설정
                        onChange={handelInput} // 입력값 변화 시 처리
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
                        value={game.price || ''} // 기본값 설정
                        onChange={handelInput} // 입력값 변화 시 처리
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
                        value={game.description || ''} // 기본값 설정
                        onChange={handelInput} // 입력값 변화 시 처리
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
                        value={game.gameModes || ''} // 기본값 설정
                        onChange={handelInput} // 입력값 변화 시 처리
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
                        value={game.supportedLanguages || ''} // 기본값 설정
                        onChange={handelInput} // 입력값 변화 시 처리
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
                        value={game.ageRating || ''} // 기본값 설정
                        onChange={handelInput} // 입력값 변화 시 처리
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
                        value={game.downloadSize || ''} // 기본값 설정
                        onChange={handelInput} // 입력값 변화 시 처리
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
                        value={game.systemRequirements || ''} // 기본값 설정
                        onChange={handelInput} // 입력값 변화 시 처리
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="hasDLC" className="form-label">
                        DLC 여부
                    </label>
                    <select className="form-control" id="hasDLC" name="hasDLC" value={game.hasDLC || ''} onChange={handelInput}>
                        <option value="">DLC 여부 선택</option>
                        <option value="true">예</option>
                        <option value="false">아니오</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    수정하기
                </button>
            </form>
        </div>
    );
};

export default EditGame;