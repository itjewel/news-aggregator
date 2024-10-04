import axios from 'axios';

export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
}

export const fetchArticles = async (query?: string): Promise<Article[]> => {
  try {
    // Retrieve the token from session storage
    const token = localStorage.getItem('token'); // Adjust the key if necessary

    // Set the Authorization header
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Construct the API URL based on whether a query is provided
    const url = query
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/search?query=${query}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`;

    const response = await axios.get(url, { headers }); // Pass headers here
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
