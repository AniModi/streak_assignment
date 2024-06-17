import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MarketListType } from "../../types/MarketListType";

interface ChartContentProps {
  data: { date: string; price: number }[];
  timeRange: { value: string; set: (value: string) => void };
  stock: MarketListType;
}

export default function ChartContent({
  data,
  timeRange,
  stock,
}: ChartContentProps) {
  const timeRanges = ["1D", "5D", "1M", "3M", "1Y", "MAX"];

  return (
    <>
      <div className="mb-4 flex justify-center space-x-2">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => timeRange.set(range)}
            className={`rounded px-3 py-1 ${
              timeRange.value === range
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
    </>
  );
}
