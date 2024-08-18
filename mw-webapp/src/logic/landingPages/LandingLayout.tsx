import {Outlet} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Footer} from "src/component/footer/Footer";
import {languageStore} from "src/globalStore/LanguageStore";
import {HeaderLanding} from "src/logic/landingPages/headerLanding/HeaderLanding";

/**
 * About project page
 */
export const LandingLayout = observer(() => {
  const {language} = languageStore;

  return (
    <>
      <HeaderLanding language={language} />
      <Outlet />
      <Footer language={language} />
    </>
  );
});
