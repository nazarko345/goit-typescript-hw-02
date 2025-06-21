import axios from "axios";

export const fetchArticles = async (query, curentPage) => {
  const API_KEY = "ApAc7bqyxk2XAaeNOfRvdxLZMiSoS4zXYOzQ_kL4DB4";
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      client_id: API_KEY,
      per_page: 18,
      query,
      page: curentPage,
    },
  });
  return response.data;
};
