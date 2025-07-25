// function CommunityDetail() {
//   return <div>🔍 글 상세조회 페이지</div>;
// }
// export default CommunityDetail;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CommunityDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/api/community/${postId}/`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => console.error("상세 조회 실패:", err));
  }, [postId]);

  if (!post) return <div>불러오는 중...</div>;

  return (
    <div>
      <h2>{post.title || "(제목 없음)"}</h2>
      <p>작성자: {post.is_anonymous ? "익명" : post.owner.name}</p>
      <pre>{post.code}</pre>
      <p>❤️ 좋아요 {post.likes_count}</p>

      <h3>💬 댓글</h3>
      <ul>
        {post.comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.author.name}</strong>: {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommunityDetail;
