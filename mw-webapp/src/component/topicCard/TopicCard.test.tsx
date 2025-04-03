import {act} from "react-dom/test-utils";
import {BrowserRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {TopicCard} from "src/component/topicCard/TopicCard";
import {TopicPreview} from "src/model/businessModelPreview/TopicPreview";
import {pages} from "src/router/pages";

const TOPIC_PREVIEW_DATA: TopicPreview = {
  uuid: "123",
  name: "Test Way",
  order: 2,
  parentUuid: null,
  children: [],
  createdAt: new Date(),
  practiceMaterialAmount: 100,
  theoryMaterialAmount: 5,
  trainingUuid: "8l9tZl6gINP7j6BIT3p0yN9zZnH2",

  /**
   * Update topic's name
   */
  updateName: () => {},
};

describe("TrainingCard component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <TopicCard
          trainingUuid="8l9tZl6gINP7j6BIT3p0yN9zZnH2"
          topic={TOPIC_PREVIEW_DATA}
          createdAtText="TopicCard text"
          theoryMaterialTooltip="Theory Material Tooltip"
          practiceMaterialTooltip="Practice Material Tooltip"
          externalLinkTooltip="External Material Tooltip"
          emptyTitle=" "
          isEditable={false}
        />
      </BrowserRouter>,
    );
  });

  it("should render trainingCard correctly", () => {
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("should navigate to training page on click", async () => {
    await act(async () => await userEvent.click(screen.getByRole("link")));
    expect(window.location.pathname).toBe(pages.topic.getPath({
      trainingUuid: TOPIC_PREVIEW_DATA.trainingUuid,
      topicUuid: TOPIC_PREVIEW_DATA.uuid,
    }));
  });

  it("should display the correct content elements", () => {
    const topic = screen.getByRole("link");
    expect(topic).toHaveTextContent(TOPIC_PREVIEW_DATA.name);
    expect(topic).toHaveTextContent(`${TOPIC_PREVIEW_DATA.practiceMaterialAmount}`);
    expect(topic).toHaveTextContent(`${TOPIC_PREVIEW_DATA.theoryMaterialAmount}`);
  });

});
