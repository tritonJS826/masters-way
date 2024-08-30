import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {TrackUserPage} from "src/analytics/userPageAnalytics";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Modal} from "src/component/modal/Modal";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/pricingPage/pricePlan/PricePlan.module.scss";

/**
 *CapabilitiesType
 */
interface CapabilitiesType {

  /**
   * Own ways
   */
  ownWays: number;

  /**
   * Private ways
   */
  privateWays: number;

  /**
   * Day reports
   */
  dayReports: number;

  /**
   * User tags
   */
  userTags: number;

  /**
   * Mentoring ways
   */
  mentoringWays: number;

  /**
   * Custom collections
   */
  customCollections: number;

  /**
   * Composite way deps
   */
  compositeWayDeps: number;
}

/**
 *PricePlanType
 */
export interface PricePlanType {

  /**
   * Id plan
   */
  id: number;

  /**
   * Theme plan
   */
  theme: "light" | "dark";

  /**
   * Name plan
   */
  name: string;

  /**
   * Price plan
   */
  price: number;

  /**
   * Period price plan
   */
  period?: "month" | "year";

  /**
   * Capabilities
   */
  capabilities: CapabilitiesType;
}

/**
 * VerticalContainer props
 */
interface PricePlanProps {

  /**
   * Price plan
   */
  pricePlan: PricePlanType;
}

/**
 * Team member
 */
export const PricePlan = observer((props: PricePlanProps) => {
  const {language} = languageStore;
  const capabilities: CapabilitiesType = props.pricePlan.capabilities;
  const capabilitiesList: string[] = Object.keys(capabilities);
  const cardTheme = props.pricePlan.theme;

  return (
    <VerticalContainer className={clsx(styles.pricePlanCard, styles[cardTheme])}>
      <VerticalContainer className={styles.planHeader}>
        <Title
          level={HeadingLevel.h3}
          text={props.pricePlan.name}
          className={styles.pricePlanTitle}
          placeholder=""
        />
        <ul>
          {
            capabilitiesList.map((item: string) => (
              <li
                key={item}
                className={capabilities[item as keyof typeof capabilities] !== 0 ? styles.itemAvailable : styles.itemUnavailable}
              >
                {LanguageService.pricing.planCard[item as keyof typeof capabilities][language]}
                {
                  capabilities[item as keyof typeof capabilities] !== 0 &&
                  <span>
                    {` (${capabilities[item as keyof typeof capabilities]})`}
                  </span>
                }
              </li>
            ))
          }
        </ul>
        {props.pricePlan.period === undefined ?
          <p className={styles.priceFree}>
            {LanguageService.pricing.free[language].toUpperCase()}
          </p>
          :
          <p className={styles.priceAmount}>
            {`$${props.pricePlan.price}`}
            <span>
              {`/${LanguageService.pricing[props.pricePlan.period][language]}`}
            </span>
          </p>
        }
      </VerticalContainer>
      <Modal
        trigger={
          <Button
            onClick={TrackUserPage.trackUpgradeToPremiumClick}
            value={LanguageService.pricing.choose[language]}
            buttonType={ButtonType.SUPER_SPECIAL_BEAUTIFUL_BUTTON}
            className={styles.buyPlanButton}
          />
        }
        content={
          <HorizontalContainer>
            {LanguageService.pricing.buyPlanModal[language]}
          </HorizontalContainer>
        }
      />
    </VerticalContainer>
  );

});
