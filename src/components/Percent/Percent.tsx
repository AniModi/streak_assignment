interface PercentProps {
  percent: number;
}

export default function Percent({ percent }: PercentProps) {
  return (
    <div className="w-full text-right flex items-center justify-end">
      <div
        className={`flex items-center justify-center text-sm w-fit rounded-md px-3 py-1 ${percent > 0 ? "bg-positive-light text-positive" : "bg-negative-light text-negative"}`}
      >
        {percent > 0 ? "+" : "-"}
        {Math.abs(percent).toFixed(2)}%
      </div>
    </div>
  );
}
