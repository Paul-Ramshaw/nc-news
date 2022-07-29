import { useEffect, useState, useContext } from 'react';
import formatDate from '../utils/formatDate';
import UserContext from '../contexts/UserContext';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import retryDeleteComment from '../api/retryDeleteComment';
import ErrorContext from '../contexts/ErrorContext';

export default function Comment({ comment, author, setComments }) {
  const [commentDate, setCommentDate] = useState('');
  const { user } = useContext(UserContext);
  const { setRetry } = useContext(ErrorContext);

  useEffect(() => {
    if (comment.created_at) {
      const createdAt = formatDate(comment.created_at);
      setCommentDate(createdAt);
    }
  }, [comment]);

  function handleDeleteClick() {
    setComments((prev) => {
      let newComments = [...prev];
      return (newComments = newComments.filter((newComment) => {
        return newComment.comment_id !== comment.comment_id;
      }));
    });

    const url = `https://northcoders-api-news.herokuapp.com/api/comments/${comment.comment_id}`;

    axios.delete(url).catch((error) => {
      retryDeleteComment(url, 5);
      setRetry({
        msg: "Your comment hasn't been deleted yet, but we're going to try again later.",
        retrying: true,
      });
      setTimeout(() => {
        setRetry({ msg: '', retrying: false });
      }, [20000]);
    });
  }

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
      <div className="container-comment-button">
        {!comment.justSubmitted && user.username === comment.author ? (
          <Button
            variant="danger"
            className="button-comment-delete"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
