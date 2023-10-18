import {HeadingLevel, Title} from "src/component/title/Title";
import {AllWaysTable} from "src/logic/allWaysPage/allWaysTable/AllWaysTable";

/**
 * Ways page
 */
export const AllWaysPage = () => {
  return (
    <div>
      <Title
        level={HeadingLevel.h2}
        text="Ways page"
      />
      <AllWaysTable />
    </div>
  );
};
