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
import {Trainings} from "src/logic/userPage/trainings/Trainings";
import {GetTrainingsByUserIdParams, TrainingTabStore} from "src/logic/userPage/trainingTab/TrainingTabStore";
import {DefaultTrainingCollection} from "src/logic/userPage/UserPage";
import {LanguageService} from "src/service/LanguageService";
import {View} from "src/utils/LocalStorageWorker";
import styles from "src/logic/userPage/trainingTab/TrainingTab.module.scss";

/**
 * TrainingTab props
 */
interface TrainingTabProps {

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
  onClick: (trainingCollection: DefaultTrainingCollection) => void;

  /**
   * Active training collection uuid
   */
  activeTrainingCollection: DefaultTrainingCollection;

  /**
   * Training previews view
   */
  view: View;

  /**
   * Callback to change view
   */
  setView: (view: View) => void;

}

/**
 * Training tab content
 */
export const TrainingTab = observer((props: TrainingTabProps) => {
  const {language} = languageStore;
  const {theme} = themeStore;

  const trainingTabStore = useStore<
  new (params: GetTrainingsByUserIdParams) => TrainingTabStore,
  [string], TrainingTabStore>({
      storeForInitialize: TrainingTabStore,
      dataForInitialization: [
        {
          userId: props.userPageOwnerUuid,
          trainingsType: props.activeTrainingCollection,
        },
      ],
      dependency: [props.userPageOwnerUuid],
    });

  if (!trainingTabStore.isInitialized) {
    return (
      <Loader theme={theme} />
    );
  }

  return (
    <HorizontalContainer className={styles.tabsSectionContainerTrainings}>
      <VerticalContainer className={styles.collectionGroup}>
        <HorizontalContainer className={styles.trainingTitle}>
          <Infotip content={LanguageService.user.infotip.basicTrainingCollections[language]} />
          <Title
            level={HeadingLevel.h2}
            text={LanguageService.user.trainings.defaultTrainingCollections[language]}
            placeholder=""
          />
        </HorizontalContainer>
        <HorizontalGridContainer className={styles.tabsSection}>
          <CollectionCard
            isActive={props.activeTrainingCollection === DefaultTrainingCollection.OWN}
            collectionTitle={LanguageService.user.trainings.owner[language]}
            collectionsAmount={0}
            collectionAmountTitle={LanguageService.user.tabs.trainings[language]}
            onClick={() => {
              props.onClick(DefaultTrainingCollection.OWN);
              trainingTabStore.loadTrainingsPreview({
                trainingsType: DefaultTrainingCollection.OWN,
                userId: props.userPageOwnerUuid,
              });
            }}
            language={language}
          />

          <CollectionCard
            isActive={props.activeTrainingCollection === DefaultTrainingCollection.MENTORING}
            collectionTitle={LanguageService.user.trainings.mentor[language]}
            collectionsAmount={0}
            collectionAmountTitle={LanguageService.user.tabs.trainings[language]}
            onClick={() => {
              props.onClick(DefaultTrainingCollection.MENTORING);
              trainingTabStore.loadTrainingsPreview({
                trainingsType: DefaultTrainingCollection.MENTORING,
                userId: props.userPageOwnerUuid,
              });
            }}
            language={language}
          />

          <CollectionCard
            isActive={props.activeTrainingCollection === DefaultTrainingCollection.STUDENT}
            collectionTitle={LanguageService.user.trainings.student[language]}
            collectionsAmount={0}
            collectionAmountTitle={LanguageService.user.tabs.trainings[language]}
            onClick={() => {
              props.onClick(DefaultTrainingCollection.STUDENT);
              trainingTabStore.loadTrainingsPreview({
                trainingsType: DefaultTrainingCollection.STUDENT,
                userId: props.userPageOwnerUuid,
              });
            }}
            language={language}
          />

          <CollectionCard
            isActive={props.activeTrainingCollection === DefaultTrainingCollection.FAVORITE}
            collectionTitle={LanguageService.user.trainings.favorite[language]}
            collectionsAmount={0}
            collectionAmountTitle={LanguageService.user.tabs.trainings[language]}
            onClick={() => {
              props.onClick(DefaultTrainingCollection.FAVORITE);
              trainingTabStore.loadTrainingsPreview({
                trainingsType: DefaultTrainingCollection.FAVORITE,
                userId: props.userPageOwnerUuid,
              });
            }}
            language={language}
          />

        </HorizontalGridContainer>

      </VerticalContainer>
      <Trainings
        // This check need to translate default trainings collection and don't translate custom collections
        title={LanguageService.user.trainings[
            props.activeTrainingCollection.toLowerCase() as keyof typeof LanguageService.user.trainings
        ][language]
        }
        trainings={trainingTabStore.trainingsPreview}
        view={props.view}
        setView={(view: View) => props.setView(view)}
        isPageOwner={props.isPageOwner}
      />
    </HorizontalContainer>
  );
});
