import { ChartAreaStacked } from "./components/ArearChart";
import { ChartLineMultiple } from "./components/LineChart";
import { ChartPieLabel } from "./components/PieChart";
import { ChartRadarDots } from "./components/RadarChart";
import { SectionCards } from "./components/SectionCards";

export default function Home() {
  return (
    <div className="mt-16">
      <SectionCards />
      <ChartAreaStacked />
      {/* <div className="flex items-start gap-8 mt-16">
        <div className="w-full">
          <ChartPieLabel />
        </div>
        <div className="w-full">
        </div>
        <div className="w-full">
          <ChartRadarDots />
        </div>
      </div> */}
    </div>
  );
}
