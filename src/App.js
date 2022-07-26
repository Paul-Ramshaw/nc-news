import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useContext } from 'react';
import Header from './components/Header';
import ArticleList from './components/ArticleList';
import Article from './components/Article';
import ErrorContext from './contexts/ErrorContext';
import Error from './components/Error';

function App() {
  const [error, setError] = useState({ msg: '' });

  if (error.msg) {
    return <Error message={error.msg} />;
  }

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="container-main">
            <Routes>
              <Route path="/" element={<ArticleList />} />
              <Route path="/topics/:topic_slug" element={<ArticleList />} />
              <Route path="/articles/:article_id" element={<Article />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ErrorContext.Provider>
  );
}

export default App;
