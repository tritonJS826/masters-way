import {BrowserRouter} from "react-router-dom";
import {UserCard} from "src/component/userCard/UserCard";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {pages} from "src/router/pages";
import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {DateUtils} from "src/utils/DateUtils";

const USER_TAGS = [{uuid: "6fjhve64", name: "tag1"}, {uuid: "kgrnk853", name: "tag2"}];

const USER_PREVIEW_DATA: UserNotSaturatedWay = {
  uuid: "8l9tZl6gINP7j6BIT3p0yN9zZnH2",
  name: "Test Tester",
  email: "test.tester@gmail.com",
  description: "",
  createdAt: new Date(),
  favoriteUserUuids: [],
  favoriteForUsers: 2,
  tags: USER_TAGS,
  imageUrl: "",
  isMentor: false,
  favoriteWays: 4,
  mentoringWays: 7,
  ownWays: 12,
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

  it("should display the correct content elements", () => {
    cy.get(getDataCy(USER_CARD_CY)).contains(USER_PREVIEW_DATA.name);
    cy.get(getDataCy(USER_CARD_CY)).contains(
      `Own (${USER_PREVIEW_DATA.ownWays})`,
    );
    cy.get(getDataCy(USER_CARD_CY)).contains(
      `Favorite (${USER_PREVIEW_DATA.favoriteWays})`,
    );
    cy.get(getDataCy(USER_CARD_CY)).contains(
      `Mentoring (${USER_PREVIEW_DATA.mentoringWays})`,
    );
    cy.get(getDataCy(USER_CARD_CY)).contains(
      `${USER_PREVIEW_DATA.favoriteForUsers}`,
    );
    const creationDate = DateUtils.getShortISODotSplitted(
      USER_PREVIEW_DATA.createdAt,
    );
    cy.get(getDataCy(USER_CARD_CY)).contains(creationDate);
  });

  it("should display tags", () => {
    USER_TAGS.map((tag) => {
      cy.get(getDataCy(USER_CARD_CY)).contains(tag.name);
    });
  });
});
