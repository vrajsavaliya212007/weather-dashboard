import axios from "axios";

const NEWS_BASE_URL = "https://newsapi.org/v2";

const API_KEY = process.env.NEWS_API_KEY;

export const getWeatherNewsService = async (
  search = "",
  category = "weather",
) => {
  const query = search.trim() || category;

  const { data } = await axios.get(`${NEWS_BASE_URL}/everything`, {
    params: {
      q: query,
      language: "en",
      sortBy: "publishedAt",
      pageSize: 20,
      apiKey: API_KEY,
    },
  });

  return data.articles;
};
