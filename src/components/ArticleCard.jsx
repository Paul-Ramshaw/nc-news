import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  return (
    <Card className="article-card">
      <Card.Body>
        <div className="vote">
          <FontAwesomeIcon className="icon" icon={faArrowUp} />
          <p>{article.votes}</p>
        </div>
        <div className="article-details">
          <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle className="topic-tag">{article.topic}</Card.Subtitle>
          <Card.Text>posted by {article.author}</Card.Text>
          <Button variant="light">
            {' '}
            <FontAwesomeIcon className="icon" icon={faComment} />{' '}
            {article.comment_count} comments
          </Button>
          <Link to={`/articles/${article.article_id}`}>
            <Button variant="light">Read article</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
