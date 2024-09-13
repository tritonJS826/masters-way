import {observer} from "mobx-react-lite";
import {Footer} from "src/component/footer/Footer";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {HeaderLanding} from "src/land/headerLanding/HeaderLanding";
import {pages} from "src/router/pages";
import styles from "src/land/landingPage/LandingPage.module.scss";

/**
 * Main landing page
 */
export const LandingPage = observer(() => {
  const {language, setLanguage} = languageStore;
  const {theme, setTheme} = themeStore;

  return (
    <>
      <HeaderLanding
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        navList={[]}
      />
      <VerticalContainer className={styles.landingList}>
        <Title
          level={HeadingLevel.h1}
          text="List of the landings"
          placeholder=""
        />
        <Link path={pages.landingMentors.getPath({})}>
          Landing page for mentors
        </Link>
      </VerticalContainer>
      <Footer language={language} />
    </>
  );
});
