import React from 'react';

interface Preference {
  source?: string; // Optional property
  category?: string; // Optional property
  author?: string; // Optional property
}

interface Article {
  id: string | number; // Adjust this based on your API response (string or number)
  title: string;
  description: string;
  url: string;
  source?: string; // Optional property to match your filtering
  category?: string; // Optional property to match your filtering
  author?: string; // Optional property to match your filtering
}

interface ArticleListProps {
  articles: Article[]; // Ensure articles is defined as an array
  preferences?: Preference; // Make preferences optional
}

const ArticleList: React.FC<ArticleListProps> = ({ articles = [], preferences = {} }) => {
  {console.log(articles,'test juairia')}
  const filteredArticles = React.useMemo(() => {
    if (!Array.isArray(articles)) {
      console.error("Expected articles to be an array, got:", articles);
      return []; // Return an empty array if articles is not an array
    }

    return articles.filter(article => {
      const matchesSource = preferences.source ? article.source === preferences.source : true;
      const matchesCategory = preferences.category ? article.category === preferences.category : true;
      const matchesAuthor = preferences.author ? article.author === preferences.author : true;
      return matchesSource && matchesCategory && matchesAuthor;
    });
  }, [articles, preferences]);

  return (
    <div className="space-y-4">
      {console.log(filteredArticles,'juairia')}
      {filteredArticles.length > 0 ? (
        <ul className="space-y-4">
          {filteredArticles.map(article => (
            <li key={article.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xl font-semibold text-blue-600 hover:underline"
                aria-label={`Read more about ${article.title}`} // Improve accessibility
              >
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
