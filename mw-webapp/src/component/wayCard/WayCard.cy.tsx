import {BrowserRouter} from "react-router-dom";
import {WayCard} from "src/component/wayCard/WayCard";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {DateUtils} from "src/utils/DateUtils";

const USER_PREVIEW_DATA: UserPreview = {
  uuid: "8l9tZl6gINP7j6BIT3p0yN9zZnH2",
  name: "Test Tester",
  email: "test.tester@gmail.com",
  description: "",
  ownWays: [],
  favoriteWays: [],
  mentoringWays: [],
  createdAt: new Date(),
  customWayCollections: [],
  favoriteForUserUuids: [],
  favoriteUserUuids: [],
  tags: [],
  wayRequests: [],
  imageUrl: "",
  isMentor: false,
};

const MENTOR_PREVIEW_DATA: UserPreview = {
  uuid: "8l9tZl6gINP7j6BIT3p0yN9zZnH2",
  name: "MENTOR",
  email: "test.tester@gmail.com",
  description: "",
  ownWays: [],
  favoriteWays: [],
  mentoringWays: [],
  createdAt: new Date(),
  customWayCollections: [],
  favoriteForUserUuids: [],
  favoriteUserUuids: [],
  tags: [],
  wayRequests: [],
  imageUrl: "",
  isMentor: false,
};

const WAY_PREVIEW_DATA: WayPreview = {
  uuid: "123",
  name: "Test Way",
  dayReportUuids: ["1", "2", "3"],
  owner: USER_PREVIEW_DATA,
  mentors: [MENTOR_PREVIEW_DATA],
  formerMentorUuids: [],
  mentorRequests: [],
  status: null,
  lastUpdate: new Date(),
  favoriteForUserUuids: ["1", "2", "3", "4"],
  createdAt: new Date(),
  wayTags: [],
  jobTags: [],
  copiedFromWayUuid: "",
  goalDescription: "Test goal description",
  estimationTime: 10,
  metricsStringified: [],
  isPrivate: false,
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

  it("should display the correct goal description", () => {
    cy.get(getDataCy(WAY_CARD_CY)).contains(WAY_PREVIEW_DATA.goalDescription);
  });

  it("should display the correct way name", () => {
    cy.get(getDataCy(WAY_CARD_CY)).contains(WAY_PREVIEW_DATA.name);
  });

  it("should display the correct number of reports", () => {
    cy.get(getDataCy(WAY_CARD_CY)).contains(
      `${WAY_PREVIEW_DATA.dayReportUuids.length}`,
    );
  });

  it("should display the correct number of likes", () => {
    cy.get(getDataCy(WAY_CARD_CY)).contains(
      `${WAY_PREVIEW_DATA.favoriteForUserUuids.length}`,
    );
  });

  it("should display mentors correctly", () => {
    WAY_PREVIEW_DATA.mentors.forEach((mentor) => {
      cy.get(getDataCy(WAY_CARD_CY)).contains(mentor.name);
    });
  });

  it("should display the correct creation date", () => {
    const creationDate = DateUtils.getShortISODateValue(
      WAY_PREVIEW_DATA.createdAt,
    );
    cy.get(getDataCy(WAY_CARD_CY)).contains(`Created: ${creationDate}`);
  });

  it("should display the correct owner name", () => {
    cy.get(getDataCy(WAY_CARD_CY)).contains(WAY_PREVIEW_DATA.owner.name);
  });
});
