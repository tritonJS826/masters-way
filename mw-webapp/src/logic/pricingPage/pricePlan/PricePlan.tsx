import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {TrackUserPage} from "src/analytics/userPageAnalytics";
import {Button, ButtonType} from "src/component/button/Button";
import {Modal} from "src/component/modal/Modal";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {CapabilityItem} from "src/logic/pricingPage/pricePlan/capabilityItem/CapabilityItem";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/pricingPage/pricePlan/PricePlan.module.scss";

/**
 * CapabilitiesType
 */
export interface CapabilitiesType {

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
  period: "month" | "year" | "free";

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
      <Title
        level={HeadingLevel.h2}
        text={props.pricePlan.name}
        placeholder=""
      />
      <VerticalContainer className={styles.planCapabilities}>
        {capabilitiesList.map((capability: string) => (
          <CapabilityItem
            key={capability}
            isAvailable={capabilities[capability as keyof typeof capabilities] !== 0}
            value={LanguageService.pricing.planCard[capability as keyof typeof capabilities][language]}
            amount={capabilities[capability as keyof typeof capabilities]}
          />
        ))
        }
      </VerticalContainer>
      {<p className={styles.priceAmount}>
        {props.pricePlan.period === "free"
          ? LanguageService.pricing.free[language].toUpperCase()
          : `$${props.pricePlan.price}`}
        {props.pricePlan.period !== "free" &&
        <span className={styles.measurement}>
          {`/${LanguageService.pricing[props.pricePlan.period][language]}`}
        </span>
        }
        {props.pricePlan.period === "year" &&
        <span className={styles.measurement}>
          {` (35$/${LanguageService.pricing.month[language]})`}
        </span>
        }
      </p>
      }

      <Modal
        trigger={
          <Button
            onClick={TrackUserPage.trackUpgradeToPremiumClick}
            value={LanguageService.pricing.choose[language]}
            buttonType={ButtonType.PRIMARY}
            className={styles.buyPlanButton}
          />
        }
        content={
          <VerticalContainer>
            {renderMarkdown(LanguageService.pricing.buyPlanModal[language])}
          </VerticalContainer>
        }
      />
    </VerticalContainer>
  );
});
