import {AreaChart} from "src/component/chart/AreaChart";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const AREA_CHART_CY = "AreaChart";

const FIRST_TIME = 20;
const SECOND_TIME = 40;
const THIRD_TIME = 60;

const DATA: Map<string, number> = new Map([
  ["2024-01-01", FIRST_TIME],
  ["2024-01-02", SECOND_TIME],
  ["2024-01-03", THIRD_TIME],
]);

describe("AreaChart component", () => {
  beforeEach(() => {
    cy.mount(
      <AreaChart
        startDate={new Date("2024-01-01")}
        lastDate={new Date("2024-01-03")}
        datesWithJobTotalTime={DATA}
        dataCy={AREA_CHART_CY}
      />,
    );
  });

  it("should render AreaChart correctly", () => {
    cy.get(getDataCy(AREA_CHART_CY)).should("exist");
  });
});
