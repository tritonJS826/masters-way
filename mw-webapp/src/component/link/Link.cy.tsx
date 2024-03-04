import {BrowserRouter} from "react-router-dom";
import {Link} from "src/component/link/Link";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const LINK_CY = "link";
const LINK_PATH = "/home";
const LINK_VALUE = "Home";

describe("Title component", () => {

  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <Link
          dataCy={LINK_CY}
          path={LINK_PATH}
        >
          {LINK_VALUE}
        </Link>
      </BrowserRouter>
      ,
    );
  });

  it("should render value correctly", () => {
    cy.get(getDataCy(LINK_CY)).should("contains.text", LINK_VALUE);
  });

  it("should navigate to the correct URL on click", () => {
    const initialUrl = cy.url();
    cy.get(getDataCy(LINK_CY)).click();
    cy.url().should("not.equal", initialUrl);
    cy.url().should("include", LINK_PATH);
  });

});
