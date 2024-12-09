import {render, screen} from "@testing-library/react";
import {AreaChart, ChartAreaPoint} from "src/component/chart/AreaChart";

const FIRST_TIME = 20;
const SECOND_TIME = 40;
const THIRD_TIME = 60;

const DATA: ChartAreaPoint[] = [
  {date: new Date("2024-01-01"), value: FIRST_TIME},
  {date: new Date("2024-01-02"), value: SECOND_TIME},
  {date: new Date("2024-01-03"), value: THIRD_TIME},
];

describe("AreaChart component", () => {
  beforeEach(() => {
    render(
      <AreaChart points={DATA} />,
    );
  });

  it("should render AreaChart", () => {
    const areaChart = screen.getByRole("img");
    expect(areaChart).toBeVisible();
  });
});
