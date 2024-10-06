'use client';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ArticleList from './components/ArticleList';
import { fetchArticles } from './utils/fetchArticles';
import LoadingSpinner from './components/LoadingSpinner';

interface Preference {
  source?: string;
  category?: string;
  author?: string;
}

interface Article {
  id: string; // Adjust this based on your API response
  title: string;
  description: string;
  url: string;
  source?: string;
  category?: string;
  author?: string;
}

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [preferences, setPreferences] = useState<Preference>({});
  const articlesPerPage = 10;

  const loadArticles = async (query: string, page: number, filters: { date?: string; category?: string; source?: string } = {}) => {
    setLoading(true);
    try {
      const response = await fetchArticles(query, page, articlesPerPage, filters);
      
      const { data:{data, last_page} } = response;
      setArticles(Array.isArray(data) ? data : []);
      setTotalPages(last_page);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]); // Handle errors gracefully
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string, filters: { date?: string; category?: string; source?: string }) => {
    loadArticles(query, 1, filters); // Pass filters along with the query and reset to page 1
  };

  useEffect(() => {
    loadArticles('', currentPage); // Load articles on initial render
  }, [currentPage]);

  useEffect(() => {
  }, [articles]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Welcome to News Aggregator</h1>
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="text-center p-4">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {articles.length > 0 ? (
              <ArticleList articles={articles} preferences={preferences} />
            ) : (
              <p>No articles found.</p>
            )}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-2 bg-blue-500 text-white rounded p-2 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 p-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-2 bg-blue-500 text-white rounded p-2 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
