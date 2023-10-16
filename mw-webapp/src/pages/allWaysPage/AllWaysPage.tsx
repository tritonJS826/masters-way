import {useEffect, useState} from "react";
import {WayDTO} from "src/model/DTOModel/WayDTO";
import {ReportsTable} from "src/pages/reportsTable/ReportsTable";
import {WayService} from "src/service/WayService";

/**
 * Page with all Ways
 */
export const AllWaysPage = () => {
  const [ways, setWays] = useState<WayDTO[] | null>(null);

  /**
   * Get all ways
   */
  const getAllWays = async () => {
    const waysDTO = await WayService.getWaysDTO();
    setWays(waysDTO);
  };

  useEffect(() => {
    getAllWays();
  }, []);

  return (
    <div>
      {ways
        ? (
          ways.map((way) => (
            <>
              <h4>
                Table for
                &quot;
                {way.uuid}
                &quot;
                way
              </h4>
              <ReportsTable
                wayUuid={way.uuid}
                key={way.uuid}
              />
            </>
          ))
        )
        : (
          null
        )}
    </div>
  );
};
