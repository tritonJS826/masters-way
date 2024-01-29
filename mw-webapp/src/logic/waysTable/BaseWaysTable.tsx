import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Loader} from "src/component/loader/Loader";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import styles from "src/logic/waysTable/BaseWaysTable.module.scss";

/**
 * Favorite ways table props
 */
interface BaseWaysTableProps {

  /**
   * User's favorite ways preview
   */
  wayUuids: string[];

  /**
   * Table title
   */
  title: string;
}

/**
 * Callback that is called to fetch data
 */
const loadWays = async (wayUuids: string[]): Promise<WayPreview[]> => {
  const waysPreview = await WayPreviewDAL.getWaysPreviewByUuids(Array.from(wayUuids));

  return waysPreview;
};

/**
 * Callback that is called to validate data
 */
const validateData = (data: WayPreview[]) => {
  return !!data;
};

/**
 * Render table of favorite ways preview
 */
export const BaseWaysTable = (props: BaseWaysTableProps) => {
  const [ways, setWays] = useState<WayPreview[]>();
  const navigate = useNavigate();

  useLoad(
    {

      /**
       * Load ways
       */
      loadData: () => loadWays(props.wayUuids),
      validateData,
      onSuccess: setWays,

      /**
       * Error handler (in case of invalid data)
       */
      onError: () => navigate(pages.page404.getPath({})),
      dependency: [props],
    },
  );

  if (!ways) {
    return (
      <VerticalContainer className={styles.loaderWrapper}>
        <Loader />
      </VerticalContainer>
    );
  }

  return (
    <>
      <Title
        text={`${props.title} (${props.wayUuids.length})`}
        level={HeadingLevel.h2}
      />
      <WaysTable
        data={ways}
        columns={waysColumns}
      />
    </>
  );
};
