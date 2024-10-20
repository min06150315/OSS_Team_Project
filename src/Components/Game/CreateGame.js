import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Game.css";

const CreateGame = () => {
  const navigate = useNavigate();
  const createGameApi = "https://66ff38172b9aac9c997e8ee3.mockapi.io/api/games";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      const response = await fetch(createGameApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        reset();
        navigate("/show-game");
      } else {
        console.error("Form submission failed!");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="game-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Create New Game</p>
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
              {...register("gameName", { required: true })}
            />
            {errors.gameName && (
              <p className="error-message">Game name is required</p>
            )}
          </div>
        </div>

        {/* Genre, Developer, and Release Year on one line */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="genre" className="form-label">
              장르
            </label>
            <input
              type="text"
              className="form-control"
              id="genre"
              {...register("genre", { required: true })}
            />
            {errors.genre && <p className="error-message">Genre is required</p>}
          </div>
          <div className="col">
            <label htmlFor="developer" className="form-label">
              제작사
            </label>
            <input
              type="text"
              className="form-control"
              id="developer"
              {...register("developer", { required: true })}
            />
            {errors.developer && (
              <p className="error-message">Developer is required</p>
            )}
          </div>
          <div className="col">
            <label htmlFor="releaseYear" className="form-label">
              출시년도
            </label>
            <input
              type="number"
              className="form-control"
              id="releaseYear"
              {...register("releaseYear", { required: true })}
            />
            {errors.releaseYear && (
              <p className="error-message">Release year is required</p>
            )}
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
              {...register("platform", { required: true })}
            />
            {errors.gameName && (
              <p className="error-message">Platform is required</p>
            )}
          </div>
        </div>

        {/* Rating and Price on one line */}
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
              {...register("rating", { required: true })}
            />
            {errors.rating && (
              <p className="error-message">Rating is required</p>
            )}
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
              {...register("price", { required: true })}
            />
            {errors.price && <p className="error-message">Price is required</p>}
          </div>
        </div>

        {/* Additional Fields */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            설명
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="error-message">Description is required</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="gameModes" className="form-label">
            게임 모드
          </label>
          <input
            type="text"
            className="form-control"
            id="gameModes"
            {...register("gameModes", { required: true })}
          />
          {errors.gameModes && (
            <p className="error-message">Game modes are required</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="supportedLanguages" className="form-label">
            지원 언어
          </label>
          <input
            type="text"
            className="form-control"
            id="supportedLanguages"
            {...register("supportedLanguages", { required: true })}
          />
          {errors.supportedLanguages && (
            <p className="error-message">Supported languages are required</p>
          )}
        </div>

        {/* Age Rating and DLC on one line */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="ageRating" className="form-label">
              연령 등급
            </label>
            <select
              className="form-control"
              id="ageRating"
              {...register("ageRating", { required: true })}
            >
              <option value="" disabled selected>
                등급을 선택하세요
              </option>
              <option value="EC">EC (Early Childhood)</option>
              <option value="E">E (Everyone)</option>
              <option value="E10+">E10+ (Everyone 10+)</option>
              <option value="T">T (Teen)</option>
              <option value="M">M (Mature 17+)</option>
              <option value="AO">AO (Adults Only 18+)</option>
            </select>
            {errors.ageRating && (
              <p className="error-message">Age rating is required</p>
            )}
          </div>
          <div className="col">
            <label htmlFor="hasDLC" className="form-label">
              DLC 여부
            </label>
            <select
              className="form-control"
              id="hasDLC"
              {...register("hasDLC", { required: true })}
            >
              <option value="" disabled selected>
                DLC 여부를 선택하세요
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.hasDLC && (
              <p className="error-message">DLC status is required</p>
            )}
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
            {...register("downloadSize", { required: true })}
          />
          {errors.downloadSize && (
            <p className="error-message">Download size is required</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="systemRequirements" className="form-label">
            시스템 요구 사항
          </label>
          <input
            type="text"
            className="form-control"
            id="systemRequirements"
            {...register("systemRequirements", { required: true })}
          />
          {errors.systemRequirements && (
            <p className="error-message">System requirements are required</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary submit-btn">
          CREATE
        </button>
      </form>
    </div>
  );
};

export default CreateGame;
