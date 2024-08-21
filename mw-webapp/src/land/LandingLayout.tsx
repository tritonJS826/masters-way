import {Outlet} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Footer} from "src/component/footer/Footer";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import styles from "src/land/LandingLayout.module.scss";

/**
 * Landing page for mentors
 */
export const LandingLayout = observer(() => {
  const {language} = languageStore;

  return (
    <VerticalContainer className={styles.landingContainer}>

      <Outlet />
      <Footer language={language} />
    </VerticalContainer>
  );
});
