import React from 'react'; // React 라이브러리 import
import { Link } from 'react-router-dom'; // Link 컴포넌트를 react-router-dom에서 import
import './Common.css'; // CSS 파일 import

const Navbar = () => {
  return (
    <nav className="custom-navbar"> {/* 사용자 정의 네비게이션 바 시작 */}
      <ul className="navbar-nav"> {/* 네비게이션 항목 리스트 */}
        <li className='nav-item'> {/* 네비게이션 아이템 */}
          <Link to="/" className="navbar-brand nav-title" href="#">OSS Team Project</Link> {/* 홈으로 이동하는 링크 */}
        </li>
        <div className='nav-content'> {/* 네비게이션 내용 컨테이너 */}
          <li className="nav-item"> 
            <Link className="nav-link" to="create-game">Create Game</Link> {/* 게임 생성 페이지로 이동하는 링크 */}
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="view-table">View Table</Link> {/* 게임 테이블 보기 페이지로 이동하는 링크 */}
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar; // Navbar 컴포넌트 내보내기