import {BrowserRouter} from "react-router-dom";
import Sinon from "cypress/types/sinon";
import {Header, LOGO_TEXT} from "src/component/header/Header";
import {testUserPreview} from "src/component/header/testUserPreview";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const HEADER_CY = "header";

describe("Header component", () => {
  let STUB_FUNCTION_SET_LANGUAGE: Cypress.Agent<Sinon.SinonSpy>;
  let STUB_FUNCTION_SET_THEME: Cypress.Agent<Sinon.SinonSpy>;

  beforeEach(() => {
    STUB_FUNCTION_SET_LANGUAGE = cy.spy();
    STUB_FUNCTION_SET_THEME = cy.spy();
    cy.mount(
      <BrowserRouter>
        <Header
          dataCy={HEADER_CY}
          user={testUserPreview}
          clearUser={() => {}}
          setLanguage={STUB_FUNCTION_SET_LANGUAGE}
          language={languageStore.language}
          theme={themeStore.theme}
          setTheme={STUB_FUNCTION_SET_THEME}
        />
      </BrowserRouter>,
    );
  });

  it("Alt text in logotype shout be  visible if source broken", () => {
    cy.get(getDataCy(HEADER_CY)).find("img").should("have.attr", "alt", LOGO_TEXT);
  });

  it("Logotype image shout be visible if source exists", () => {
    cy.get(getDataCy(HEADER_CY)).find("img").should("be.visible");
  });

  it("setLanguage and setTheme functions should be called", () => {
    cy.get(getDataCy(HEADER_CY)).find("[class*='themeSwitcher']").click();
    cy.wrap(STUB_FUNCTION_SET_THEME).should("have.been.called");
    cy.get(getDataCy(HEADER_CY)).find("[class*='SelectTrigger']").click();
    cy.get("[id*='radix']").last().click();
    cy.wrap(STUB_FUNCTION_SET_LANGUAGE).should("have.been.called");
  });

});
