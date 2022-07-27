import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useContext } from 'react';
import Header from './components/Header';
import ArticleList from './components/ArticleList';
import Article from './components/Article';
import ErrorContext from './contexts/ErrorContext';
import UserContext from './contexts/UserContext';
import Error from './components/Error';
import Alert from './components/Alert';

function App() {
  const [user, setUser] = useState({ id: 1, name: 'You', votedOn: [] });
  const [error, setError] = useState({ msg: '' });
  const [retry, setRetry] = useState({ msg: '', retrying: false });

  if (error.msg) {
    return <Error message={error.msg} />;
  }

  return (
    <ErrorContext.Provider value={{ error, setError, retry, setRetry }}>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Header />
          <div className="App">
            {retry.retrying ? <Alert /> : <></>}
            <div className="container-main">
              <Routes>
                <Route path="/" element={<ArticleList />} />
                <Route path="/topics/:topic_slug" element={<ArticleList />} />
                <Route path="/articles/:article_id" element={<Article />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </ErrorContext.Provider>
  );
}

export default App;
