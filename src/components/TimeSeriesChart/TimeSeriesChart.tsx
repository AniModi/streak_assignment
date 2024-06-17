import { useState, useEffect } from "react";
import { TimeSeriesData } from "../../types/TimeSeriesData";
import { fetchTimeSeries } from "../../service/api/timeSeriesData";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MarketListType } from "../../types/MarketListType";
import { dummyTimeSeriesData } from "../../data/dummyData";
import { useLive } from "../../hooks/useLive";

interface TimeSeriesChartProps {
  stock: MarketListType;
}

export default function TimeSeriesChart({ stock }: TimeSeriesChartProps) {
  const [data, setData] =
    useState<{ date: string; price: number }[]>(dummyTimeSeriesData);

  const [timeRange, setTimeRange] = useState("1D");
  const { isLive } = useLive();
  useEffect(() => {
    if (isLive)
      fetchTimeSeries(stock.symbol, timeRange).then((res: TimeSeriesData) => {
        const formattedData = Object.entries(res).map(([date, values]) => ({
          date,
          price: values.price,
        }));
        setData(formattedData);
      });
  }, [stock, timeRange, isLive]);

  const timeRanges = ["1D", "5D", "1M", "3M", "1Y", "MAX"];

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <div className="mb-4 flex justify-center space-x-2">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`rounded px-3 py-1 ${
              timeRange === range
                ? "bg-positive text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="h-64 w-full md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                color: "#000",
              }}
              itemStyle={{ color: "#000" }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#2E7F4E"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center text-lg font-semibold">{stock.name}</div>
    </div>
  );
}
