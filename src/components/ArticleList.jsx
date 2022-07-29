import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import ErrorContext from '../contexts/ErrorContext';
import { useSearchParams } from 'react-router-dom';
import ArticleFilter from './ArticleFilter';

export default function ArticleList() {
  const { setError } = useContext(ErrorContext);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = {};
    params.sort_by = searchParams.get('sort_by') || 'votes';
    params.order_by = searchParams.get('order_by') || 'desc';

    const searchTopic = searchParams.get('topic');

    if (searchTopic && searchTopic !== 'all') {
      params.topic = searchTopic;
    }

    let request = `https://northcoders-api-news.herokuapp.com/api/articles`;

    axios
      .get(request, { params: params })
      .then(({ data: { articles } }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, [searchParams]);

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
