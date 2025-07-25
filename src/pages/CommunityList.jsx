// function CommunityList() {
//   return <div>📄 글 목록 페이지</div>;
// }
// export default CommunityList;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CommunityList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-created");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/community/?search=${search}&ordering=${ordering}`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("게시글 불러오기 실패:", err));
  }, [search, ordering]);

  return (
    <div>
      <h2>📄 게시글 목록</h2>

      <input
        type="text"
        placeholder="검색어 입력"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
        <option value="-created">최신순</option>
        <option value="-likes_count">좋아요순</option>
      </select>

      <ul>
        {posts.map(post => (
          <li key={post.id} onClick={() => navigate(`/community/${post.id}`)}>
            <h3>{post.title || "(제목 없음)"}</h3>
            <p>작성자: {post.is_anonymous ? "익명" : post.owner.name}</p>
            <p>❤️ {post.likes_count}개</p>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/community/write")}>✏️ 글쓰기</button>
    </div>
  );
}

export default CommunityList;
