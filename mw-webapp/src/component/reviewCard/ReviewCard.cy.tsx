import {ReviewCard} from "src/component/reviewCard/ReviewCard";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const REVIEW_CARD_CY = "review-card";
const REVIEW = "Haha";
const REVIEWER_IMAGE_URL = "src/assets/storybook-images/kittens.jpg";
const REVIEWER_NAME = "John";
const REVIEWER_PROFESSION = "React, TS mentor";

describe("ReviewCard component", () => {
  beforeEach(() => {
    cy.mount(
      <ReviewCard
        gradeAmount={5}
        review={REVIEW}
        reviewerImageUrl={REVIEWER_IMAGE_URL}
        reviewerName={REVIEWER_NAME}
        reviewerProfession={REVIEWER_PROFESSION}
        dataCy={REVIEW_CARD_CY}
      />,
    );
  });

  it("should display the correct content elements", () => {
    cy.get(getDataCy(REVIEW_CARD_CY)).contains(REVIEW);
    cy.get(getDataCy(REVIEW_CARD_CY)).contains(REVIEWER_NAME);
    cy.get(getDataCy(REVIEW_CARD_CY)).contains(REVIEWER_PROFESSION);
  });

});
