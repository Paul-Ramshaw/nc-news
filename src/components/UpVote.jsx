import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ErrorContext from '../contexts/ErrorContext';
import UserContext from '../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import retryVote from '../api/retryVote';

export default function UpVote({ article }) {
  const { user, setUser } = useContext(UserContext);
  const { setRetry } = useContext(ErrorContext);
  const [votedOnArticle, setVotedOnArticle] = useState(false);
  const [articleVotes, setArticleVotes] = useState('');

  useEffect(() => {
    setArticleVotes(article.votes);
  }, [article]);

  useEffect(() => {
    if (user.votedOn.includes(article.article_id)) {
      setVotedOnArticle(true);
    }
  }, [user]);

  function handleVote(vote) {
    setArticleVotes((currVote) => {
      return currVote + vote;
    });

    setUser((prevUser) => {
      const updatedUser = { ...prevUser };
      updatedUser.votedOn.push(article.article_id);
      return updatedUser;
    });

    const url = `https://northcoders-api-news.herokuapp.com/api/articles/${article.article_id}`;

    axios
      .patch(url, {
        inc_votes: vote,
      })
      .catch(() => {
        retryVote(url, vote, 5);
        setRetry({
          msg: "Your vote hasn't been saved yet, but we're going to try again later.",
          retrying: true,
        });
        setTimeout(() => {
          setRetry({ msg: '', retrying: false });
        }, [20000]);
      });
  }

  return (
    <div className="vote">
      {votedOnArticle ? (
        <FontAwesomeIcon className="icon green-arrow" icon={faArrowUp} />
      ) : (
        <FontAwesomeIcon
          className="icon upVoteArrow"
          icon={faArrowUp}
          onClick={() => handleVote(1)}
        />
      )}
      <p>{articleVotes}</p>
    </div>
  );
}
