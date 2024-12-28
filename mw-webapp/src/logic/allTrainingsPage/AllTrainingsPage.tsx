import {observer} from "mobx-react-lite";
import {TrainingCard} from "src/component/trainingCard/TrainingCard";
import {languageStore} from "src/globalStore/LanguageStore";
import {TrainingPreview} from "src/model/businessModelPreview/TrainingPreview";
import {LanguageService} from "src/service/LanguageService";

/**
 * Trainings page
 */
export const AllTrainingsPage = observer(() => {
  const {language} = languageStore;

  const allTrainings: TrainingPreview[] = [];

  return (
    <div>
      {allTrainings.map((training) => {
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

      Trainings
    </div>
  );
});
