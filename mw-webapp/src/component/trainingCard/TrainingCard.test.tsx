import {act} from "react-dom/test-utils";
import {BrowserRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {TrainingCard} from "src/component/trainingCard/TrainingCard";
import {TrainingPreview, UserPreview} from "src/model/businessModelPreview/TrainingPreview";
import {pages} from "src/router/pages";
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
    render(
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

  it("should render trainingCard correctly", () => {
    expect(screen.getByTestId(TRAINING_CARD_CY)).toBeInTheDocument();
  });

  it("should navigate to training page on click", async () => {
    await act(async () => await userEvent.click(screen.getByTestId(TRAINING_CARD_CY)));
    expect(window.location.pathname).toBe(pages.training.getPath({uuid: TRAINING_PREVIEW_DATA.uuid}));
  });

  it("should display the correct content elements", () => {
    const card = screen.getByTestId(TRAINING_CARD_CY);
    expect(card).toHaveTextContent(TRAINING_PREVIEW_DATA.description);
    expect(card).toHaveTextContent(TRAINING_PREVIEW_DATA.name);
    expect(card).toHaveTextContent(`${TRAINING_PREVIEW_DATA.studentsAmount}`);
    expect(card).toHaveTextContent(`${TRAINING_PREVIEW_DATA.favoriteForUsersAmount}`);

    const creationDate = DateUtils.getShortISODotSplitted(
      TRAINING_PREVIEW_DATA.createdAt,
    );
    expect(card).toHaveTextContent(creationDate);
  });

  it("should display tags", () => {
    TRAINING_PREVIEW_DATA.trainingTags.map((tag) => {
      expect(screen.getByTestId(TRAINING_CARD_CY)).toHaveTextContent(tag.name);
    });
  });

});
