
import {BrowserRouter} from "react-router-dom";
import {Header, LOGO_TEXT} from "src/component/header/Header";
import {testUserPreview} from "src/component/header/testUserPreview";
import {getNextSwitchTheme} from "src/component/themeSwitcher/ThemeSwitcher";
import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {LanguageWorker} from "src/utils/LanguageWorker";
import {ThemeWorker} from "src/utils/ThemeWorker";

const HEADER_CY = "header";

/**
 *Header test component
 */
const HeaderTest = () => {

  return (
    <BrowserRouter>
      <Header
        dataCy={HEADER_CY}
        user={testUserPreview}
        setLanguage={() => {}}
        language={LanguageWorker.getCurrentLanguage()}
        currentTheme={ThemeWorker.getCurrentTheme()}
        setTheme={() => ThemeWorker.setTheme(getNextSwitchTheme(ThemeWorker.getCurrentTheme()))}
      />
    </BrowserRouter>
  );
};

describe("Header component", () => {
  beforeEach(() => {
    cy.mount(
      <HeaderTest />,
    );
  });

  it("Alt text in logotype shout be  visible if source broken", () => {
    cy.get(getDataCy(HEADER_CY)).find("img").should("have.attr", "alt", LOGO_TEXT);
  });

  it("Logotype image shout be visible if source exists", () => {
    cy.get(getDataCy(HEADER_CY)).find("img").should("be.visible");
  });

});
