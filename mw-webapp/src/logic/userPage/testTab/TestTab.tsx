import {observer} from "mobx-react-lite";
import {CollectionCard} from "src/component/collectionCard/CollectionCard";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Infotip} from "src/component/infotip/Infotip";
import {Loader} from "src/component/loader/Loader";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {useStore} from "src/hooks/useStore";
import {DefaultTestCollection} from "src/logic/userPage/DefaultTrainingCollection";
import {Tests} from "src/logic/userPage/tests/Tests";
import {GetTestsByUserIdParams, TestTabStore} from "src/logic/userPage/testTab/TestTabStore";
import {LanguageService} from "src/service/LanguageService";
import {View} from "src/utils/LocalStorageWorker";
import styles from "src/logic/userPage/testTab/TestTab.module.scss";

/**
 * TestTab props
 */
interface TestTabProps {

  /**
   * If true - then user is page owner
   */
  isPageOwner: boolean;

  /**
   * User page owner uuid
   */
  userPageOwnerUuid: string;

  /**
   * Onclick triggered on Collection click
   */
  onClick: (testCollection: DefaultTestCollection) => void;

  /**
   * Active test collection uuid
   */
  activeTestCollection: DefaultTestCollection;

  /**
   * Test previews view
   */
  view: View;

  /**
   * Callback to change view
   */
  setView: (view: View) => void;

}

/**
 * Test tab content
 */
export const TestTab = observer((props: TestTabProps) => {
  const {language} = languageStore;
  const {theme} = themeStore;

  const testTabStore = useStore<
  new (params: GetTestsByUserIdParams) => TestTabStore,
  [string], TestTabStore>({
      storeForInitialize: TestTabStore,
      dataForInitialization: [
        {
          userId: props.userPageOwnerUuid,
          testsType: props.activeTestCollection,
        },
      ],
      dependency: [props.userPageOwnerUuid],
    });

  if (!testTabStore.isInitialized) {
    return (
      <HorizontalContainer className={styles.testLoaderWrapper}>
        <Loader theme={theme} />
      </HorizontalContainer>
    );
  }

  return (
    <HorizontalContainer className={styles.tabsSectionContainerTests}>
      <VerticalContainer className={styles.collectionGroup}>
        <HorizontalContainer className={styles.testTitle}>
          <Infotip content={LanguageService.user.infotip.basicTestCollections[language]} />
          <Title
            level={HeadingLevel.h2}
            text={LanguageService.user.tests.defaultTestCollections[language]}
            placeholder=""
          />
        </HorizontalContainer>
        <HorizontalGridContainer className={styles.tabsSection}>
          <CollectionCard
            isActive={props.activeTestCollection === DefaultTestCollection.OWN}
            collectionTitle={LanguageService.user.tests.own[language]}
            collectionsAmount={testTabStore.testCollectionsAmount.own}
            collectionAmountTitle={LanguageService.user.tabs.tests[language]}
            onClick={() => {
              props.onClick(DefaultTestCollection.OWN);
              testTabStore.loadTestsPreview({
                testsType: DefaultTestCollection.OWN,
                userId: props.userPageOwnerUuid,
              });
            }}
            language={language}
          />

          <CollectionCard
            isActive={props.activeTestCollection === DefaultTestCollection.PASSED}
            collectionTitle={LanguageService.user.tests.passed[language]}
            collectionsAmount={testTabStore.testCollectionsAmount.passed}
            collectionAmountTitle={LanguageService.user.tabs.tests[language]}
            onClick={() => {
              props.onClick(DefaultTestCollection.PASSED);
              testTabStore.loadTestsPreview({
                testsType: DefaultTestCollection.PASSED,
                userId: props.userPageOwnerUuid,
              });
            }}
            language={language}
          />
        </HorizontalGridContainer>

      </VerticalContainer>
      <Tests
        // This check need to translate default trainings collection and don't translate custom collections
        title={LanguageService.user.tests[
            props.activeTestCollection.toLowerCase() as keyof typeof LanguageService.user.tests
        ][language]
        }
        tests={testTabStore.testsPreview}
        view={props.view}
        setView={(view: View) => props.setView(view)}
        isPageOwner={props.isPageOwner}
      />
    </HorizontalContainer>
  );
});
