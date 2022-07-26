import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import ErrorContext from '../contexts/ErrorContext';

export default function ArticleList() {
  const { setError } = useContext(ErrorContext);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://northcoders-api-news.herokuapp.com/api/articles`)
      .then(({ data: { articles } }) => {
        console.log(articles);
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </div>
  );
}
