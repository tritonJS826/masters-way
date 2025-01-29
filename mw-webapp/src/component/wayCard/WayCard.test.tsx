import {act} from "react-dom/test-utils";
import {BrowserRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {WayCard} from "src/component/wayCard/WayCard";
import {WayStatus} from "src/logic/waysTable/wayStatus";
import {UserPlain} from "src/model/businessModel/User";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {DateUtils} from "src/utils/DateUtils";
import {describe, expect, it} from "vitest";

const WAY_CARD = "way-card";

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

/**
 * Render WayCard
 */
const renderWayCard = () =>
  render(
    <BrowserRouter>
      <WayCard
        wayPreview={WAY_PREVIEW_DATA}
        dataCy={WAY_CARD}
      />
    </BrowserRouter>,
  );

describe("WayCard component", () => {
  it("should navigate to way page on click", async () => {
    renderWayCard();
    const user = userEvent.setup();

    const wayCard = screen.getByTestId(WAY_CARD);
    await act(async () => {
      await user.click(wayCard);
    });

    expect(window.location.pathname).toBe(
      pages.way.getPath({uuid: WAY_PREVIEW_DATA.uuid}),
    );
  });

  it("should display the correct content elements", () => {
    renderWayCard();

    const wayCard = screen.getByTestId(WAY_CARD);

    expect(wayCard).toHaveTextContent(WAY_PREVIEW_DATA.name);
    expect(wayCard).toHaveTextContent(WAY_PREVIEW_DATA.goalDescription);
    expect(wayCard).toHaveTextContent(WAY_PREVIEW_DATA.dayReportsAmount.toString());
    expect(wayCard).toHaveTextContent(WAY_PREVIEW_DATA.favoriteForUsers.toString());
    expect(wayCard).toHaveTextContent(
      DateUtils.getShortISODotSplitted(WAY_PREVIEW_DATA.createdAt),
    );
  });

  it("should display tags", () => {
    renderWayCard();

    WAY_PREVIEW_DATA.wayTags.forEach((tag) => {
      expect(screen.getByTestId(WAY_CARD)).toHaveTextContent(tag.name);
    });
  });
});
