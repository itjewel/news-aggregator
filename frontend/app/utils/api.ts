
import axios from 'axios';

export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
}

export const fetchArticles = async (query: string): Promise<Article[]> => {
    try {
      const response = await axios.get(`/api/articles/search?query=${query}`); // Update here
      return response.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  };
  

  
// export const fetchArticles = async (query: string): Promise<Article[]> => {
//   // Replace with your API calls
//   const response = await axios.get(`/api/articles?query=${query}`);
//   return response.data;
// };
