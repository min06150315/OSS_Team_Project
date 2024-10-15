import ShowGame from "../Game/ShowGame"; // 게임 목록을 보여주는 ShowGame 컴포넌트 가져오기

export default function Home({ searchTerm }) {
    return (
        <div>
           <ShowGame searchTerm={searchTerm} /> {/* 검색어를 ShowGame 컴포넌트로 전달하여 해당 검색어에 맞는 게임들을 보여주기 */}
        </div>
    );
}