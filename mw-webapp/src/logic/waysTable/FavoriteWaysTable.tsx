import {useEffect, useState} from "react";
import {HeadingLevel, Title} from "src/component/title/Title";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Own ways table props
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
  const userPreviewUuid = props.uuid;

  /**
   * Load User Favorite ways
   */
  const loadFavoriteWays = async () => {
    const data = await Promise.all(props.favoriteWayUuids.map(WayPreviewDAL.getWayPreview));
    setFavoriteWays(data);
  };

  useEffect(() => {
    loadFavoriteWays();
  }, [userPreviewUuid]);

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
