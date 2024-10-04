'use client'
import { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ArticleList from './components/ArticleList';
import { fetchArticles } from './utils/fetchArticles';

const Home = () => {
  const [articles, setArticles] = useState([]);

  const handleSearch = async (query: string) => {
    // Fetch articles based on the search query
    const fetchedArticles = await fetchArticles(query);
    setArticles(fetchedArticles);
  };

  // Fetch all articles when the component mounts
  useEffect(() => {
    const loadArticles = async () => {
      const fetchedArticles = await fetchArticles(); // Fetch all articles by not passing any query
      setArticles(fetchedArticles);
    };
    
    loadArticles();
  }, []);

  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Welcome to News Aggregator</h1>
        <SearchBar onSearch={handleSearch} />
        <ArticleList articles={articles} />
      </main>
    </div>
  );
};

export default Home;
