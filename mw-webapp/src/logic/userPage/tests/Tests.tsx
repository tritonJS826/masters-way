
import {useNavigate} from "react-router-dom";
import {testsAccessIds} from "cypress/accessIds/testsAccessIds";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Loader} from "src/component/loader/Loader";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {TestCard} from "src/component/testCard/TestCard";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {renderViewCardOption, renderViewTableOption, ViewSwitcher} from "src/component/viewSwitcher/ViewSwitcher";
import {TestDAL} from "src/dataAccessLogic/TestDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {getTestsColumns} from "src/logic/testsTable/testsColumns";
import {TestsTable} from "src/logic/testsTable/TestsTable";
import {TestPreview} from "src/model/businessModelPreview/TestPreview";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {View} from "src/utils/LocalStorageWorker";
import styles from "src/logic/userPage/tests/Tests.module.scss";

/**
 * Tests preview props
 */
interface TestsProps {

  /**
   * User's tests preview
   */
  tests: TestPreview[];

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
   * Owner uuid
   */
  ownerUuid?: string;

  /**
   * Callback to change view
   */
  setView: (view: View) => void;

}

/**
 * Render tests preview
 */
export const Tests = observer((props: TestsProps) => {
  const {language} = languageStore;
  const {theme} = themeStore;
  const navigate = useNavigate();

  if (!props.tests) {
    return (
      <VerticalContainer className={styles.loaderWrapper}>
        <Loader
          theme={theme}
          isAbsolute
        />
      </VerticalContainer>
    );
  }

  /**
   * Create test
   */
  const createTest = async () => {

    if (!props.ownerUuid) {
      throw new Error("User is not defined");
    }

    const newTest = await TestDAL.createTest({
      name: "New test name",
      description: "",
      isPrivate: false,
      ownerUuid: props.ownerUuid,
    });

    navigate(pages.editTest.getPath({uuid: newTest.uuid}));
  };

  return (
    <VerticalContainer className={styles.testsContainer}>
      <HorizontalContainer className={styles.filterView}>
        {props.isPageOwner &&
        <Button
          value={LanguageService.user.tests.addTest[language]}
          onClick={createTest}
          buttonType={ButtonType.PRIMARY}
          dataCy={testsAccessIds.addTestButton}
        />
        }
        <ViewSwitcher
          view={props.view}
          className={styles.viewSwitcher}
          setView={props.setView}
          options={[
            renderViewCardOption(LanguageService.common.view.cardViewTooltip[language]),
            renderViewTableOption(LanguageService.common.view.tableViewTooltip[language]),
          ]}
        />
      </HorizontalContainer>

      <Title
        text={`${props.title} (${props.tests.length})`}
        level={HeadingLevel.h2}
        placeholder=""
      />

      <VerticalContainer className={styles.testsContent}>

        {props.view === View.Table ?
          <ScrollableBlock>
            <TestsTable
              data={props.tests}
              columns={getTestsColumns(language)}
            />
          </ScrollableBlock>
          :
          <HorizontalGridContainer className={styles.trainingCards}>
            {props.tests.map((test) => {
              return (
                <TestCard
                  key={test.uuid}
                  testPreview={test}
                  createdAtTooltip={LanguageService.allTests.testCard.createdAt[language]}
                  updatedAtTooltip={LanguageService.allTests.testCard.updatedAt[language]}
                />
              );
            })
            }
          </HorizontalGridContainer>
        }
      </VerticalContainer>
    </VerticalContainer>
  );
});
