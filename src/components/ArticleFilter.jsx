import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import ErrorContext from '../contexts/ErrorContext';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function ArticleFilter() {
  const { setError } = useContext(ErrorContext);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSort, setSelectedSort] = useState('votes');
  const [selectedOrder, setSelectedOrder] = useState('desc');
  const { topic_slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSelectedTopic(topic_slug);

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

  function handleQuerySelect(e, query) {
    e.preventDefault();

    const params = {
      sort_by: selectedSort,
      order_by: selectedOrder,
    };

    if (query === 'topic' && e.target.value === 'all') {
      setSearchParams(params);
    } else {
      setSearchParams({
        ...params,
        [query]: e.target.value,
      });
    }

    if (query === 'topic') {
      setSelectedTopic(e.target.value);
      return;
    }
    if (query === 'sort_by') {
      setSelectedSort(e.target.value);
      return;
    }
    if (query === 'order_by') {
      setSelectedOrder(e.target.value);
      return;
    }
  }

  return (
    <div className="filter-container">
      <div className="selector">
        <select
          name="topics"
          id="topics"
          className="select-topics"
          value={selectedTopic}
          onChange={(e) => handleQuerySelect(e, 'topic')}
        >
          <option key="all" value="all">
            all topics
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
          value={selectedSort}
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
          value={selectedOrder}
          onChange={(e) => handleQuerySelect(e, 'order_by')}
        >
          <option key="desc" value="desc">
            {selectedSort === 'votes' ? 'High to low' : 'Most recent'}
          </option>
          <option key="asc" value="asc">
            {selectedSort === 'votes' ? 'Low to high' : 'Oldest first '}
          </option>
        </select>
      </div>
    </div>
  );
}
