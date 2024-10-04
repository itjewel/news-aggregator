import React from 'react';

interface Preference {
  source?: string; // Optional property
  category?: string; // Optional property
  author?: string; // Optional property
}

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  source?: string; // Optional property to match your filtering
  category?: string; // Optional property to match your filtering
  author?: string; // Optional property to match your filtering
}

interface ArticleListProps {
  articles: Article[];
  preferences?: Preference; // Make preferences optional
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, preferences = {} }) => {
  const filteredArticles = articles.filter(article =>
    (preferences.source ? article.source === preferences.source : true) &&
    (preferences.category ? article.category === preferences.category : true) &&
    (preferences.author ? article.author === preferences.author : true)
  );

  return (
    <div className="space-y-4">
      {filteredArticles.length > 0 ? (
        <ul className="space-y-4">
          {filteredArticles.map(article => (
            <li key={article.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-600 hover:underline">
                {article.title}
              </a>
              <p className="text-gray-600">{article.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                {article.source && <span>Source: {article.source}</span>}
                {article.category && <span className="ml-2">Category: {article.category}</span>}
                {article.author && <span className="ml-2">Author: {article.author}</span>}
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
