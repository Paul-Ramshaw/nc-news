import { useEffect, useState, useContext } from 'react';
import formatDate from '../utils/formatDate';
import UserContext from '../contexts/UserContext';

export default function Comment({ comment, author }) {
  const [commentDate, setCommentDate] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (comment.created_at) {
      const createdAt = formatDate(comment.created_at);
      setCommentDate(createdAt);
    }
  }, [comment]);

  let commentDetails = `${author.name} commented on ${commentDate}`;

  if (comment.author === user.username) {
    commentDetails = `You commented on ${commentDate}`;
  }

  if (!comment.created_at) {
    commentDetails = 'You just commented on this post';
  }

  return (
    <div className="comment">
      <div className="comment-author">{commentDetails}</div>
      <div className="comment-body">
        <p>{comment.body}</p>
      </div>
    </div>
  );
}
