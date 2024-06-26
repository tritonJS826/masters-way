import logoLight from "src/assets/mastersWayLogoLight.svg";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Image} from "src/component/image/Image";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Language} from "src/globalStore/LanguageStore";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/component/footer/Footer.module.scss";

export const LOGO_TEXT = "Master's way";

/**
 * Footer props
 */
interface FooterProps {

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

  /**
   * Current language
   */
  language: Language;

}

/**
 * Footer component
 */
export const Footer = (props: FooterProps) => {
  return (
    <footer
      className={styles.footer}
      data-cy={props.dataCy}
    >
      <HorizontalContainer className={styles.footerWrapper}>
        <HorizontalContainer className={styles.socialLinks}>
          <Link path={pages.home.getPath({})}>
            <Image
              alt={LOGO_TEXT}
              src={logoLight}
              className={styles.logo}
            />
          </Link>
          <VerticalContainer className={styles.socialMedia}>
            <Title
              level={HeadingLevel.h4}
              text={LanguageService.home.socialMedia[props.language]}
              placeholder=""
              classNameHeading={styles.socialMediaText}
            />
            <HorizontalContainer className={styles.socialMediaIcons}>
              <Link
                path="https://linkedin.com/company/masters-way-project"
                isNewTab
              >
                <div className={styles.iconWrapper}>
                  <Icon
                    size={IconSize.SMALL}
                    name="LinkedinIcon"
                    className={styles.socialMediaIcon}
                  />
                </div>
              </Link>
              <Link
                path="https://www.youtube.com/watch?v=DiNNQol15ds&list=PL7eqEW04iXMV2tu_JYAIwerepUTZJjciM"
                isNewTab
              >
                <div className={styles.iconWrapper}>
                  <Icon
                    size={IconSize.SMALL}
                    name="YoutubeIcon"
                    className={styles.socialMediaIcon}
                  />
                </div>
              </Link>
              <Link
                path="https://github.com/tritonJS826/masters-way"
                isNewTab
              >
                <div className={styles.iconWrapper}>
                  <Icon
                    size={IconSize.SMALL}
                    name="GithubIcon"
                    className={styles.socialMediaIcon}
                  />
                </div>
              </Link>
            </HorizontalContainer>
          </VerticalContainer>
        </HorizontalContainer>

        <hr className={styles.ruler} />

        <HorizontalContainer className={styles.privacyLinks}>
          <Link
            path="https://www.freeprivacypolicy.com/live/febb15f6-017f-45fc-abaf-b4a5d38316b9"
            className={styles.privacyLink}
            isNewTab
          >
            {LanguageService.common.privacyPolicy[props.language]}
          </Link>
        </HorizontalContainer>
      </HorizontalContainer>
    </footer>
  );
};
