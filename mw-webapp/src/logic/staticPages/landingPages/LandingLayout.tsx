import {Outlet} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/staticPages/landingPages/LandingLayout.module.scss";

/**
 * Landing page for mentors
 */
export const LandingLayout = observer(() => {
  return (
    <VerticalContainer className={styles.landingContainer}>
      <Outlet />
    </VerticalContainer>
  );
});
