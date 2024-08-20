import {Outlet} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Footer} from "src/component/footer/Footer";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {HeaderLanding} from "src/logic/landingPages/headerLanding/HeaderLanding";
import styles from "src/logic/landingPages/LandingLayout.module.scss";

/**
 * About project page
 */
export const LandingLayout = observer(() => {
  const {language, setLanguage} = languageStore;
  const {theme, setTheme} = themeStore;

  return (
    <VerticalContainer className={styles.landingContainer}>
      <HeaderLanding
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />
      <Outlet />
      <Footer language={language} />
    </VerticalContainer>
  );
});
