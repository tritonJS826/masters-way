import {AreaChart, ChartAreaPoint} from "src/component/chart/AreaChart";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const AREA_CHART_CY = "AreaChart";

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
    cy.mount(
      <AreaChart
        points={DATA}
        dataCy={AREA_CHART_CY}
      />,
    );
  });

  it("should render AreaChart", () => {
    cy.get(getDataCy(AREA_CHART_CY)).should("exist");
  });
});
