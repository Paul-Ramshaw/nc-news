import axios from 'axios';

export default function retryVote(url, vote, retries) {
  if (!retries) {
    return;
  }

  axios
    .patch(url, {
      inc_votes: vote,
    })
    .catch((error) => {
      setTimeout(() => {
        retryVote(url, vote, retries - 1);
      }, [5000]);
    });
}
