import {BrowserRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Footer} from "src/component/footer/Footer";
import {LOGO_TEXT} from "src/component/header/Header";
import {languageStore} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";

const FOOTER_CY = "footer";
const language = languageStore.language;

describe("Footer component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer
          dataCy={FOOTER_CY}
          language={language}
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

  it("All app stores buttons should be visible and open modal window on click", async () => {
    const buttons = screen.getAllByRole("button");
    for (let i = 0; i < buttons.length; i++) {
      expect(buttons[i]).toBeVisible();
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      await userEvent.click(buttons[i]);
      const modalDialog = screen.getByRole("dialog");
      expect(modalDialog).toBeVisible();
      await userEvent.click(screen.getByRole("button"));
      expect(modalDialog).not.toBeInTheDocument();
    }
  });

  it("All social media links should be visible", () => {
    const linkedInLabel = LanguageService.common.socialMediaAriaLabel.linkedIn[language];
    const linkedInLink = screen.getByRole("link", {name: linkedInLabel});
    expect(linkedInLink).toBeVisible();

    const youtubeLabel = LanguageService.common.socialMediaAriaLabel.youtube[language];
    const youtubeLink = screen.getByRole("link", {name: youtubeLabel});
    expect(youtubeLink).toBeVisible();

    const patreonLabel = LanguageService.common.socialMediaAriaLabel.patreon[language];
    const patreonLink = screen.getByRole("link", {name: patreonLabel});
    expect(patreonLink).toBeVisible();
  });

  it("Privacy policy link should be visible", () => {
    const privacyPolicyName = LanguageService.common.privacyPolicy[language];
    expect(screen.getByText(privacyPolicyName)).toBeVisible();
  });

});
