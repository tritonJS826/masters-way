import {useNavigate} from "react-router-dom";
import {trainingAccessIds} from "cypress/accessIds/trainingsAccessIds";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Loader} from "src/component/loader/Loader";
import {TrainingCard} from "src/component/trainingCard/TrainingCard";
import {TrainingDAL} from "src/dataAccessLogic/TrainingDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {useStore} from "src/hooks/useStore";
import {GetTrainingsByUserParams, TrainingTabStore} from "src/logic/userPage/trainingTab/TrainingTabStore";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
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
}

/**
 * Training tab content
 */
export const TrainingTab = observer((props: TrainingTabProps) => {
  const {language} = languageStore;
  const {theme} = themeStore;
  const navigate = useNavigate();

  const trainingTabStore = useStore<
  new (params: GetTrainingsByUserParams) => TrainingTabStore,
  [string], TrainingTabStore>({
      storeForInitialize: TrainingTabStore,
      dataForInitialization: [
        {
          userPageOwnerUuid: props.userPageOwnerUuid,
          trainingName: "",
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
    <>
      {trainingTabStore.trainingsPreview.map(training => (
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
          dataCy={trainingAccessIds.trainingCardButton}
        />
      ))}

      {props.isPageOwner && (
        <Button
          value={LanguageService.user.trainings.addTraining[language]}
          onClick={createTraining}
          buttonType={ButtonType.SECONDARY}
          className={styles.addTrainingButton}
          dataCy={trainingAccessIds.addTrainingButton}
        />
      )}
    </>
  );
});
