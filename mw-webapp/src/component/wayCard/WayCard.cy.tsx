import {BrowserRouter} from "react-router-dom";
import {WayCard} from "src/component/wayCard/WayCard";
import {WayStatus} from "src/logic/waysTable/wayStatus";
import {UserPlain} from "src/model/businessModel/User";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {DateUtils} from "src/utils/DateUtils";

const USER_PREVIEW_DATA: UserPlain = {
  uuid: "8l9tZl6gINP7j6BIT3p0yN9zZnH2",
  name: "Test Tester",
  email: "test.tester@gmail.com",
  description: "",
  createdAt: new Date(),
  imageUrl: "",
  isMentor: false,
};

const MENTOR_PREVIEW_DATA: UserPlain = {
  uuid: "8l9tZl6gINP7j6BIT3p0yN9zZnH2",
  name: "MENTOR",
  email: "test.tester@gmail.com",
  description: "",
  createdAt: new Date(),
  imageUrl: "",
  isMentor: false,
};

const WAY_PREVIEW_DATA: WayPreview = {
  uuid: "123",
  name: "Test Way",
  owner: USER_PREVIEW_DATA,
  mentors: [MENTOR_PREVIEW_DATA],
  status: WayStatus.inProgress,
  lastUpdate: new Date(),
  createdAt: new Date(),
  wayTags: [],
  copiedFromWayUuid: "",
  goalDescription: "Test goal description",
  estimationTime: 10,
  isPrivate: false,
  metricsDone: 3,
  metricsTotal: 5,
  dayReportsAmount: 2,
  favoriteForUsers: 4,
  childrenUuids: [],
};

const WAY_CARD_CY = "way-card";

describe("WayCard component", () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <WayCard
          wayPreview={WAY_PREVIEW_DATA}
          dataCy={WAY_CARD_CY}
        />
      </BrowserRouter>,
    );
  });

  it("should navigate to way page on click", () => {
    cy.get(getDataCy(WAY_CARD_CY)).click();
    cy.url().should(
      "eq",
      Cypress.config().baseUrl +
        pages.way.getPath({uuid: WAY_PREVIEW_DATA.uuid}),
    );
  });

  it("should render wayCard correctly", () => {
    cy.get(getDataCy(WAY_CARD_CY)).should("exist");
  });

  it("should display the correct content elements", () => {
    cy.get(getDataCy(WAY_CARD_CY)).contains(WAY_PREVIEW_DATA.goalDescription);
    cy.get(getDataCy(WAY_CARD_CY)).contains(WAY_PREVIEW_DATA.name);
    cy.get(getDataCy(WAY_CARD_CY)).contains(
      `${WAY_PREVIEW_DATA.dayReportsAmount}`,
    );
    cy.get(getDataCy(WAY_CARD_CY)).contains(
      `${WAY_PREVIEW_DATA.favoriteForUsers}`,
    );
    const creationDate = DateUtils.getShortISODotSplitted(
      WAY_PREVIEW_DATA.createdAt,
    );
    cy.get(getDataCy(WAY_CARD_CY)).contains(creationDate);
  });

  it("should display tags", () => {
    WAY_PREVIEW_DATA.wayTags.map((tag) => {
      cy.get(getDataCy(WAY_CARD_CY)).contains(tag.name);
    });
  });
});
