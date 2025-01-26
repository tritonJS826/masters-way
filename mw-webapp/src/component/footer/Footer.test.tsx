import {BrowserRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import {Footer} from "src/component/footer/Footer";
import {LOGO_TEXT} from "src/component/header/Header";
import {languageStore} from "src/globalStore/LanguageStore";

const FOOTER_CY = "footer";

describe("Footer", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer
          dataCy={FOOTER_CY}
          language={languageStore.language}
        />
      </BrowserRouter>,
    );
  });

  it("Alt text in logotype should be visible if source broken", () => {
    expect(screen.getByRole("img")).toHaveAttribute("alt", LOGO_TEXT);
  });

  it("Logotype image should be visible if source exists", () => {
    expect(screen.getByRole("img")).toBeVisible();
  });

});
