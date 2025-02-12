
import {observer} from "mobx-react-lite";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Loader} from "src/component/loader/Loader";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {TrainingCard} from "src/component/trainingCard/TrainingCard";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {renderViewCardOption, renderViewTableOption, ViewSwitcher} from "src/component/viewSwitcher/ViewSwitcher";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {getTrainingsColumns} from "src/logic/trainingsTable/trainingsColumns";
import {TrainingsTable} from "src/logic/trainingsTable/TrainingsTable";
import {TrainingPreview} from "src/model/businessModelPreview/TrainingPreview";
import {LanguageService} from "src/service/LanguageService";
import {View} from "src/utils/LocalStorageWorker";
import styles from "src/logic/userPage/trainings/Trainings.module.scss";

/**
 * Trainings preview props
 */
interface TrainingsProps {

  /**
   * User's trainings preview
   */
  trainings: TrainingPreview[];

  /**
   * Table title
   */
  title: string;

  /**
   * Way's view
   */
  view: View;

  /**
   * If true - user is page owner
   */
  isPageOwner: boolean;

  /**
   * Callback to change view
   */
  setView: (view: View) => void;

}

/**
 * Render trainings preview
 */
export const Trainings = observer((props: TrainingsProps) => {
  const {language} = languageStore;
  const {theme} = themeStore;

  if (!props.trainings) {
    return (
      <VerticalContainer className={styles.loaderWrapper}>
        <Loader
          theme={theme}
          isAbsolute
        />
      </VerticalContainer>
    );
  }

  return (
    <>
      <HorizontalContainer className={styles.filterView}>
        <ViewSwitcher
          view={props.view}
          setView={props.setView}
          options={[
            renderViewCardOption(LanguageService.common.view.cardViewTooltip[language]),
            renderViewTableOption(LanguageService.common.view.tableViewTooltip[language]),
          ]}
        />
      </HorizontalContainer>

      <Title
        text={`${props.title} (${props.trainings.length})`}
        level={HeadingLevel.h2}
        placeholder=""
        classNameHeading={styles.trainingsTitle}
      />

      <VerticalContainer className={styles.trainingsContent}>

        {props.view === View.Table ?
          <ScrollableBlock>
            <TrainingsTable
              data={props.trainings}
              columns={getTrainingsColumns(language)}
            />
          </ScrollableBlock>
          :
          <HorizontalGridContainer className={styles.trainingCards}>
            {props.trainings.map((training) => {
              return (
                <TrainingCard
                  key={training.uuid}
                  trainingPreview={training}
                  createdAtTooltip={LanguageService.allTrainings.trainingCard.createdAt[language]}
                  updatedAtTooltip={LanguageService.allTrainings.trainingCard.updatedAt[language]}
                  studentsTooltip={LanguageService.allTrainings.trainingCard.students[language]}
                  likesTooltip={LanguageService.allTrainings.trainingCard.likes[language]}
                  mentorsText={training.mentors.length
                    ? `${LanguageService.allTrainings.trainingCard.mentor[language]}`
                    : `${LanguageService.allTrainings.trainingCard.noMentors[language]}`}
                />
              );
            })
            }
          </HorizontalGridContainer>
        }
      </VerticalContainer>
    </>
  );
});
