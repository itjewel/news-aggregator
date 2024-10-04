'use client'
import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ArticleList from './components/ArticleList';
import { fetchArticles } from './utils/api';

const Home = () => {
  const [articles, setArticles] = useState([]);

  const handleSearch = async (query: string) => {
    const fetchedArticles = await fetchArticles(query);
    setArticles(fetchedArticles);
  };

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
