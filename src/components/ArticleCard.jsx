import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import UpVote from './UpVote';

export default function ArticleCard({ article }) {
  return (
    <Card className="article-card">
      <Card.Body>
        <UpVote article={article} />
        <div className="article-details">
          <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle className="topic-tag">{article.topic}</Card.Subtitle>
          <Card.Text>posted by {article.author}</Card.Text>
          <FontAwesomeIcon className="icon" icon={faComment} />{' '}
          {article.comment_count} comments
          <Link to={`/articles/${article.article_id}`} className="button">
            <Button variant="light">Read article</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
