import {observer} from "mobx-react-lite";
import {Footer} from "src/component/footer/Footer";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {PricePlan} from "src/logic/pricingPage/pricePlan/PricePlan";
import {pricePlans} from "src/logic/pricingPage/pricePlan/pricePlans";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/pricingPage/PricingPage.module.scss";

/**
 * Pricing Page
 */
export const PricingPage = observer(() => {
  const {language} = languageStore;

  return (
    <>
      <VerticalContainer className={styles.pricingBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.pricing.pricingBlock.title[language]}
          className={styles.pricingTitle}
          placeholder=""
        />
        <p className={styles.pricingDescription}>
          {LanguageService.pricing.pricingBlock.description[language]}
        </p>
        <HorizontalContainer className={styles.planItems}>
          {
            pricePlans.map((pricePlan) => (
              <PricePlan
                key={pricePlan.id}
                pricePlan={pricePlan}
              />
            ))
          }
        </HorizontalContainer>

      </VerticalContainer>
      <Footer language={language} />
    </>
  );

});
