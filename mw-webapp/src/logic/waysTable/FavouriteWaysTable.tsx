import {useEffect, useState} from "react";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {columns} from "src/logic/waysTable/columns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Favourite ways table props
 */
interface FavouriteWaysTableProps {

  /**
   * User Uuid
   */
  uuid: string;
}

/**
 * Render table of favourite ways preview
 */
export const FavouriteWaysTable = (props: FavouriteWaysTableProps) => {
  const [favouriteWays, setFavouriteWays] = useState<WayPreview[]>([]);

  /**
   * Load User Favourite ways
   */
  const loadFavouriteWays = async () => {
    const data = await WayPreviewDAL.getUserWaysPreview(props.uuid, "Favourite");
    setFavouriteWays(data);
  };

  useEffect(() => {
    loadFavouriteWays();
  }, []);

  return (
    <WaysTable
      data={favouriteWays}
      columns={columns}
    />
  );
};