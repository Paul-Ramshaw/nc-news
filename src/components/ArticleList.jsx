import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import ErrorContext from '../contexts/ErrorContext';
import { useParams } from 'react-router-dom';
import ArticleFilter from './ArticleFilter';

export default function ArticleList() {
  const { setError } = useContext(ErrorContext);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic_slug } = useParams();

  console.log(topic_slug);

  useEffect(() => {
    let request = `https://northcoders-api-news.herokuapp.com/api/articles`;

    if (topic_slug) {
      request = `https://northcoders-api-news.herokuapp.com/api/articles?topic=${topic_slug}`;
    }

    axios
      .get(request)
      .then(({ data: { articles } }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, [topic_slug]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ArticleFilter />
      <div>
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </div>
    </div>
  );
}
