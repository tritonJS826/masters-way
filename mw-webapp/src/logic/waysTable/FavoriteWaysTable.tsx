import {useState} from "react";
import {displayNotification} from "src/component/notification/Notification";
import {HeadingLevel, Title} from "src/component/title/Title";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Favorite ways table props
 */
interface FavoriteWaysTableProps {

  /**
   * User's uuid
   */
  uuid: string;

  /**
   * User's favorite way uuids
   */
  favoriteWayUuids: string[];

}

/**
 * Render table of favorite ways preview
 */
export const FavoriteWaysTable = (props: FavoriteWaysTableProps) => {
  const [favoriteWays, setFavoriteWays] = useState<WayPreview[]>([]);

  /**
   * Callback that is called to fetch data
   */
  const loadData = () => Promise.all(props.favoriteWayUuids.map(WayPreviewDAL.getWayPreview));

  /**
   * Callback that is called on fetch or validation error
   */
  const onError = (error: Error) => {
    displayNotification({text: error.message, type: "error"});
  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: WayPreview[]) => {
    setFavoriteWays(data);
  };

  useLoad(
    {
      loadData,
      onSuccess,
      onError,
      dependency: [props.favoriteWayUuids],
    },
  );

  return (
    <>
      <Title
        text={`Favorite Ways (total amount: ${favoriteWays.length} ways)`}
        level={HeadingLevel.h2}
      />
      <WaysTable
        data={favoriteWays}
        columns={waysColumns}
      />
    </>
  );
};
