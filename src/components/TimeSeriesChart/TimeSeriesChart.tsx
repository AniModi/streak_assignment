import { useState, useEffect, Suspense } from "react";
import { TimeSeriesData } from "../../types/TimeSeriesData";
import { fetchTimeSeries } from "../../service/api/timeSeriesData";
import { MarketListType } from "../../types/MarketListType";
import { dummyTimeSeriesData } from "../../data/dummyData";
import { useLive } from "../../hooks/useLive";
import ChartContent from "../Chart/Chart";

interface TimeSeriesChartProps {
  stock: MarketListType;
}

export default function TimeSeriesChart({ stock }: TimeSeriesChartProps) {
  const [data, setData] =
    useState<{ date: string; price: number }[]>(dummyTimeSeriesData);
  const [timeRange, setTimeRange] = useState("1D");
  const { isLive } = useLive();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLive) {
      setIsLoading(true);
      fetchTimeSeries(stock.symbol, timeRange)
        .then((res: TimeSeriesData) => {
          const formattedData = Object.entries(res).map(([date, values]) => ({
            date,
            price: values.price,
          }));
          setData(formattedData);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [stock, timeRange, isLive]);

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <Suspense
        fallback={
          <div className="flex items-center justify-center">Loading...</div>
        }
      >
        {isLoading ? (
          <div className="flex items-center justify-center">Loading...</div>
        ) : (
          <ChartContent
            data={data}
            timeRange={{ value: timeRange, set: setTimeRange }}
            stock={stock}
          />
        )}
      </Suspense>
    </div>
  );
}
