import {observer} from "mobx-react-lite";
import {Loader} from "src/component/loader/Loader";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {TrainingPageStore} from "src/logic/trainingPage/TrainingPageStore";

/**
 * PageProps
 */
interface TrainingPageProps {

  /**
   * Page's uuid
   */
  uuid: string;
}

/**
 * Training page
 */
export const TrainingPage = observer((props: TrainingPageProps) => {
  const {language} = languageStore;
  const {theme} = themeStore;
  const {user} = userStore;
  const trainingPageStore = useStore<
  new (trainingUuid: string) => TrainingPageStore,
  [string], TrainingPageStore>({
      storeForInitialize: TrainingPageStore,
      dataForInitialization: [props.uuid],
      dependency: [props.uuid],
    });

  if (!trainingPageStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const isOwner = !!user && user.uuid === trainingPageStore.training.owner.uuid;

  return (
    <h1 style={{color: "red", marginTop: "200px"}}>
      Hello
    </h1>
  );
});
