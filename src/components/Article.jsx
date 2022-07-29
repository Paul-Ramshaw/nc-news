import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import formatDate from '../utils/formatDate';
import UpVote from './UpVote';
import Comments from './Comments';
import Error from './Error';

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [articleError, setArticleError] = useState({ msg: '' });
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
        setArticleError(err.response.data);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (articleError.msg) {
    return <Error message={articleError.msg} />;
  }

  return (
    <div>
      <Card className="article-card">
        <Card.Body>
          <UpVote article={article} />
          <div className="article-details">
            <p className="article-sub-details">{article.topic}</p>
            <Card.Title className="article-title">{article.title}</Card.Title>
            <p className="article-body">{article.body}</p>
            <p className="article-details-author">
              Posted by {article.author} on {createdAt}
            </p>
          </div>
        </Card.Body>
      </Card>
      <Comments article={article} />
    </div>
  );
}
