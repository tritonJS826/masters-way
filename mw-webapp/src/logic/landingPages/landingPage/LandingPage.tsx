import {observer} from "mobx-react-lite";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {pages} from "src/router/pages";
import styles from "src/logic/landingPages/landingPage/LandingPage.module.scss";

/**
 * Main landing page
 */
export const LandingPage = observer(() => {
  return (
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
  );
});
