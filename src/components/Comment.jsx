import { useEffect, useState } from 'react';
import formatDate from '../utils/formatDate';

export default function Comment({ comment, author }) {
  const [commentDate, setCommentDate] = useState('');

  useEffect(() => {
    const createdAt = formatDate(comment.created_at);
    setCommentDate(createdAt);
  }, [comment]);

  return (
    <div className="comment">
      <div className="comment-author">
        {author.name} commented on {commentDate}
      </div>
      <div className="comment-body">
        <p>{comment.body}</p>
      </div>
    </div>
  );
}
