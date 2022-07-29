import { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import sortByDate from '../utils/sortByDate';
import CommentForm from './CommentForm';

export default function Comments({ article }) {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://northcoders-api-news.herokuapp.com/api/articles/${article.article_id}/comments`
      )
      .then(({ data: { comments } }) => {
        const sortedComments = sortByDate(comments);
        setComments(sortedComments);
      })
      .catch((err) => {
        setCommentsError(true);
      });

    axios
      .get(`https://northcoders-api-news.herokuapp.com/api/users`)
      .then(({ data: { users } }) => {
        const usersReference = {};
        users.forEach((user) => {
          usersReference[user.username] = user;
        });
        setUsers(usersReference);
        setIsLoading(false);
      })
      .catch((err) => {
        setCommentsError(true);
      });
  }, [article]);

  if (isLoading) {
    return <></>;
  }

  if (commentsError) {
    return <p>Can't get comments right now</p>;
  }

  return (
    <div>
      <CommentForm article_id={article.article_id} setComments={setComments} />
      <div className="comments-container">
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.comment_id}
              comment={comment}
              author={users[comment.author]}
              setComments={setComments}
            />
          );
        })}
      </div>
    </div>
  );
}
