import {BrowserRouter} from "react-router-dom";
import {UserCard} from "src/component/userCard/UserCard";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {DateUtils} from "src/utils/DateUtils";

const USER_PREVIEW_DATA: UserPreview = {
  uuid: "8l9tZl6gINP7j6BIT3p0yN9zZnH2",
  name: "Test Tester",
  email: "test.tester@gmail.com",
  description: "",
  ownWays: ["1"],
  favoriteWays: ["1", "2", "3"],
  mentoringWays: ["1", "2"],
  createdAt: new Date(),
  customWayCollections: [],
  favoriteForUserUuids: ["1", "2", "3"],
  favoriteUserUuids: [],
  tags: [],
  wayRequests: [],
  imageUrl: "",
  isMentor: false,
};

const USER_CARD_CY = "user-card";

describe("UserCard component", () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <UserCard
          userPreview={USER_PREVIEW_DATA}
          dataCy={USER_CARD_CY}
        />
      </BrowserRouter>,
    );
  });

  it("should navigate to user profile on click", () => {
    cy.get(getDataCy(USER_CARD_CY)).click();
    cy.url().should(
      "eq",
      Cypress.config().baseUrl +
        pages.user.getPath({uuid: USER_PREVIEW_DATA.uuid}),
    );
  });

  it("should render userCard correctly", () => {
    cy.get(getDataCy(USER_CARD_CY)).should("exist");
  });

  it("should display the correctcontent elements", () => {
    cy.get(getDataCy(USER_CARD_CY)).contains(USER_PREVIEW_DATA.name);
    cy.get(getDataCy(USER_CARD_CY)).contains(USER_PREVIEW_DATA.email);
    cy.get(getDataCy(USER_CARD_CY)).contains(
      `${USER_PREVIEW_DATA.ownWays.length} own ways`,
    );
    cy.get(getDataCy(USER_CARD_CY)).contains(
      `${USER_PREVIEW_DATA.favoriteWays.length} favorite ways`,
    );
    cy.get(getDataCy(USER_CARD_CY)).contains(
      `${USER_PREVIEW_DATA.mentoringWays.length} mentoring ways`,
    );
    cy.get(getDataCy(USER_CARD_CY)).contains(
      `${USER_PREVIEW_DATA.favoriteForUserUuids.length}`,
    );
    const creationDate = DateUtils.getShortISODateValue(
      USER_PREVIEW_DATA.createdAt,
    );
    cy.get(getDataCy(USER_CARD_CY)).contains(`Created at ${creationDate}`);
  });
});
