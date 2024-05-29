import axios from "axios";

class NewsApi {
  static async getHealthHeadlines() {
    const url =
      "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000,
        responseType: "json",
        limit: 3,
      });
      return response.data.articles || [];
    } catch (error) {
      console.error("Error fetching health headlines:", error);
      throw error;
    }
  }
}

export default NewsApi;
