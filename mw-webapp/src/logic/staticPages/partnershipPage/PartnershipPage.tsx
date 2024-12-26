import {partnershipAccessIds} from "cypress/accessIds/partnershipAccessIds";
import {observer} from "mobx-react-lite";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {AdvantageItem as PromotionMethod} from "src/component/advantageItem/AdvantageItem";
import {Footer} from "src/component/footer/Footer";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {ReviewCard} from "src/component/reviewCard/ReviewCard";
import {Slider, SliderItem} from "src/component/slider/Slider";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {AdvantageItem} from "src/logic/staticPages/partnershipPage/advantageItem/AdvantageItem";
import {StepItem} from "src/logic/staticPages/partnershipPage/stepItem/StepItem";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/staticPages/partnershipPage/PartnershipPage.module.scss";

/**
 * Partnership page
 */
export const PartnershipPage = observer(() => {
  const {language} = languageStore;

  const reviewCards: SliderItem[] = [
    {
      id: 1,
      content: (
        <ReviewCard
          gradeAmount={5}
          review={LanguageService.partnership.reviews.kirillReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=1T4XtkEjC7KKgqnox7yE9JttbWdxfzlr4&sz=w1000"
          reviewerName={LanguageService.partnership.reviews.kirillReview.mentorName[language]}
          reviewerProfession={LanguageService.partnership.reviews.kirillReview.mentorProfession[language]}
        />
      ),
    },
    {
      id: 2,
      content: (
        <ReviewCard
          gradeAmount={5}
          review={LanguageService.partnership.reviews.viktarReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=18oHI9KoiaYvd_UowHyqsJbDLLhmuxPxr&sz=w1000"
          reviewerName={LanguageService.partnership.reviews.viktarReview.mentorName[language]}
          reviewerProfession={LanguageService.partnership.reviews.viktarReview.mentorProfession[language]}
        />
      ),
    },
    {
      id: 3,
      content: (
        <ReviewCard
          gradeAmount={5}
          review={LanguageService.partnership.reviews.ekaterinaReview.review[language]}
          reviewerImageUrl="https://drive.google.com/thumbnail?id=1SC7y2CUX7jRYR6VVWoy4polIO0UZZ-i8&sz=w1000"
          reviewerName={LanguageService.partnership.reviews.ekaterinaReview.mentorName[language]}
          reviewerProfession={LanguageService.partnership.reviews.ekaterinaReview.mentorProfession[language]}
        />
      ),
    },
  ];

  const accordionItems = LanguageService.partnership.questions.accordion.map((data) => ({
    trigger: {child: data.question[language]},
    content: {child: renderMarkdown(data.answer[language])},
  }));

  // 139 line styles.reviewList undefined
  return (
    <VerticalContainer className={styles.partnershipPageWrapper}>
      <VerticalContainer className={styles.aboutPartnershipMainBlock}>
        <Title
          level={HeadingLevel.h1}
          text={LanguageService.partnership.partnershipMainBlock.title[language]}
          className={styles.title}
          placeholder=""
          cy={{dataCyTitleContainer: partnershipAccessIds.mainBlock.title}}
        />
        <Title
          level={HeadingLevel.h3}
          text={LanguageService.partnership.partnershipMainBlock.description[language]}
          className={styles.subtitle}
          placeholder=""
        />
        <Link
          path={LanguageService.partnership.formBlock.formLink[language]}
          className={styles.actionButton}
          onClick={() => {}}
          isNewTab
        >
          {LanguageService.partnership.buttonCTA[language]}
        </Link>
      </VerticalContainer>

      <VerticalContainer className={styles.whyBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.partnership.whyBlock.title[language]}
          className={styles.whyBlockTitle}
          placeholder=""
        />

        <AdvantageItem
          title={LanguageService.partnership.whyBlock.advantages.referralBonuses.title[language]}
          description={LanguageService.partnership.whyBlock.advantages.referralBonuses.description[language]}
          stepNumber="1"
        />
        <AdvantageItem
          title={LanguageService.partnership.whyBlock.advantages.customerDiscount.title[language]}
          description={LanguageService.partnership.whyBlock.advantages.customerDiscount.description[language]}
          isReversed
          stepNumber="2"
        />
        <AdvantageItem
          title={LanguageService.partnership.whyBlock.advantages.incomePotential.title[language]}
          description={LanguageService.partnership.whyBlock.advantages.incomePotential.description[language]}
          stepNumber="3"
        />
        <AdvantageItem
          title={LanguageService.partnership.whyBlock.advantages.regularPayments.title[language]}
          description={LanguageService.partnership.whyBlock.advantages.regularPayments.description[language]}
          isReversed
          stepNumber="4"
        />
        <AdvantageItem
          title={LanguageService.partnership.whyBlock.advantages.supportStatistics.title[language]}
          description={LanguageService.partnership.whyBlock.advantages.supportStatistics.description[language]}
          stepNumber="5"
        />
      </VerticalContainer>

      <VerticalContainer className={styles.reviewBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.partnership.reviews.title[language]}
          className={styles.whyBlockTitle}
          placeholder=""
        />
        <HorizontalContainer className={styles.reviewList}>
          <Slider
            sliderItems={reviewCards}
            settings={{pagination: false}}
          />
        </HorizontalContainer>
      </VerticalContainer>

      <VerticalContainer className={styles.becomePartnerBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.partnership.becomePartner.title[language]}
          className={styles.whyBlockTitle}
          placeholder=""
        />
        <StepItem
          title={LanguageService.partnership.becomePartner.steps.fillForm[language]}
          stepNumber="1"
        />
        <StepItem
          title={LanguageService.partnership.becomePartner.steps.waitForResponse[language]}
          stepNumber="2"
        />
        <StepItem
          title={LanguageService.partnership.becomePartner.steps.startPromote[language]}
          stepNumber="3"
        />
        <StepItem
          title={LanguageService.partnership.becomePartner.steps.trackResults[language]}
          stepNumber="4"
        />
        <StepItem
          title={LanguageService.partnership.becomePartner.steps.receivePayments[language]}
          stepNumber="5"
        />
        <Link
          path={LanguageService.partnership.formBlock.formLink[language]}
          className={styles.actionButton}
          onClick={() => {}}
          isNewTab
        >
          {LanguageService.partnership.buttonCTA[language]}
        </Link>
      </VerticalContainer>

      <VerticalContainer className={styles.promotionBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.partnership.promotion.title[language]}
          className={styles.whyBlockTitle}
          placeholder=""
        />
        <HorizontalContainer className={styles.promotionList}>
          <PromotionMethod
            title={LanguageService.partnership.promotion.methods.recommedations[language]}
            description=""
            iconName="UsersIcon"
          />
          <PromotionMethod
            title={LanguageService.partnership.promotion.methods.socialNetworks[language]}
            description=""
            iconName="GlobeIcon"
          />
          <PromotionMethod
            title={LanguageService.partnership.promotion.methods.blog[language]}
            description=""
            iconName="TrendingUpIcon"
          />
          <PromotionMethod
            title={LanguageService.partnership.promotion.methods.websitePromotion[language]}
            description=""
            iconName="ActivityIcon"
          />
          <PromotionMethod
            title={LanguageService.partnership.promotion.methods.contextualAdvertising[language]}
            description=""
            iconName="UserCheckIcon"
          />
          <PromotionMethod
            title={LanguageService.partnership.promotion.methods.newsletters[language]}
            description=""
            iconName="BookIcon"
          />
        </HorizontalContainer>
      </VerticalContainer>

      <VerticalContainer className={styles.formBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.partnership.formBlock.title[language]}
          className={styles.whyBlockTitle}
          placeholder=""
        />
        <Title
          level={HeadingLevel.h3}
          text={LanguageService.partnership.formBlock.description[language]}
          className={styles.subtitle}
          placeholder=""
        />
        <Link
          path={LanguageService.partnership.formBlock.formLink[language]}
          className={styles.formLink}
          onClick={() => {}}
          isNewTab
        >
          {LanguageService.partnership.buttonCTA[language]}
        </Link>
      </VerticalContainer>

      <VerticalContainer className={styles.accordionSection}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.partnership.questions.title[language]}
          className={styles.title}
          placeholder=""
        />

        <Accordion
          items={accordionItems}
          type={accordionTypes.MULTIPLE}
          className={styles.accordion}
        />
      </VerticalContainer>

      <Footer language={language} />
    </VerticalContainer>
  );
});
