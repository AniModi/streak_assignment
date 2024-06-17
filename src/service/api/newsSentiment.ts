import axiosInstance from "../avInstance";

export async function fetchTrendingNews() {
  try {
    const response = await axiosInstance.get("", {
      params: {
        function: "NEWS_SENTIMENT",
        sort: "latest",
        limit: 1,
      },
    });
    return {
      title: response.data.feed[0].title,
      sentiment: response.data.feed[0].overall_sentiment_label,
    };
  } catch (error) {
    console.error("Error fetching trending news:", error);
    throw error;
  }
}
