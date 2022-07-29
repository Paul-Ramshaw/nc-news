import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import ErrorContext from '../contexts/ErrorContext';
import { useLocation, useSearchParams } from 'react-router-dom';

export default function ArticleFilter() {
  const { setError } = useContext(ErrorContext);
  const [topics, setTopics] = useState([]);
  const [selection, setSelection] = useState({
    topic: 'all',
    sort_by: 'votes',
    order_by: 'desc',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`https://northcoders-api-news.herokuapp.com/api/topics`)
      .then(({ data: { topics } }) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, []);

  useEffect(() => {
    const query = {};
    query.sort_by = searchParams.get('sort_by') || 'votes';
    query.order_by = searchParams.get('order_by') || 'desc';
    query.topic = searchParams.get('topic') || 'all';

    if (!location.search) {
      query.topic = 'all';
    }

    setSelection(query);
  }, [searchParams]);

  function handleQuerySelect(e, query) {
    e.preventDefault();

    const params = {
      sort_by: selection.sort_by,
      order_by: selection.order_by,
      topic: selection.topic,
    };

    setSearchParams({
      ...params,
      [query]: e.target.value,
    });
  }

  if (isLoading) return <></>;

  return (
    <div className="filter-container">
      <div className="selector">
        <select
          name="topics"
          id="topics"
          className="select-topics"
          value={selection.topic || undefined}
          onChange={(e) => handleQuerySelect(e, 'topic')}
        >
          <option key="all" value="all">
            All topics
          </option>
          {topics.map((topic) => {
            return (
              <option key={topic.slug} value={topics.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
      </div>
      <div className="selector">
        <select
          name="sort"
          id="sort"
          className="select-sort"
          value={selection.sort_by}
          onChange={(e) => handleQuerySelect(e, 'sort_by')}
        >
          <option key="votes" value="votes">
            Votes
          </option>
          <option key="created_at" value="created_at">
            Date
          </option>
        </select>
      </div>
      <div className="selector">
        <select
          name="order"
          id="order"
          className="select-order"
          value={selection.order_by}
          onChange={(e) => handleQuerySelect(e, 'order_by')}
        >
          <option key="desc" value="desc">
            {selection.sort_by === 'votes' ? 'High to low' : 'Most recent'}
          </option>
          <option key="asc" value="asc">
            {selection.sort_by === 'votes' ? 'Low to high' : 'Oldest first '}
          </option>
        </select>
      </div>
    </div>
  );
}
