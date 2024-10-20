import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Game.css";

const EditGame = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const getGameApi = "https://66ff38172b9aac9c997e8ee3.mockapi.io/api/games";

  // 게임 정보 가져오기
  const getGame = useCallback(() => {
    axios
      .get(`${getGameApi}/${id}`)
      .then((item) => {
        const gameData = item.data;
        Object.keys(gameData).forEach((key) => {
          setValue(key, gameData[key]); // React Hook Form의 setValue로 초기값 설정
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, [id, setValue]);

  useEffect(() => {
    getGame();
  }, [getGame]);

  // 폼 제출 처리
  const onSubmit = (data) => {
    setIsLoading(true);

    axios
      .put(`${getGameApi}/${id}`, data)
      .then(() => {
        navigate("/");
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="gameName" className="form-label">
              게임 이름
            </label>
            <input
              type="text"
              className="form-control"
              id="gameName"
              {...register("gameName")}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="genre" className="form-label">
              장르
            </label>
            <input
              type="text"
              className="form-control"
              id="genre"
              {...register("genre")}
            />
          </div>
          <div className="col">
            <label htmlFor="developer" className="form-label">
              제작사
            </label>
            <input
              type="text"
              className="form-control"
              id="developer"
              {...register("developer")}
            />
          </div>
          <div className="col">
            <label htmlFor="releaseYear" className="form-label">
              출시 년도
            </label>
            <input
              type="number"
              className="form-control"
              id="releaseYear"
              {...register("releaseYear")}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="platform" className="form-label">
              플랫폼
            </label>
            <input
              type="text"
              className="form-control"
              id="platform"
              {...register("platform")}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="rating" className="form-label">
              평점(0~10)
            </label>
            <input
              type="number"
              step="0.1"
              className="form-control"
              id="rating"
              {...register("rating")}
            />
          </div>
          <div className="col">
            <label htmlFor="price" className="form-label">
              가격
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="price"
              {...register("price")}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            설명
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gameModes" className="form-label">
            게임 모드
          </label>
          <input
            type="text"
            className="form-control"
            id="gameModes"
            {...register("gameModes")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="supportedLanguages" className="form-label">
            지원 언어
          </label>
          <input
            type="text"
            className="form-control"
            id="supportedLanguages"
            {...register("supportedLanguages")}
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="ageRating" className="form-label">
              연령 등급
            </label>
            <select
              className="form-control"
              id="ageRating"
              {...register("ageRating")}
            >
              <option value="">등급을 선택하세요</option>
              <option value="EC">EC (Early Childhood)</option>
              <option value="E">E (Everyone)</option>
              <option value="E10+">E10+ (Everyone 10+)</option>
              <option value="T">T (Teen)</option>
              <option value="M">M (Mature 17+)</option>
              <option value="AO">AO (Adults Only 18+)</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="hasDLC" className="form-label">
              DLC 여부
            </label>
            <select
              className="form-control"
              id="hasDLC"
              {...register("hasDLC")}
            >
              <option value="">DLC 여부를 선택하세요</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="downloadSize" className="form-label">
            다운로드 크기
          </label>
          <input
            type="text"
            className="form-control"
            id="downloadSize"
            {...register("downloadSize")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="systemRequirements" className="form-label">
            시스템 요구 사항
          </label>
          <input
            type="text"
            className="form-control"
            id="systemRequirements"
            {...register("systemRequirements")}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          EDIT
        </button>
      </form>
    </div>
  );
};

export default EditGame; 
