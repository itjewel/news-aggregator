import axios from "axios";

export const fetchArticles = async (
  query?: string,
  page: number = 1,
  limit: number = 10
): Promise<FetchArticlesResponse> => {
  try {
    const token = localStorage.getItem('token'); // Fetching the token from local storage
    const headers = {
      Authorization: `Bearer ${token}`, // Adding the token to the request headers
    };

    // Constructing the URL based on whether a query is provided or not
    const url = query
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/search?query=${query}&page=${page}&limit=${limit}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles?page=${page}&limit=${limit}`;

    // Making the API request
    const response = await axios.get<FetchArticlesResponse>(url, { headers });

    // Log the full response to ensure data is valid
    console.log("API Response:", response.data);
    const articles: Article[] = response.data.data; // Ensure this is an array
    const totalPages: number = response.data.last_page; // Assuming last_page is correctly returned

    return { data: articles, last_page: totalPages }; // Return both articles and total pages
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // Rethrow the error for further handling
  }
};
