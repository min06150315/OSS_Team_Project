import ShowGame from "../Game/ShowGame";

export default function Home({ searchTerm }) {
    return (
        <div>
            <ShowGame searchTerm={searchTerm} /> {/* 검색어를 ShowGame으로 전달 */}
        </div>
    );
}