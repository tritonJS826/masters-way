import {useEffect} from "react";
import {allTestsAccessIds} from "cypress/accessIds/allTestsAccessIds";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Input, InputType} from "src/component/input/Input";
import {Loader} from "src/component/loader/Loader";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {TestCard} from "src/component/testCard/TestCard";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {renderViewCardOption, renderViewTableOption, ViewSwitcher} from "src/component/viewSwitcher/ViewSwitcher";
import {GetTestsParams} from "src/dataAccessLogic/TestDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {usePersistenceState} from "src/hooks/usePersistenceState";
import {useStore} from "src/hooks/useStore";
import {AllTestsPageStore} from "src/logic/allTestsPage/AllTestsPageStore";
import {DEBOUNCE_DELAY_MILLISECONDS} from "src/logic/FilterSettings";
import {getTestsColumns} from "src/logic/testsTable/testsColumns";
import {TestsTable} from "src/logic/testsTable/TestsTable";
import {LanguageService} from "src/service/LanguageService";
import {AllTestsPageSettings, View} from "src/utils/LocalStorageWorker";
import {useDebounce} from "use-debounce";
import styles from "src/logic/allTestsPage/AllTestsPage.module.scss";

const DEFAULT_ALL_TESTS_PAGE_SETTINGS: AllTestsPageSettings = {
  view: View.Card,
  testName: "",
};

/**
 * Validates all tests page settings
 */
const allTestsPageSettingsValidator = (currentSettings: AllTestsPageSettings) => {
  const isViewValid = !!currentSettings.view && Object.values(View).includes(currentSettings.view);
  const isTestNameValid = typeof currentSettings.testName === "string";

  return isViewValid && isTestNameValid;
};

/**
 * Tests page
 */
export const AllTestsPage = observer(() => {
  const {language} = languageStore;
  const {theme} = themeStore;

  const [allTestsPageSettings, updateAllTestsPageSettings] = usePersistenceState({
    key: "allTestsPage",
    defaultValue: DEFAULT_ALL_TESTS_PAGE_SETTINGS,

    /**
     * Check is stored data valid
     */
    storedDataValidator: (
      currentSettings: AllTestsPageSettings,
    ) => allTestsPageSettingsValidator(currentSettings),
  });

  const allTestsPageStore = useStore<
  new (getTestsParams: GetTestsParams) => AllTestsPageStore, [], AllTestsPageStore>({
    storeForInitialize: AllTestsPageStore,
    dataForInitialization: [{testName: allTestsPageSettings.testName}],
    dependency: [],
  });

  const [debouncedTestName] = useDebounce(allTestsPageSettings.testName, DEBOUNCE_DELAY_MILLISECONDS);

  useEffect(() => {
    allTestsPageStore.loadTests({testName: debouncedTestName});
  }, [debouncedTestName]);

  if (!allTestsPageStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  return (
    <VerticalContainer className={styles.allTestsContainer}>
      <HorizontalContainer className={styles.filterView}>
        <HorizontalContainer className={styles.filterViewLeftPanel}>
          <div>
            <Input
              value={allTestsPageSettings.testName}
              onChange={(testName: string) => {
                updateAllTestsPageSettings({
                  view: allTestsPageSettings.view,
                  testName,
                });
              }}
              placeholder={LanguageService.allTests.filterBlock.testNamePlaceholder[language]}
              typeInputIcon={"SearchIcon"}
              typeInput={InputType.Border}
            />
          </div>

        </HorizontalContainer>

        <ViewSwitcher
          view={allTestsPageSettings.view}
          setView={(view) => updateAllTestsPageSettings({
            view,
            testName: allTestsPageSettings.testName,
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
            `${LanguageService.allTests.testsTable.leftTitle[language]} (${allTestsPageStore.allTests.length})`
          }
          placeholder=""
          classNameHeading={styles.headingLevelH2}
          cy={{dataCyTitleContainer: allTestsAccessIds.allTestsTitles.title}}
        />
        <Title
          level={HeadingLevel.h2}
          classNameHeading={styles.headingLevelH2}
          text={
            `${LanguageService.allTests.testsTable.rightTitle[language]}: ${allTestsPageStore.allTestsAmount}`
          }
          placeholder=""
        />
      </HorizontalContainer>

      <div className={styles.testsContent}>
        {allTestsPageSettings.view === View.Table ?
          <ScrollableBlock>
            <TestsTable
              data={allTestsPageStore.allTests}
              columns={getTestsColumns(language)}
            />
          </ScrollableBlock>
          :
          <HorizontalGridContainer className={styles.testsCards}>
            {allTestsPageStore.allTests.map((test) => {
              return (
                <TestCard
                  key={test.uuid}
                  testPreview={test}
                  createdAtTooltip={LanguageService.allTrainings.trainingCard.createdAt[language]}
                  updatedAtTooltip={LanguageService.allTrainings.trainingCard.updatedAt[language]}
                />
              );
            })
            }
          </HorizontalGridContainer>
        }
        {allTestsPageStore.getIsMoreTestsExist &&
        <Button
          value={LanguageService.allTests.loadMoreButton[language]}
          onClick={() => allTestsPageStore.loadMoreTests(allTestsPageSettings.testName)}
          buttonType={ButtonType.SECONDARY}
          className={styles.loadMoreButton}
        />
        }
      </div>
    </VerticalContainer>
  );
});
