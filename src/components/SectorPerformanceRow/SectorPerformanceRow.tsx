interface SectorPerformanceRowProps {
  sector: string;
  performance: number;
  totalPerformance: number;
}

export default function SectorPerformanceRow({
  sector,
  performance,
  totalPerformance,
}: SectorPerformanceRowProps) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="text-transparent-white truncate">{sector}</div>
      <div
        className={`rounded-sm px-1 ${performance > 0 ? `bg-gradient-to-l from-positive-light to-transparent text-positive from-[${performance / totalPerformance}]` : `bg-gradient-to-l from-negative-light to-transparent text-negative from-[${performance / totalPerformance}]`}`}
      >
        {performance >= 0 ? "+" : "-"}
        {Math.abs(performance).toFixed(2)}%
      </div>
    </div>
  );
}
