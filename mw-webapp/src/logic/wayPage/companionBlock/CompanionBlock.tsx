import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Infotip} from "src/component/infotip/Infotip";
import {Modal} from "src/component/modal/Modal";
import {Select, SelectItemType} from "src/component/select/Select";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {CompanionCharacter, CompanionFeedback} from "src/model/businessModel/CompanionFeedback";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/logic/wayPage/companionBlock/CompanionBlock.module.scss";

const SHORT_FEEDBACK_LENGTH = 60;

const COMPANION_CHARACTER_OPTIONS: SelectItemType<CompanionCharacter>[] = [
  {id: "1", value: "army_sergeant", text: "Army Sergeant"},
  {id: "2", value: "creative_artist", text: "Creative Artist (coming soon)"},
  {id: "3", value: "warm_sister", text: "Warm Sister (coming soon)"},
  {id: "4", value: "wise_mentor", text: "Wise Mentor (coming soon)"},
  {id: "5", value: "cheerful_friend", text: "Cheerful Friend (coming soon)"},
];

/**
 * CompanionBlock props
 */
interface CompanionBlockProps {

  /**
   * CompanionFeedback
   */
  companionFeedback: CompanionFeedback | null;

  /**
   * On character change
   */
  onCharacterChange?: (character: CompanionCharacter) => void;
}

export const CompanionBlock = observer((props: CompanionBlockProps) => {
  const {language} = languageStore;
  const {companionFeedback, onCharacterChange} = props;

  const selectedCharacter = companionFeedback?.character ?? "army_sergeant";

  /**
   * Handle character change
   */
  const handleCharacterChange = (character: CompanionCharacter) => {
    if (onCharacterChange) {
      onCharacterChange(character);
    }
  };

  const COMPANION_FEEDBACK_STATUS_GREAT_THRESHOLD = 75;
  const COMPANION_FEEDBACK_STATUS_GOOD_THRESHOLD = 50;
  const COMPANION_FEEDBACK_STATUS_KEEP_GOING_THRESHOLD = 25;

  /**
   * Get status color for label
   */
  const getStatusColor = (status: number): string => {
    if (status >= COMPANION_FEEDBACK_STATUS_GREAT_THRESHOLD) {
      return "green";
    }
    if (status >= COMPANION_FEEDBACK_STATUS_GOOD_THRESHOLD) {
      return "yellow";
    }
    if (status >= COMPANION_FEEDBACK_STATUS_KEEP_GOING_THRESHOLD) {
      return "orange";
    }

    return "red";
  };

  if (!companionFeedback) {
    return (
      <VerticalContainer className={styles.companionBlock}>
        <div className={styles.loading}>
          Loading...
        </div>
      </VerticalContainer>
    );
  }

  return (
    <VerticalContainer className={styles.companionBlock}>
      <HorizontalContainer className={styles.header}>
        <Infotip content={LanguageService.way.companion.description[language]} />
        <Title
          level={HeadingLevel.h3}
          text={LanguageService.way.companion.title[language]}
          placeholder=""
        />
        <Select
          value={selectedCharacter}
          name="character"
          options={COMPANION_CHARACTER_OPTIONS}
          onChange={(character: CompanionCharacter) => handleCharacterChange(character)}
          className={styles.characterSelect}
          cy={{dataCyTrigger: "companion-character-select", dataCyContentList: "", dataCyValue: ""}}
        />
        <HorizontalContainer className={styles.feedbackRow}>
          <span className={styles.rowLabel}>
            {LanguageService.way.companion.lastUpdateLabel[language]}
          </span>
          <span className={styles.rowValue}>
            {DateUtils.getShortISODotSplitted(new Date(companionFeedback.lastUpdatedAt))}
          </span>
        </HorizontalContainer>
      </HorizontalContainer>

      <VerticalContainer className={styles.feedbackRows}>

        <HorizontalContainer className={styles.feedbackRow}>
          <span
            className={styles.feedbackPreview}
            style={{color: getStatusColor(companionFeedback.status)}}
          >
            {companionFeedback.comment.substring(0, SHORT_FEEDBACK_LENGTH) + "..."}
          </span>
          <Modal
            trigger={
              <Button
                value={LanguageService.way.companion.readMore[language]}
                buttonType={ButtonType.SECONDARY}
                className={styles.readMoreButton}
                onClick={() => {}}
              />
            }
            content={
              <VerticalContainer className={styles.feedbackModalContent}>
                <Title
                  level={HeadingLevel.h4}
                  text={LanguageService.way.companion.feedbackTitle[language]}
                  placeholder=""
                />
                <div className={styles.feedbackFullComment}>
                  {companionFeedback.comment}
                </div>
                <HorizontalContainer className={styles.feedbackMeta}>
                  <span className={styles.metaItem}>
                    <strong>
                      {LanguageService.way.companion.characterLabel[language]}
                    </strong>
                    {" "}
                    {COMPANION_CHARACTER_OPTIONS.find(c => c.value === companionFeedback.character)?.text}
                  </span>
                  <span className={styles.metaItem}>
                    <strong>
                      {LanguageService.way.companion.lastUpdateLabel[language]}
                    </strong>
                    {" "}
                    {DateUtils.getShortISODotSplitted(new Date(companionFeedback.lastUpdatedAt))}
                  </span>
                </HorizontalContainer>
              </VerticalContainer>
            }
          />
        </HorizontalContainer>
      </VerticalContainer>
    </VerticalContainer>
  );
});
