import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import ErrorContext from '../contexts/ErrorContext';
import retryPostComment from '../api/retryPostComment';
import sortByDate from '../utils/sortByDate';

export default function CommentForm({ article_id, setComments }) {
  const [currentComment, setCurrentComment] = useState('');
  const { user } = useContext(UserContext);
  const { setRetry } = useContext(ErrorContext);

  function handleSubmit(e) {
    e.preventDefault();

    setComments((prev) => {
      const newComments = [...prev];
      newComments.unshift({
        comment_id: new Date(),
        author: user.username,
        body: currentComment,
        justSubmitted: true,
      });
      return newComments;
    });

    const commentToPost = {
      username: user.username,
      body: currentComment,
    };

    const url = `https://northcoders-api-news.herokuapp.com/api/articles/${article_id}/comments`;

    axios
      .post(url, commentToPost)
      .then(() => {
        axios
          .get(
            `https://northcoders-api-news.herokuapp.com/api/articles/${article_id}/comments`
          )
          .then(({ data: { comments } }) => {
            const sortedComments = sortByDate(comments);
            setComments(sortedComments);
          });
      })
      .catch((error) => {
        retryPostComment(url, commentToPost, 5);
        setRetry({
          msg: "Your comment hasn't been saved yet, but we're going to try again later.",
          retrying: true,
        });
        setTimeout(() => {
          setRetry({ msg: '', retrying: false });
        }, [20000]);
      });

    setCurrentComment('');
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="textarea"
            as="textarea"
            placeholder="What are your thoughts?"
            value={currentComment}
            onChange={(event) => setCurrentComment(event.target.value)}
          />
        </Form.Group>
        <div className="container-comment-button">
          {currentComment.trim().length > 0 ? (
            <Button variant="primary" type="submit">
              Comment
            </Button>
          ) : (
            <Button variant="primary" type="submit" disabled>
              Comment
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
