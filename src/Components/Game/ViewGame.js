import axios from "axios"; // HTTP 요청을 위한 axios 라이브러리
import React, { useEffect, useState, useCallback } from "react"; // React의 주요 Hook들
import { useParams } from "react-router-dom"; // URL 파라미터에서 값을 가져오기 위한 useParams
import "./Game.css";

const ViewGame = () => {
    const [game, setGame] = useState({}); // 게임 데이터를 저장하는 상태 선언, 초기값은 빈 객체
    const { id } = useParams(); // URL에서 id 파라미터를 가져옴
    const getGameApi = "https://66ff38172b9aac9c997e8ee3.mockapi.io/api/games"; // 게임 정보를 가져올 API 주소
  
    // 게임 데이터를 API에서 가져오는 함수
    const getGame = useCallback(() => {
        axios
            .get(`${getGameApi}/${id}`) // 게임 ID에 해당하는 데이터 요청
            .then((item) => {
                setGame(item.data); // 응답 데이터를 game 상태로 설정
            })
            .catch((err) => {
                console.log(err); // 에러가 발생하면 콘솔에 출력
            });
    }, [id]); // id가 변경될 때마다 이 함수가 새로 정의됨
  
    // 컴포넌트가 렌더링되거나 id가 변경될 때 getGame 함수 실행
    useEffect(() => {
        getGame(); // 게임 데이터를 가져옴
    }, [getGame]);

    return (
        <div className="game mt-5">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Data Field</th>
                        <th>Content</th>
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
                        <td>{game.platform && game.platform.join(', ')}</td> {/* 배열 데이터를 쉼표로 구분하여 출력 */}
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
                        <td>{game.supportedLanguages && game.supportedLanguages.join(', ')}</td> {/* 배열 데이터를 쉼표로 구분하여 출력 */}
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
                        <td>{game.hasDLC ? "Yes" : "No"}</td> {/* hasDLC가 boolean타입으로 출력이 안되서 String으로 변환해서 hasDLC가 true면 'Yes', false면 'No'로 출력 */}
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default ViewGame; // ViewGame 컴포넌트를 외부에서 사용할 수 있도록 export