import { SectorPerformanceType } from "../../types/SectorPerformance";
import fmpInstance from "../fmpInstance";

export async function getSectorPerformance() : Promise<SectorPerformanceType[]>{
  try {
    const response = await fmpInstance.get("stock/sectors-performance");

    if (response.data && response.data.sectorPerformance) {
      const performance = response.data.sectorPerformance.map(
        (item: { sector: string; changesPercentage: string }) => ({
          sector: item.sector,
          performance: parseFloat(item.changesPercentage),
        }),
      );

      return performance;
    } else {
      console.error("Unexpected response structure:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching sector performance data:", error);
    return [];
  }
}
