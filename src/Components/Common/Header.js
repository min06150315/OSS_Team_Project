import React from "react";
import { Link } from "react-router-dom";
import "./Common.css";

export default function Header() {
    return (
        <div className="header">
            <nav className="navbar navbar-expand-sm"> {/* 576px(sm) 이상에서 nav바 펼쳐지고 그보다 작으면 하면에서 숨겨짐*/}
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" href="#"> {/* 이름을 클릭했을 때 홈으로 이동하게 설정한 링크*/}
                        <span className="navbar-text">OSS Team Project</span>
                    </Link>
                     
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mynavbar"
                    > {/* nav바 버튼 */}
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="create-game">Create Game</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}