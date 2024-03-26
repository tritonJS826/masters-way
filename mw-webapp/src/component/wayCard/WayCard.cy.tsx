import {BrowserRouter} from "react-router-dom";
import {SchemasUserPlainResponse} from "src/apiAutogenerated";
import {WayCard} from "src/component/wayCard/WayCard";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {DateUtils} from "src/utils/DateUtils";

const USER_PREVIEW_DATA: SchemasUserPlainResponse = {
  uuid: "8l9tZl6gINP7j6BIT3p0yN9zZnH2",
  name: "Test Tester",
  email: "test.tester@gmail.com",
  description: "",
  createdAt: new Date().toISOString(),
  imageUrl: "",
  isMentor: false,
};

const MENTOR_PREVIEW_DATA: SchemasUserPlainResponse = {
  uuid: "8l9tZl6gINP7j6BIT3p0yN9zZnH2",
  name: "MENTOR",
  email: "test.tester@gmail.com",
  description: "",
  createdAt: new Date().toISOString(),
  imageUrl: "",
  isMentor: false,
};

const WAY_PREVIEW_DATA: WayPreview = {
  uuid: "123",
  name: "Test Way",
  owner: USER_PREVIEW_DATA,
  mentors: [MENTOR_PREVIEW_DATA],
  status: null,
  lastUpdate: new Date(),
  createdAt: new Date(),
  wayTags: [],
  copiedFromWayUuid: "",
  goalDescription: "Test goal description",
  estimationTime: 10,
  isPrivate: false,
  metrics: [],
  dayReportsAmount: 2,
  favoriteForUsers: 4,
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
    cy.get(getDataCy(WAY_CARD_CY)).contains(WAY_PREVIEW_DATA.owner.name);
    WAY_PREVIEW_DATA.mentors.forEach((mentor) => {
      cy.get(getDataCy(WAY_CARD_CY)).contains(mentor.name);
    });
    cy.get(getDataCy(WAY_CARD_CY)).contains(
      `${WAY_PREVIEW_DATA.dayReportsAmount}`,
    );
    cy.get(getDataCy(WAY_CARD_CY)).contains(
      `${WAY_PREVIEW_DATA.favoriteForUsers}`,
    );
    const creationDate = DateUtils.getShortISODateValue(
      WAY_PREVIEW_DATA.createdAt,
    );
    cy.get(getDataCy(WAY_CARD_CY)).contains(`Created: ${creationDate}`);
  });
});
