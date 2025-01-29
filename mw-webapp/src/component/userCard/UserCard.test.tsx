import {act} from "react-dom/test-utils";
import {BrowserRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {UserCard} from "src/component/userCard/UserCard";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {pages} from "src/router/pages";
import {DateUtils} from "src/utils/DateUtils";

const USER_TAGS = [
  {uuid: "6fjhve64", name: "tag1"},
  {uuid: "kgrnk853", name: "tag2"},
];

const USER_PREVIEW_DATA: UserNotSaturatedWay = {
  uuid: "8l9tZl6gINP7j6BIT3p0yN9zZnH2",
  name: "Test Tester",
  email: "test.tester@gmail.com",
  description: "",
  createdAt: new Date(),
  favoriteForUsers: 2,
  tags: USER_TAGS,
  imageUrl: "",
  isMentor: false,
  favoriteWays: 4,
  mentoringWays: 7,
  ownWays: 12,
};

const USER_CARD = "user-card";

describe("UserCard component", () => {

  /**
   * Render user card
   */
  const renderUserCard = () => {
    render(
      <BrowserRouter>
        <UserCard
          userPreview={USER_PREVIEW_DATA}
          dataCy={USER_CARD}
        />
      </BrowserRouter>,
    );
  };

  it("should navigate to user profile on click", async () => {
    const user = userEvent.setup();
    renderUserCard();

    const userCard = screen.getByTestId(USER_CARD);

    expect(userCard).toBeInTheDocument();

    await act(async () => {
      await user.click(userCard);
    });

    expect(window.location.pathname).toBe(
      pages.user.getPath({uuid: USER_PREVIEW_DATA.uuid}),
    );
  });

  it("should render userCard correctly", () => {
    renderUserCard();

    const userCard = screen.getByTestId(USER_CARD);

    expect(userCard).toBeInTheDocument();
  });

  it("should display the correct content elements", () => {
    renderUserCard();

    const userCard = screen.getByTestId(USER_CARD);

    expect(userCard).toHaveTextContent(USER_PREVIEW_DATA.name);
    expect(userCard).toHaveTextContent(`Own (${USER_PREVIEW_DATA.ownWays})`);
    expect(userCard).toHaveTextContent(
      `Favorite (${USER_PREVIEW_DATA.favoriteWays})`,
    );
    expect(userCard).toHaveTextContent(
      `Mentoring (${USER_PREVIEW_DATA.mentoringWays})`,
    );
    expect(userCard).toHaveTextContent(`${USER_PREVIEW_DATA.favoriteForUsers}`);
    expect(userCard).toHaveTextContent(
      DateUtils.getShortISODotSplitted(USER_PREVIEW_DATA.createdAt),
    );
  });

  it("should display tags", () => {
    renderUserCard();

    USER_TAGS.forEach((tag) => {
      expect(screen.getByTestId(USER_CARD)).toHaveTextContent(tag.name);
    });
  });
});
