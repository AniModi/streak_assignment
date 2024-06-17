import yahooInstance from "../yahooInstance";

export async function fetchTimeSeries(symbol: string, period: string) {
  try {
    const response = await yahooInstance.get("/stock-time-series", {
      params: {
        symbol: symbol,
        period: period,
      },
    });

    const data = response.data.data.time_series;

    return data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
}
