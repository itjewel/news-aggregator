'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Header from '../../components/Header'; 

export default function Preferences() {
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  // const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const router = useRouter(); // Initialize router

  const savePreferences = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ source, category }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(errorText || 'Failed to save preferences');
      }

      const data = await response.json();
      setMessage(data.message);
      setError(''); 
      setSource('');
      setCategory('');
      
      router.push('/preferences');
    } catch (error) {
      setError(error.message);
      setMessage(''); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-center">Set Preferences</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              savePreferences(); 
            }}
            className="space-y-4"
          >
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Source</option>
              <option value="newsapi">NewsAPI</option>
              <option value="theguardian">The Guardian</option>
              <option value="nytimes">NY Times</option>
            </select>
           
            <input
              type="text"
              placeholder="Preferred Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* <input
              type="text"
              placeholder="Preferred Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
            <button
              type="submit"
              className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300`}
              disabled={loading} 
            >
              {loading ? 'Loading...' : 'Save Preferences'}
            </button>
          </form>
          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
          {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
        </div>
      </div>
    </div>
  );
}
