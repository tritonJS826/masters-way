// Import logo from "src/assets/mastersWayLogo.svg";
import {Avatar} from "src/component/avatar/Avatar";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const NAME = "SUPER USER";
const INITIALS = "SU";
const AVATAR_CY = "avatar";

beforeEach(() => {
  cy.mount(
    <Avatar
      alt={NAME}
      src={null}
      dataCy={AVATAR_CY}
    />,
  );
});

describe("Image component", () => {
  it("should render image component correctly", () => {
    cy.get(getDataCy(AVATAR_CY)).should("be.visible");
  });

  it("should contain initials", () => {
    cy.get(getDataCy(AVATAR_CY)).contains(INITIALS);
  });
});
