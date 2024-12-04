import {render, screen, waitFor} from "@testing-library/react";
import {Avatar} from "src/component/avatar/Avatar";

const NAME = "SUPER USER";
const INITIALS = "SU";
const AVATAR_CY = "avatar";

describe("Image component", () => {
  beforeEach(() => {
    render(
      <Avatar
        alt={NAME}
        src={null}
        dataCy={AVATAR_CY}
      />,
    );
  });

  it("should render the image component correctly", () => {
    const avatar = screen.getByTestId(AVATAR_CY);
    expect(avatar).toBeVisible();
  });

  it("should contain initials", () => {
    const avatar = screen.getByTestId(AVATAR_CY).childNodes[0];
    waitFor(() => expect(avatar).toHaveTextContent(INITIALS));
  });
});
