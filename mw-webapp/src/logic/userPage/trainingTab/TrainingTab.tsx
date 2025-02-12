import {useNavigate} from "react-router-dom";
import clsx from "clsx";
import {trainingAccessIds} from "cypress/accessIds/trainingsAccessIds";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {CollectionCard} from "src/component/collectionCard/CollectionCard";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Loader} from "src/component/loader/Loader";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {TrainingDAL} from "src/dataAccessLogic/TrainingDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {useStore} from "src/hooks/useStore";
import {Trainings} from "src/logic/userPage/trainings/Trainings";
import {GetTrainingsByUserIdParams, TrainingTabStore} from "src/logic/userPage/trainingTab/TrainingTabStore";
import {DefaultTrainingCollection} from "src/logic/userPage/UserPage";
import {pages} from "src/router/pages";
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
  const navigate = useNavigate();

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

  /**
   * Create training
   */
  const createTraining = async () => {
    const newTraining = await TrainingDAL.createTraining({
      name: "New training name",
      description: "",
      isPrivate: false,
    });

    navigate(pages.training.getPath({uuid: newTraining.uuid}));

    // Const newTrainingPreview = new ProjectPreview({
    //   ...newTraining,
    //   userIds: newTraining.users.map(participant => participant.uuid),
    // });

    // user.addProject(newTrainingPreview);
    // userPageOwner.addProject(newTrainingPreview);
  };

  if (!trainingTabStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  return (
    <VerticalContainer>
      <HorizontalGridContainer className={clsx(styles.tabsSectionContainer, styles.tabsSection)}>
        <CollectionCard
          isActive={props.activeTrainingCollection === DefaultTrainingCollection.OWN}
          collectionTitle={LanguageService.user.trainings.owner[language]}
          collectionsAmount={0}
          collectionAmountTitle={LanguageService.user.tabs.trainings[language]}
          onClick={() => props.onClick(DefaultTrainingCollection.OWN)}
          language={language}
        />

        <CollectionCard
          isActive={props.activeTrainingCollection === DefaultTrainingCollection.MENTORING}
          collectionTitle={LanguageService.user.trainings.mentor[language]}
          collectionsAmount={0}
          collectionAmountTitle={LanguageService.user.tabs.trainings[language]}
          onClick={() => props.onClick(DefaultTrainingCollection.MENTORING)}
          language={language}
        />

        <CollectionCard
          isActive={props.activeTrainingCollection === DefaultTrainingCollection.STUDENT}
          collectionTitle={LanguageService.user.trainings.student[language]}
          collectionsAmount={0}
          collectionAmountTitle={LanguageService.user.tabs.trainings[language]}
          onClick={() => props.onClick(DefaultTrainingCollection.STUDENT)}
          language={language}
        />

        <CollectionCard
          isActive={props.activeTrainingCollection === DefaultTrainingCollection.FAVORITE}
          collectionTitle={LanguageService.user.trainings.favorite[language]}
          collectionsAmount={0}
          collectionAmountTitle={LanguageService.user.tabs.trainings[language]}
          onClick={() => props.onClick(DefaultTrainingCollection.FAVORITE)}
          language={language}
        />

        {props.isPageOwner && (
          <Button
            value={LanguageService.user.trainings.addTraining[language]}
            onClick={createTraining}
            buttonType={ButtonType.SECONDARY}
            className={styles.addTrainingButton}
            dataCy={trainingAccessIds.addTrainingButton}
          />
        )}
      </HorizontalGridContainer>

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

    </VerticalContainer>
  );
});
