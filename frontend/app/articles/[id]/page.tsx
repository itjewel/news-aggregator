// app/articles/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Article } from '../../types/types'; // Import the Article type
import Header from '../../components/Header'; // Import Header

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`, // Token for authorization
      };

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${params.id}`, { headers });

        if (!res.ok) {
          throw new Error('Failed to fetch article');
        }

        const data = await res.json();
        setArticle(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        {loading ? (
          <p>Loading article...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : article ? (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl w-full">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <p className="text-gray-600 mb-4">{article.content}</p>
            <div className="text-sm text-gray-500 mb-4">
              {article.source && <span>Source: {article.source}</span>}
              {article.category && <span className="ml-4">Category: {article.category}</span>}
              {article.published_at && (
                <span className="ml-4">
                  Published: {new Date(article.published_at).toLocaleDateString()}
                </span>
              )}
            </div>
            <a
              href='/'
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Back
            </a>
          </div>
        ) : (
          <p>No article found.</p>
        )}
      </div>
    </div>
  );
}
