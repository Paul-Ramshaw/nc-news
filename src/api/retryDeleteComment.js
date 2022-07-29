import axios from 'axios';

export default function retryDeleteComment(url, retries) {
  if (!retries) {
    return;
  }

  console.log(url);

  axios.delete(url).catch((error) => {
    setTimeout(() => {
      retryDeleteComment(url, retries - 1);
    }, [5000]);
  });
}
