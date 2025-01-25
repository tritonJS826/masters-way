import {render, screen} from "@testing-library/react";
import logo from "src/assets/mastersWayLogo.svg";
import logoLight from "src/assets/mastersWayLogoLight.svg";
import {getMapThemeSources, ThemedImage} from "src/component/themedImage/ThemedImage";
import {Theme} from "src/globalStore/ThemeStore";

const THEMED_IMAGE = "themed-image";
const THEMED_IMAGE_NAME = "image-name";
const INVALID_THEME = "INVALID_THEME" as Theme;

const testSources = {
  [Theme.DARK]: logoLight,
  [Theme.LIGHT]: logo,
  [Theme.OBSIDIAN]: logoLight,
};

const sourcesMap = getMapThemeSources(testSources);

/**
 * Render ThemedImage component
 */
const renderThemedImage = (theme: Theme = Theme.DARK) => {
  render(
    <ThemedImage
      sources={sourcesMap}
      theme={theme}
      name={THEMED_IMAGE_NAME}
      dataCy={THEMED_IMAGE}
    />,
  );
};

describe("ThemedImage component", () => {
  it("should render the ThemedImage component", () => {
    renderThemedImage();
    const themedImage = screen.getByTestId(THEMED_IMAGE);

    expect(themedImage).toBeInTheDocument();
  });

  it("should render the correct image for the DARK theme", () => {
    renderThemedImage(Theme.DARK);
    const themedImage = screen.getByTestId(THEMED_IMAGE);

    expect(themedImage).toBeTruthy();
    expect(themedImage).toHaveAttribute("src", testSources[Theme.DARK]);
  });

  it("should render the correct image for the LIGHT theme", () => {
    renderThemedImage(Theme.LIGHT);
    const themedImage = screen.getByTestId(THEMED_IMAGE);

    expect(themedImage).toBeTruthy();
    expect(themedImage).toHaveAttribute("src", testSources[Theme.LIGHT]);
  });

  it("should set the alt attribute correctly", () => {
    renderThemedImage();
    const themedImage = screen.getByTestId(THEMED_IMAGE);

    expect(themedImage).toHaveAttribute("alt", THEMED_IMAGE_NAME);
  });

  it("should render with alt text even if theme does not match sources", () => {
    renderThemedImage(INVALID_THEME);
    const themedImage = screen.getByAltText(THEMED_IMAGE_NAME);

    expect(themedImage).toBeInTheDocument();
  });
});
