import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ErrorContext from '../contexts/ErrorContext';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import formatDate from '../utils/formatDate';

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const { setError } = useContext(ErrorContext);
  const [isLoading, setIsLoading] = useState(true);
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://northcoders-api-news.herokuapp.com/api/articles/${article_id}`
      )
      .then(({ data: { article } }) => {
        const dateCreated = formatDate(article.created_at);
        setCreatedAt(dateCreated);
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Card className="article-card">
      <Card.Body>
        <div className="vote">
          <FontAwesomeIcon className="icon" icon={faArrowUp} />
          <p>{article.votes}</p>
        </div>
        <div className="article-details">
          <p className="article-sub-details">{article.topic}</p>
          <Card.Title>{article.title}</Card.Title>
          <p className="article-body">{article.body}</p>
          <p className="article-details-author">
            Posted by {article.author} on {createdAt}
          </p>
          <Button variant="light">
            {' '}
            <FontAwesomeIcon className="icon" icon={faComment} />{' '}
            {article.comment_count} comments
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
