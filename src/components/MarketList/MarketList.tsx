import { useEffect, useState } from "react";
import { MarketListType } from "../../types/MarketListType";
import { fetchMarketData } from "../../service/api/marketList";
import Change from "../Change/Change";
import TimeSeriesChart from "../TimeSeriesChart/TimeSeriesChart";
import Percent from "../Percent/Percent";
import { dummyMarketList } from "../../data/dummyData";
import { useLive } from "../../hooks/useLive";

export default function MarketList() {
  const [marketItems, setMarketItems] =
    useState<MarketListType[]>(dummyMarketList);

  const [selectedStock, setSelectedStock] = useState<number>(0);
  const { isLive } = useLive();

  useEffect(() => {
    if (isLive) fetchMarketData().then((res) => setMarketItems(res));
  }, [isLive]);

  function onClick(index: number) {
    setSelectedStock(index);
  }

  return (
    <div className="smallLaptop:flex-col flex h-full w-full rounded-md bg-background-dark p-10 mobile:p-5">
      <div className="smallLaptop:h-fit smallLaptop:w-full h-full w-2/5">
        {marketItems.map((item, index) => (
          <div
            key={index}
            className={`grid cursor-pointer grid-cols-4 rounded-sm p-3 ${index === selectedStock && "bg-[#FFFFFF1F]"}`}
            onClick={() => onClick(index)}
          >
            <div className="w-full truncate font-semibold">{item.name}</div>
            <div className="w-full text-right">
              {item.currentPrice.toFixed(2)}
            </div>
            <Change change={item.dailyChange}></Change>
            <Percent percent={item.percentageChange}></Percent>
          </div>
        ))}
      </div>
      <div className="smallLaptop:h-fit smallLaptop:w-full h-full w-3/5">
        <TimeSeriesChart stock={marketItems[selectedStock]}></TimeSeriesChart>
      </div>
    </div>
  );
}
