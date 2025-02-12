import {BrowserRouter} from "react-router-dom";
import {TrainingCard} from "src/component/trainingCard/TrainingCard";
import {TrainingPreview, UserPreview} from "src/model/businessModelPreview/TrainingPreview";
import {pages} from "src/router/pages";
import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {DateUtils} from "src/utils/DateUtils";

const USER_PREVIEW_DATA: UserPreview = {
  uuid: "8l9tZl6gINP7j6BIT3p0yN9zZnH2",
  name: "Test Tester",
  imageUrl: "",
};

const MENTOR_PREVIEW_DATA: UserPreview = {
  uuid: "8l9tZl6gINP7j6BIT3p0yN9zZnH2",
  name: "MENTOR",
  imageUrl: "",
};

const TRAINING_PREVIEW_DATA: TrainingPreview = {
  uuid: "123",
  name: "Test Way",
  owner: USER_PREVIEW_DATA,
  mentors: [MENTOR_PREVIEW_DATA],
  updatedAt: new Date(),
  createdAt: new Date(),
  trainingTags: [],
  description: "Test training description",
  isPrivate: false,
  favoriteForUsersAmount: 4,
  studentsAmount: 1,
  topicsAmount: 3,
};

const TRAINING_CARD_CY = "training-card";

describe("TrainingCard component", () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <TrainingCard
          trainingPreview={TRAINING_PREVIEW_DATA}
          createdAtTooltip="Created at:"
          likesTooltip="Likes amount:"
          mentorsText="Mentors:"
          studentsTooltip="Students amount:"
          updatedAtTooltip="Updated at:"
          dataCy={TRAINING_CARD_CY}
        />
      </BrowserRouter>,
    );
  });

  it("should navigate to training page on click", () => {
    cy.get(getDataCy(TRAINING_CARD_CY)).click();
    cy.url().should(
      "eq",
      Cypress.config().baseUrl +
        pages.training.getPath({uuid: TRAINING_PREVIEW_DATA.uuid}),
    );
  });

  it("should render trainingCard correctly", () => {
    cy.get(getDataCy(TRAINING_CARD_CY)).should("exist");
  });

  it("should display the correct content elements", () => {
    cy.get(getDataCy(TRAINING_CARD_CY)).contains(TRAINING_PREVIEW_DATA.description);
    cy.get(getDataCy(TRAINING_CARD_CY)).contains(TRAINING_PREVIEW_DATA.name);
    cy.get(getDataCy(TRAINING_CARD_CY)).contains(
      `${TRAINING_PREVIEW_DATA.studentsAmount}`,
    );
    cy.get(getDataCy(TRAINING_CARD_CY)).contains(
      `${TRAINING_PREVIEW_DATA.favoriteForUsersAmount}`,
    );
    const creationDate = DateUtils.getShortISODotSplitted(
      TRAINING_PREVIEW_DATA.createdAt,
    );
    cy.get(getDataCy(TRAINING_CARD_CY)).contains(creationDate);
  });

  it("should display tags", () => {
    TRAINING_PREVIEW_DATA.trainingTags.map((tag) => {
      cy.get(getDataCy(TRAINING_CARD_CY)).contains(tag.name);
    });
  });
});
