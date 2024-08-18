import {TrackHeader} from "src/analytics/headerAnalytics";
import logo from "src/assets/mastersWayLogo.svg";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Image} from "src/component/image/Image";
import {Link} from "src/component/link/Link";
import {Language} from "src/globalStore/LanguageStore";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/landingPages/headerLanding/HeaderLanding.module.scss";

/**
 *Header landing props
 */
interface HeaderLandingProps {

  /**
   * Current language
   */
  language: Language;
}

/**
 * Header landing
 */
export const HeaderLanding = (props: HeaderLandingProps) => {

  return (
    <header className={styles.header}>
      <Link
        className={styles.logo}
        path={pages.home.getPath({})}
        onClick={TrackHeader.trackLogoClick}
      >
        <Image
          alt="Logo image"
          src={logo}
          className={styles.logo}
        />
      </Link>
      <HorizontalContainer>
        <div>
          Block
        </div>
        <div>
          Block
        </div>
        <div>
          Block
        </div>
        <div>
          Block
        </div>
        <div>
          Block
        </div>
      </HorizontalContainer>

      <Button
        value={LanguageService.header.logoutButton[props.language]}
        buttonType={ButtonType.PRIMARY}
        onClick={() => {}}
      />
    </header>
  );
};
