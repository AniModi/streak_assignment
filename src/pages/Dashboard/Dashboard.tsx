import MarketList from "../../components/MarketList/MarketList";
import MarketSummary from "../../components/MarketSummary/MarketSummary";
import SectorPerformance from "../../components/SectorPerformance/SectorPerformance";

export default function Dashboard() {
  return (
    <div className="bg-background-medium flex h-full w-full flex-col p-10 gap-5 mobile:p-5 text-white">
      <div className="mobile:flex-col flex gap-5 rounded-sm">
        <div className="mobile:w-full min-h-[350px] w-2/5">
          <MarketSummary></MarketSummary>
        </div>
        <div className="mobile:w-full min-h-[350px] w-3/5">
          <SectorPerformance></SectorPerformance>
        </div>
      </div>
      <div className="text-transparent-white text-2xl">
        Markets
      </div>
      <div className="w-full">
        <MarketList></MarketList>
      </div>
    </div>
  );
}
