import {HeadingLevel, Title} from "src/component/title/Title";
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
  favoriteWays: WayPreview[];

}

/**
 * Render table of favorite ways preview
 */
export const FavoriteWaysTable = (props: FavoriteWaysTableProps) => {
  return (
    <>
      <Title
        text={`Favorite Ways (total amount: ${props.favoriteWays.length} ways)`}
        level={HeadingLevel.h2}
      />
      <WaysTable
        data={props.favoriteWays}
        columns={waysColumns}
      />
    </>
  );
};
