import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {TrackHeader} from "src/analytics/headerAnalytics";
import {TrackUserPage} from "src/analytics/userPageAnalytics";
import {Button, ButtonType} from "src/component/button/Button";
import {Modal} from "src/component/modal/Modal";
import {CapabilityItem} from "src/component/pricingBlock/pricePlan/capabilityItem/CapabilityItem";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AuthDAL} from "src/dataAccessLogic/AuthDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/component/pricingBlock/pricePlan/PricePlan.module.scss";

/**
 * CapabilitiesType
 */
export interface CapabilitiesType {

  /**
   * Mentoring support
   */
  mentorSupport?: number | null;

  /**
   * Ds
   */
  ownTrainings?: null;

  /**
   * Ds
   */
  trackProgress?: null;

  /**
   * Ds
   */
  chat?: null;

  /**
   * Ds
   */
  notifications?: null;

  /**
   * Ds
   */
  aiSupport?: null;

  /**
   * Sd
   */
  mobileSupport?: null;

  /**
   * Sd
   */
  allInStart?: null;

  /**
   * Df
   */
  consultation?: null;

  /**
   * Df
   */
  secondMeeting?: null;

  /**
   * Sdf
   */
  allInGrow?: null;

  /**
   * Ds
   */
  prioritySupport?: null;

  /**
   * Ds
   */
  featureRequest?: null;

  /**
   * Ds
   */
  onboarding?: null;

  /**
   * Mastercoins per month
   */
  // eslint-disable-next-line no-magic-numbers
  masterCoins: 50 | 1500 | 2000 | 4000;

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
  period: "month" | "year" | "free" | "individually";

  /**
   * Capabilities
   */
  capabilities: CapabilitiesType;

  /**
   * CTA button value
   */
  buttonValue: "start" | "start-ai" | "grow" | "scale";

  // /**
  //  * Callback triggered on CTA button click
  //  */
  // onCLick: () => void;
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
          : props.pricePlan.period === "individually"
            ? LanguageService.pricing.individually[language].toUpperCase()
            : `$${props.pricePlan.price}`}
        {props.pricePlan.period !== "free" && props.pricePlan.period !== "individually" &&
        <span className={styles.measurement}>
          {`/${LanguageService.pricing[props.pricePlan.period][language]}`}
        </span>
        }
        {(props.pricePlan.period === "month") &&
        <span className={styles.measurement}>
          {props.pricePlan.buttonValue === "start-ai" ? " or 100$/year" : null}
          {props.pricePlan.buttonValue === "grow" ? " or 420$/year" : null}
        </span>
        }
        {props.pricePlan.period === "year" &&
        <span className={styles.measurement}>
          {` (35$/${LanguageService.pricing.month[language]})`}
        </span>
        }
      </p>
      }

      {props.pricePlan.buttonValue === "start" ?

        <Button
          onClick={() => {
            TrackHeader.trackLoginWithGoogleClick();
            AuthDAL.authGoogle();
          }}
          value={LanguageService.pricing.planCard.callToActionButton[props.pricePlan.buttonValue][language]}
          buttonType={ButtonType.PRIMARY}
          className={styles.buyPlanButton}
        />
        : (
          <Modal
            trigger={
              <Button
                onClick={TrackUserPage.trackUpgradeToPremiumClick}
                value={LanguageService.pricing.planCard.callToActionButton[props.pricePlan.buttonValue][language]}
                buttonType={ButtonType.PRIMARY}
                className={styles.buyPlanButton}
              />
            }
            content={
              <VerticalContainer>
                {renderMarkdown(LanguageService.common.payments.contactUsModal[language])}
              </VerticalContainer>
            }
          />
        )
      }

    </VerticalContainer>
  );
});
