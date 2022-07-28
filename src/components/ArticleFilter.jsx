import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import ErrorContext from '../contexts/ErrorContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function ArticleFilter() {
  const { setError } = useContext(ErrorContext);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const { topic_slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

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

  function handleSelectTopic(e) {
    e.preventDefault();
    let url = '/topics/' + e.target.value;
    if (e.target.value === 'all') {
      url = '/';
    }
    setSelectedTopic(e.target.value);
    navigate(url);
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="filter-container">
      <div className="selector-topics">
        <select
          name="topics"
          id="topics"
          className="select-topics"
          value={selectedTopic}
          onChange={(e) => handleSelectTopic(e)}
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
    </div>
  );
}
