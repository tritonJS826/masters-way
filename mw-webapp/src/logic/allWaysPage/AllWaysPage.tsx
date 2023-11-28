import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {AllWaysTable} from "src/logic/waysTable/AllWaysTable";

/**
 * Ways page
 */
export const AllWaysPage = () => {
  return (
    <>
      <Title
        level={HeadingLevel.h2}
        text="Ways page"
      />
      <ScrollableBlock>
        <AllWaysTable />
      </ScrollableBlock>
    </>
  );
};
