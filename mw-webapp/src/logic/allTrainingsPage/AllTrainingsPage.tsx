import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Input, InputType} from "src/component/input/Input";
import {Loader} from "src/component/loader/Loader";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {TrainingCard} from "src/component/trainingCard/TrainingCard";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {renderViewCardOption, renderViewTableOption, ViewSwitcher} from "src/component/viewSwitcher/ViewSwitcher";
import {GetTrainingsParams} from "src/dataAccessLogic/TrainingDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {useStore} from "src/hooks/useStore";
import {AllTrainingsPageStore} from "src/logic/allTrainingsPage/AllTrainingsPageStore";
import {getTrainingsColumns} from "src/logic/trainingsTable/trainingsColumns";
import {TrainingsTable} from "src/logic/trainingsTable/TrainingsTable";
import {LanguageService} from "src/service/LanguageService";
import {AllTrainingsPageSettings, View} from "src/utils/LocalStorageWorker";
import {useDebounce} from "use-debounce";
import styles from "src/logic/allTrainingsPage/AllTrainingsPage.module.scss";

const DEBOUNCE_DELAY_MILLISECONDS = 1000;
const DEFAULT_ALL_TRAININGS_PAGE_SETTINGS: AllTrainingsPageSettings = {
  view: View.Card,
  trainingName: "",
};

/**
 * Safe opened tab from localStorage
 */
const allTrainingsPageSettingsValidator = (currentSettings: AllTrainingsPageSettings) => {
  return typeof currentSettings.trainingName === "string";
};

/**
 * Trainings page
 */
export const AllTrainingsPage = observer(() => {
  const {language} = languageStore;
  const {theme} = themeStore;

  const [allTrainingsPageSettings, updateAllTrainingsPageSettings] = usePersistanceState({
    key: "allTrainingsPage",
    defaultValue: DEFAULT_ALL_TRAININGS_PAGE_SETTINGS,

    /**
     * Check is stored data valid
     */
    storedDataValidator: (
      currentSettings: AllTrainingsPageSettings,
    ) => allTrainingsPageSettingsValidator(currentSettings),
  });

  const [debouncedName] = useDebounce(allTrainingsPageSettings.trainingName, DEBOUNCE_DELAY_MILLISECONDS);

  const allTrainingsPageStore = useStore<
  new (getTrainingsParams: GetTrainingsParams) => AllTrainingsPageStore,
  [string], AllTrainingsPageStore>({
      storeForInitialize: AllTrainingsPageStore,
      dataForInitialization: [{trainingName: ""}],
      dependency: [debouncedName],
    });

  const isMoreTrainingsExist = allTrainingsPageStore.allTrainingsAmount > allTrainingsPageStore.allTrainings.length;

  if (!allTrainingsPageStore.allTrainings) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  return (
    <VerticalContainer className={styles.allTrainingsContainer}>
      <HorizontalContainer className={styles.filterView}>
        <HorizontalContainer className={styles.filterViewLeftPanel}>
          {/* TODO: fix: input should not be width: 100% by default as I understand */}
          <div>
            <Input
              value={allTrainingsPageSettings.trainingName}
              onChange={(trainingName: string) => {
                updateAllTrainingsPageSettings({
                  view: allTrainingsPageSettings.view,
                  trainingName,
                });
              }}
              placeholder={LanguageService.allTrainings.filterBlock.trainingNamePlaceholder[language]}
              typeInputIcon={"SearchIcon"}
              typeInput={InputType.Border}
            />
          </div>

        </HorizontalContainer>

        <ViewSwitcher
          view={allTrainingsPageSettings.view}
          setView={(view) => updateAllTrainingsPageSettings({
            view,
            trainingName: allTrainingsPageSettings.trainingName,
          })}
          options={[
            renderViewCardOption(LanguageService.common.view.cardViewTooltip[language]),
            renderViewTableOption(LanguageService.common.view.tableViewTooltip[language]),
          ]}
        />

      </HorizontalContainer>

      <HorizontalContainer className={styles.titleContainer}>
        <Title
          level={HeadingLevel.h2}
          text={
            `${LanguageService.allTrainings.trainingsTable.leftTitle[language]} (${allTrainingsPageStore.allTrainings.length})`
          }
          placeholder=""
          classNameHeading={styles.headingLevelH2}
        />
        <Title
          level={HeadingLevel.h2}
          classNameHeading={styles.headingLevelH2}
          text={
            `${LanguageService.allTrainings.trainingsTable.rightTitle[language]}: ${allTrainingsPageStore.allTrainingsAmount}`
          }
          placeholder=""
        />
      </HorizontalContainer>

      <div className={styles.trainingsContent}>
        {allTrainingsPageSettings.view === View.Table ?
          <ScrollableBlock>
            <TrainingsTable
              data={allTrainingsPageStore.allTrainings}
              columns={getTrainingsColumns(language)}
            />
          </ScrollableBlock>
          :
          <HorizontalGridContainer className={styles.trainingsCards}>
            {allTrainingsPageStore.allTrainings.map((training) => {
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
        {!!isMoreTrainingsExist &&
        <Button
          value={LanguageService.allTrainings.loadMoreButton[language]}
          onClick={() => allTrainingsPageStore.setLoadedTrainings(allTrainingsPageSettings.trainingName)}
          buttonType={ButtonType.SECONDARY}
          className={styles.loadMoreButton}
        />
        }
      </div>
    </VerticalContainer>
    // <h1 style={{color: "red", marginTop: "100px"}}>
    //   Hello
    //   dgljdl jslfjrs eosejg eos irej seo
    // </h1>
  );
});
