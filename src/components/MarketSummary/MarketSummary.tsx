import { useEffect, useState } from "react";
import { Arrow } from "../../assets";
import { fetchTrendingNews } from "../../service/api/newsSentiment";
import { dummyMarketSummary } from "../../data/dummyData";
import { useLive } from "../../hooks/useLive";

export default function MarketSummary() {
  const [marketData, setMarketData] = useState(dummyMarketSummary);
  const { isLive } = useLive();
  useEffect(() => {
    if (isLive)
      fetchTrendingNews()
        .then((data) => {
          setMarketData({
            headline: data.title,
            sentiment: data.sentiment,
          });
        })
        .catch((error) => {
          console.error("Error fetching trending news:", error);
        });
  }, [isLive]);

  const getSentimentDisplay = () => {
    if (marketData.sentiment.toLowerCase().includes("bull")) {
      return {
        className: "text-positive",
        arrowClass: "-rotate-45 fill-positive",
      };
    } else if (marketData.sentiment.toLowerCase().includes("bear")) {
      return {
        className: "text-negative",
        arrowClass: "rotate-45 fill-negative",
      };
    }
    return {
      className: "text-white",
      arrowClass: "fill-white",
    };
  };

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-md bg-background-dark p-8">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-background-light px-3 py-1">
          The market is{" "}
          <span className={`font-bold ${getSentimentDisplay().className}`}>
            {marketData.sentiment}
          </span>
        </div>
        <div className="rounded-full bg-background-light p-1.5">
          <Arrow
            className={`h-5 w-5 ${getSentimentDisplay().arrowClass}`}
          ></Arrow>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm text-transparent-white">
          What you need to know today?
        </div>
        <div className="text-lg font-semibold">{marketData.headline}</div>
      </div>
    </div>
  );
}
