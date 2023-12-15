import {useEffect, useState} from "react";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {PropsWithUuid} from "src/logic/waysTable/OwnWaysTable";
import {waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Render table of favorite ways preview
 */
export const FavoriteWaysTable = (props: PropsWithUuid) => {
  const [favoriteWays, setFavoriteWays] = useState<WayPreview[]>([]);

  /**
   * Load User Favorite ways
   */
  const loadFavoriteWays = async () => {
    const data = await WayPreviewDAL.getUserWaysPreview(props.uuid, "Favorite");
    setFavoriteWays(data);
  };

  useEffect(() => {
    loadFavoriteWays();
  }, []);

  return (
    <WaysTable
      data={favoriteWays}
      columns={waysColumns}
    />
  );
};
