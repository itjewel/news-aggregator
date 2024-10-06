import axios from "axios";

interface Filters {
  date?: string;       
  category?: string;  
  source?: string;     
}

export const fetchArticles = async (
  query: string,
  page: number = 1,
  limit: number = 10,
  filters: Filters = {}
): Promise<FetchArticlesResponse> => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`, // Token for authorization
    };

    // Base URL
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`;
    const params: { [key: string]: any } = {
      page,
      limit,
      ...(query ? { query } : {}),
      ...(filters.date ? { date: filters.date } : {}),
      ...(filters.category ? { category: filters.category } : {}),
      ...(filters.source ? { source: filters.source } : {}),
    };

    const response = await axios.get<FetchArticlesResponse>(url, { headers, params });

    const articles: Article[] = response.data.data;
    const totalPages: number = response.data.last_page;

    return { data: articles, last_page: totalPages };
  } catch (error) {
    console.error("Error fetching articles:", error.response?.data || error.message);
    throw error;
  }
};
