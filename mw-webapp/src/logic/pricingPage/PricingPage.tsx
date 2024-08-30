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
      <div className={styles.container}>
        <VerticalContainer className={styles.pricingBlock}>
          <div className={styles.titleContainer}>
            <Title
              level={HeadingLevel.h2}
              text={LanguageService.pricing.pricingBlock.title[language]}
              className={styles.pricingTitle}
              placeholder=""
            />
            <Title
              level={HeadingLevel.h3}
              text={LanguageService.pricing.pricingBlock.description[language]}
              className={styles.subtitleDescription}
              placeholder=""
            />
          </div>
          <HorizontalContainer className={styles.systemItems}>
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
      </div>
      <Footer language={language} />
    </>
  );

});
