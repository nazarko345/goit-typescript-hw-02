import axios from "axios";
import type { UnsplashResponse } from "./types";

export const fetchArticles = async (
  query: string,
  curentPage: number
): Promise<UnsplashResponse> => {
  const API_KEY = "ApAc7bqyxk2XAaeNOfRvdxLZMiSoS4zXYOzQ_kL4DB4";
  const response = await axios.get<UnsplashResponse>(
    "https://api.unsplash.com/search/photos",
    {
      params: {
        client_id: API_KEY,
        per_page: 18,
        query,
        page: curentPage,
      },
    }
  );
  return response.data;
};
