import {PieChart} from "src/component/chart/PieChart";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const PIE_CHART_CY = "PieChart";

const DATA: JobTagStat[] = [
  {
    totalAmount: 1,
    totalAmountPercentage: 1,
    totalTime: 1,
    totalTimePercentage: 1,
    jobTag: {
      uuid: "1",
      name: "example 1",
      description: "example 1",
      color: "#111",
    },
  },
  {
    totalAmount: 2,
    totalAmountPercentage: 1,
    totalTime: 1,
    totalTimePercentage: 1,
    jobTag: {
      uuid: "2",
      name: "example 2",
      description: "example 2",
      color: "#666",
    },
  },
];

describe("PieChart component", () => {
  beforeEach(() => {
    cy.mount(
      <PieChart
        startDate={new Date()}
        lastDate={new Date()}
        tagStats={DATA}
        dataCy={PIE_CHART_CY}
      />,
    );
  });

  it("should render PieChart correctly", () => {
    cy.get(getDataCy(PIE_CHART_CY)).should("exist");
  });
});
