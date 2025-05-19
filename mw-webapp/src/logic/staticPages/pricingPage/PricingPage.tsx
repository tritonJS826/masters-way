import {pricingAccessIds} from "cypress/accessIds/pricingAccessIds";
import {observer} from "mobx-react-lite";
import {Footer} from "src/component/footer/Footer";
import {PricingBlock} from "src/component/pricingBlock/PricingBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/staticPages/pricingPage/PricingPage.module.scss";

/**
 * Pricing Page
 */
export const PricingPage = observer(() => {
  const {language} = languageStore;

  return (
    <VerticalContainer className={styles.pricingPageWrapper}>
      <VerticalContainer className={styles.pricingBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.pricing.pricingBlock.title[language]}
          className={styles.pricingTitle}
          classNameHeading={styles.headingLevelH2}
          placeholder=""
          cy={{dataCyTitleContainer: pricingAccessIds.pricingBlock.title}}
        />
        <p className={styles.pricingDescription}>
          {LanguageService.pricing.pricingBlock.description[language]}
        </p>
        <PricingBlock pricePlans={pricePlansTraining} />

      </VerticalContainer>
      <Footer language={language} />
    </VerticalContainer>
  );

});
