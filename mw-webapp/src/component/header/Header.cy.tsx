
import {BrowserRouter} from "react-router-dom";
import {Header, LOGO_TEXT} from "src/component/header/Header";
import {
  DEFAULT_NOTIFICATION_SETTINGS,
  globalContext,
} from "src/GlobalContext";
import {getDataCy} from "src/utils/cyTesting/getDataCy";
import {LanguageWorker} from "src/utils/LanguageWorker";
import {ThemeWorker} from "src/utils/ThemeWorker";

const HEADER_CY = "header";

/**
 *Header test component
 */
const HeaderTest = () => {
  const userPreview = {
    uuid: "8l9tZl6gINP7j6BIT3p0yN9zZnH2",
    name: "Test Tester",
    email: "test.tester@gmail.com",
    description: "",
    ownWays: [],
    favoriteWays: [],
    mentoringWays: [],
    createdAt: new Date(),
    customWayCollections: [],
    favoriteForUserUuids: [],
    favoriteUserUuids: [],
    tags: [],
    wayRequests: [],
    imageUrl: "",
    isMentor: false,
    wayCollections: [],
  };

  return (
    <globalContext.Provider value={{
      user: userPreview,

      /**
       *SetUser
       */
      setUser: () => {},
      isInitialized: true,

      /**
       *SetIsInitialized
       */
      setIsInitialized: () => {},
      notification: DEFAULT_NOTIFICATION_SETTINGS,
      theme: ThemeWorker.getCurrentTheme(),

      /**
       *SetTheme
       */
      setTheme: () => {},
      language: LanguageWorker.getCurrentLanguage(),

      /**
       *SetLanguage
       */
      setLanguage: () => {},
    }}
    >
      <BrowserRouter>
        <Header dataCy={HEADER_CY} />
      </BrowserRouter>
    </globalContext.Provider>
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
