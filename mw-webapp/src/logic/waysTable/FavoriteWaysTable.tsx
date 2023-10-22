import {useEffect, useState} from "react";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {columns} from "src/logic/waysTable/columns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Favorite ways table props
 */
interface FavoriteWaysTableProps {

  /**
   * User Uuid
   */
  uuid: string;
}

/**
 * Render table of favorite ways preview
 */
export const FavoriteWaysTable = (props: FavoriteWaysTableProps) => {
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
      columns={columns}
    />
  );
};