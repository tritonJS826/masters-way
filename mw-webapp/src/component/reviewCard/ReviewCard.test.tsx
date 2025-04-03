import {render, screen} from "@testing-library/react";
import {ReviewCard} from "src/component/reviewCard/ReviewCard";

const REVIEW_CARD_CY = "review-card";
const REVIEW = "Haha";
const REVIEWER_IMAGE_URL = "src/assets/storybook-images/kittens.jpg";
const REVIEWER_NAME = "John";
const REVIEWER_PROFESSION = "React, TS mentor";

describe("ReviewCard component", () => {
  beforeEach(() => {
    render(
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
    const card = screen.getByTestId(REVIEW_CARD_CY);
    expect(card).toHaveTextContent(REVIEW);
    expect(card).toHaveTextContent(REVIEWER_NAME);
    expect(card).toHaveTextContent(REVIEWER_PROFESSION);
  });

});
