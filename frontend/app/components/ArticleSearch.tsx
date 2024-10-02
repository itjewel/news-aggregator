// components/ArticleSearch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ArticleSearch() {
  const [keyword, setKeyword] = useState('');
  const [articles, setArticles] = useState([]);

  const searchArticles = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/articles/search?keyword=${keyword}`);
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles');
    }
  };

  return (
    <div>
      <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search articles" />
      <button onClick={searchArticles}>Search</button>
      <ul>
        {articles.map(article => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
}
