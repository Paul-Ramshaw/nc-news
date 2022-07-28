import axios from 'axios';

export default function retryPostComment(url, commentToPost, retries) {
  if (!retries) {
    return;
  }

  axios.post(url, commentToPost).catch((error) => {
    setTimeout(() => {
      retryPostComment(url, commentToPost, retries - 1);
    }, [5000]);
  });
}
