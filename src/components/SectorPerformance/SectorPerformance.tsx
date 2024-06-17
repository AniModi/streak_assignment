import { useEffect, useState } from "react";
import { getSectorPerformance } from "../../service/api/sectorPerformance";
import { SectorPerformanceType } from "../../types/SectorPerformance";
import { dummySectorPerformance } from "../../data/dummyData";
import SectorPerformanceRow from "../SectorPerformanceRow/SectorPerformanceRow";
import { useLive } from "../../hooks/useLive";

export default function SectorPerformance() {
  const [performance, setPerformance] = useState<SectorPerformanceType[]>(
    dummySectorPerformance,
  );

  const { isLive } = useLive();

  useEffect(() => {
    if (isLive)
      getSectorPerformance().then((data) => {
        const allSector = {
          sector: "All Sectors",
          performance: 0,
        };
        allSector.performance = data.reduce(
          (acc: number, curr: SectorPerformanceType) => acc + curr.performance,
          0,
        );
        data.sort((a, b) => b.performance - a.performance);
        setPerformance([allSector, ...data]);
      });
  }, [isLive]);

  function calculateSum(): {
    positiveSum: number;
    negativeSum: number;
  } {
    let positiveSum = 1;
    let negativeSum = -1;

    for (let i = 0; i < performance.length; i++) {
      if (performance[i].performance > 0) {
        positiveSum += performance[i].performance;
      } else {
        negativeSum += performance[i].performance;
      }
    }

    return { positiveSum, negativeSum };
  }

  const renderPerformanceRows = () => {
    const rows = [];
    const { positiveSum, negativeSum } = calculateSum();
    for (let i = 0; i < performance.length; i += 8) {
      const rowItems = performance.slice(i, i + 8).map((ele, ind) => {
        if (i == 0 && ind == 0) {
          return (
            <div className="flex items-center justify-between py-1" key={ind}>
              <div className="border-b border-white text-white truncate">
                {ele.sector}
              </div>
              <div className="text-white">{ele.performance.toFixed(2)}%</div>
            </div>
          );
        }
        return (
          <SectorPerformanceRow
            {...ele}
            totalPerformance={ele.performance >= 0 ? positiveSum : negativeSum}
            key={ind}
          ></SectorPerformanceRow>
        );
      });
      rows.push(
        <div className="flex w-1/2 flex-col" key={i}>
          {rowItems}
        </div>,
      );
    }
    return rows;
  };

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-md bg-background-dark p-8">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-white">
          Sector Performance
        </div>
        <div className="text-xs text-transparent-white">% price change</div>
      </div>
      <div className="mt-4 flex gap-4">{renderPerformanceRows()}</div>
    </div>
  );
}
