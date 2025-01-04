import clsx from "clsx";
import {TrackFooter} from "src/analytics/footerAnalytics";
import logoLight from "src/assets/mastersWayLogoLight.svg";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Image} from "src/component/image/Image";
import {Link} from "src/component/link/Link";
import {Modal} from "src/component/modal/Modal";
import {Separator} from "src/component/separator/Separator";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Language} from "src/globalStore/LanguageStore";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/component/footer/Footer.module.scss";

export const LOGO_TEXT = "Master's way";
export const MODAL_INDEX_DESCRIPTION = 7;

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

  /**
   * App stores modal content
   */
  const appStoresModalContent = () => (
    <VerticalContainer className={styles.modalContainer}>
      <Title
        text={LanguageService.home.appStoresModalTitle[props.language]}
        placeholder=""
        level={HeadingLevel.h2}
        classNameHeading={styles.modalTitle}
      />
      {renderMarkdown(LanguageService.aboutProject.accordion[MODAL_INDEX_DESCRIPTION].description[props.language])}
    </VerticalContainer>
  );

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

          <HorizontalContainer className={styles.socialBlock}>
            <VerticalContainer className={styles.appStores}>
              <Title
                level={HeadingLevel.h4}
                text={LanguageService.home.appStores[props.language]}
                placeholder=""
                classNameHeading={styles.socialMediaText}
              />
              <HorizontalContainer className={styles.socialMediaIcons}>
                <Modal
                  trigger={
                    <div
                      className={styles.iconWrapper}
                      onClick={TrackFooter.trackPlayMarketIconClick}
                    >
                      <Icon
                        size={IconSize.SMALL}
                        name="GooglePlayIcon"
                        className={styles.socialMediaIcon}
                      />
                    </div>}
                  content={appStoresModalContent()}
                />
                <Modal
                  trigger={
                    <div
                      className={styles.iconWrapper}
                      onClick={TrackFooter.trackAppStoreIconClick}
                    >
                      <Icon
                        size={IconSize.SMALL}
                        name="AppStoreIcon"
                        className={styles.socialMediaIcon}
                      />
                    </div>}
                  content={appStoresModalContent()}
                />
              </HorizontalContainer>
            </VerticalContainer>

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
                  ariaLabel={LanguageService.common.socialMediaAriaLabel.linkedIn[props.language]}
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
                  path="https://www.youtube.com/watch?v=8QGIjw6oyDA&list=PLif3tyf4TWIlhAV-7AoEpd9fGolkooIxm&index=2"
                  isNewTab
                  ariaLabel={LanguageService.common.socialMediaAriaLabel.youtube[props.language]}
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
                  path="https://www.patreon.com/c/mastersway/posts"
                  isNewTab
                  ariaLabel={LanguageService.common.socialMediaAriaLabel.patreon[props.language]}
                >
                  <div className={styles.iconWrapper}>
                    <Icon
                      size={IconSize.SMALL}
                      name="PatreonIcon"
                      className={clsx(styles.socialMediaIcon, styles.patreonIcon)}
                    />
                  </div>
                </Link>
              </HorizontalContainer>
            </VerticalContainer>
          </HorizontalContainer>

        </HorizontalContainer>

        <Separator className={styles.ruler} />

        <HorizontalContainer className={styles.privacyLinks}>
          <Link
            path={pages.privacyPolicy.getPath({})}
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
