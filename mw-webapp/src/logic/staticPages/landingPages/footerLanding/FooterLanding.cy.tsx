import {BrowserRouter} from "react-router-dom";
import {Footer} from "src/component/footer/Footer";
import {LOGO_TEXT} from "src/component/header/Header";
import {languageStore} from "src/globalStore/LanguageStore";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const FOOTER_CY = "footer";

describe("Footer component", () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <Footer
          dataCy={FOOTER_CY}
          language={languageStore.language}
        />
      </BrowserRouter>,
    );
  });

  it("Alt text in logotype should be  visible if source broken", () => {
    cy.get(getDataCy(FOOTER_CY)).find("img").should("have.attr", "alt", LOGO_TEXT);
  });

  it("Logotype image should be visible if source exists", () => {
    cy.get(getDataCy(FOOTER_CY)).find("img").should("be.visible");
  });

});
