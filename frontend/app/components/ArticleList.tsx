import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Article } from '../types/types';

interface Preference {
  source?: string;
  category?: string;
  author?: string;
}



interface ArticleListProps {
  articles: Article[];
  preferences?: Preference;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles = [], preferences = {} }) => {
  const filteredArticles = React.useMemo(() => {
    if (!Array.isArray(articles)) {
      return [];
    }

    return articles.filter(article => {
      const matchesSource = preferences.source ? article.source === preferences.source : true;
      const matchesCategory = preferences.category ? article.category === preferences.category : true;
      return matchesSource && matchesCategory;
    });
  }, [articles, preferences]);

  return (
    <div className="space-y-4">
      {filteredArticles.length > 0 ? (
        <ul className="space-y-4">
          {filteredArticles.map(article => (
            <li key={article.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">              
             <Link
              href={`/articles/${article.id}`}
              rel="noopener noreferrer"
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {article.title}
            </Link>

              <div className="mt-2 text-sm text-gray-500">
                {article.source && <span>Source: {article.source}</span>}
                {article.category && <span className="ml-2">Category: {article.category}</span>}
                {article.created_at && <span className="ml-2">Created: {dayjs(article.created_at).format('MMMM D, YYYY h:mm A')}</span>}
                {article.published_at && <span className="ml-2">Published: {dayjs(article.published_at).format('MMMM D, YYYY h:mm A')}</span>}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No articles found matching your preferences.</p>
      )}
    </div>
  );
};

export default ArticleList;
