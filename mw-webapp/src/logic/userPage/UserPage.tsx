import {useParams} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {HeadingLevel, Title} from "src/component/title/Title";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";

/**
 * User page
 */
export const UserPage = () => {
  const {uuid} = useParams();

  return (
    <div>
      <Title
        level={HeadingLevel.h2}
        text="User page"
      />
      <Button
        value="Create new way"
        onClick={() => WayPreviewDAL.createWayPreview(uuid!)}
      />
    </div>
  );
};
