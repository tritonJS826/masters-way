import {observer} from "mobx-react-lite";

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
  return (
    <div>
      {`Training ${props.uuid}`}
    </div>
  );
});
