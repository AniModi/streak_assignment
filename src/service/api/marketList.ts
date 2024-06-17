import { MarketListType } from "../../types/MarketListType";
import yahooInstance from "../yahooInstance";

interface RawData {
  name: string;
  symbol: string;
  price: number;
  change: number;
  change_percent: number;
}

function transformMarketData(rawData: RawData[]): MarketListType[] {
  return rawData.map((item) => ({
    name: item.name,
    currentPrice: item.price,
    dailyChange: item.change,
    percentageChange: item.change_percent,
    symbol: item.symbol,
  }));
}

export async function fetchMarketData() {
  try {
    let response = await yahooInstance.get("/market-trends", {
      params: {
        trend_type: "MARKET_INDEXES",
      },
    });

    let data = response.data.data.trends;

    const res = transformMarketData(data);

    const symbols = ["GOLD", "SI=F", "CL"];

    response = await yahooInstance.get("/stock-quote-yahoo-finance", {
      params: {
        symbol: symbols.join(","),
      },
    });

    data = response.data.data;

    data.map((item: RawData) =>
      res.push({
        name: item.symbol,
        currentPrice: item.price,
        dailyChange: item.change,
        percentageChange: item.change_percent,
        symbol: item.symbol,
      }),
    );

    return res;
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
}
