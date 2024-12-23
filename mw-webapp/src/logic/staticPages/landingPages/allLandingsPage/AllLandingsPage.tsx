import {observer} from "mobx-react-lite";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {FooterLanding} from "src/logic/staticPages/landingPages/footerLanding/FooterLanding";
import {HeaderLanding} from "src/logic/staticPages/landingPages/headerLanding/HeaderLanding";
import {pages} from "src/router/pages";
import styles from "src/logic/staticPages/landingPages/allLandingsPage/AllLandingsPage.module.scss";

/**
 * Main landing page with all landings
 */
export const LandingsPage = observer(() => {
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
        <Link path={pages.landingStudentsWithMentors.getPath({})}>
          Landing page for students with mentors
        </Link>
        <Link path={pages.landingStudentsWithAI.getPath({})}>
          Landing page for students with ai
        </Link>
        <Link path={pages.landingBusiness.getPath({})}>
          Landing page for companies
        </Link>
      </VerticalContainer>
      <FooterLanding language={language} />
    </>
  );
});
