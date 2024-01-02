import {useState} from "react";
import {displayNotification} from "src/component/notification/Notification";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Props with User uuid
 */
interface PropsWithUuid {

  /**
   * User uuid
   */
  uuid: string;
}

/**
 * Render table of favorite ways preview
 */
export const FavoriteWaysTable = (props: PropsWithUuid) => {
  const [favoriteWays, setFavoriteWays] = useState<WayPreview[]>([]);

  /**
   * Callback that is called to fetch data
   */
  const loadData = () => WayPreviewDAL.getUserWaysPreview(props.uuid, "Favorite");

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
      dependency: [props.uuid],
    },
  );

  return (
    <WaysTable
      data={favoriteWays}
      columns={waysColumns}
    />
  );
};
