import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {TrackUserPage} from "src/analytics/userPageAnalytics";
import {Button, ButtonType} from "src/component/button/Button";
import {Modal} from "src/component/modal/Modal";
import {CapabilityItem} from "src/component/pricingBlock/pricePlan/capabilityItem/CapabilityItem";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/component/pricingBlock/pricePlan/PricePlan.module.scss";

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
   * User skills
   */
  skills: number;

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

  /**
   * Mentoring support
   */
  mentorSupport: number;
}

/**
 * PricePlanType
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
 * Price plan props
 */
interface PricePlanProps {

  /**
   * Price plan
   */
  pricePlan: PricePlanType;
}

/**
 * Price plan
 */
export const PricePlan = observer((props: PricePlanProps) => {
  const {language} = languageStore;
  const capabilitiesList = Object.keys(props.pricePlan.capabilities) as (
    keyof typeof props.pricePlan.capabilities
  )[];

  return (
    <VerticalContainer className={clsx(styles.pricePlanCard, styles[props.pricePlan.theme])}>
      <Title
        level={HeadingLevel.h2}
        text={props.pricePlan.name}
        placeholder=""
      />
      <VerticalContainer className={styles.planCapabilities}>
        {capabilitiesList.map((capability) => (
          <CapabilityItem
            key={capability}
            isAvailable={props.pricePlan.capabilities[capability] !== 0}
            value={LanguageService.pricing.planCard[capability][language]}
            amount={props.pricePlan.capabilities[capability]}
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
            {renderMarkdown(LanguageService.common.payments.donateModal[language])}
          </VerticalContainer>
        }
      />
    </VerticalContainer>
  );
});
