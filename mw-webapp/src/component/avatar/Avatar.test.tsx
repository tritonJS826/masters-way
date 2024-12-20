import {render, screen, waitFor} from "@testing-library/react";
import {Avatar} from "src/component/avatar/Avatar";

const NAME = "SUPER USER";
const INITIALS = "SU";
const AVATAR_CY = "avatar";

describe("Avatar text component", () => {
  beforeEach(() => {
    render(
      <Avatar
        alt={NAME}
        src={null}
        dataCy={AVATAR_CY}
      />,
    );
  });

  it("should render the avatar text component correctly", () => {
    const avatar = screen.getByRole(AVATAR_CY);
    expect(avatar).toBeVisible();
  });

  it("should contain initials", async () => {
    await waitFor(() => {
      const avatar = screen.getByRole(AVATAR_CY);
      expect(avatar).toHaveTextContent(INITIALS);
    });
  });

  // TODO: avatar image rendering test
});
