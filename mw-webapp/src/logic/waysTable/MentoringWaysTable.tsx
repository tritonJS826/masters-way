import {useEffect, useState} from "react";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {columnHelper, getFirstName, WAY_MENTORS, waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";

/**
 * Mentoring Ways table props
 */
interface MentoringWaysTableProps {

  /**
   * User uuid
   */
  uuid: string;

  /**
   * User's mentoring ways
   */
  mentoringWays: WayPreview[];

  /**
   * Is current authorized user is owner of current page
   */
  isPageOwner: boolean;
}

/**
 * Render table of mentoring ways preview
 */
export const MentoringWaysTable = (props: MentoringWaysTableProps) => {
  const [mentoringWays, setMentoringWays] = useState<WayPreview[]>(props.mentoringWays);

  useEffect(() => {
    setMentoringWays(props.mentoringWays);
  }, [props.mentoringWays]);

  if (!props.isPageOwner) {
    return (
      <>
        <Title
          text={`Mentoring Ways (total amount: ${mentoringWays.length} ways)`}
          level={HeadingLevel.h2}
        />
        <WaysTable
          data={mentoringWays}
          columns={waysColumns}
        />
      </>
    );
  }

  const mentorsColumn = columnHelper.accessor("mentors", {
    header: WAY_MENTORS,

    /**
     * Cell with current mentors
     */
    cell: ({row}) => {
      return (
        <VerticalContainer>
          {row.original.mentors.map((mentor) => {
            return (
              <Link
                key={mentor.uuid}
                path={pages.user.getPath({uuid: mentor.uuid})}
                value={getFirstName(mentor.name)}
              />
            );
          })}
        </VerticalContainer>
      );
    },
  });

  const mentoringWaysTableColumns = waysColumns.map(column => {
    return column.header === WAY_MENTORS ? mentorsColumn : column;
  });

  return (
    <>
      <Title
        text={`Mentoring Ways (total amount: ${mentoringWays.length} ways)`}
        level={HeadingLevel.h2}
      />
      <WaysTable
        data={mentoringWays}
        columns={mentoringWaysTableColumns}
      />
    </>
  );
};
