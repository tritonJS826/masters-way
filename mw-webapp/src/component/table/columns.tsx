import {useState} from "react";
import {CellContext, ColumnDef, createColumnHelper} from "@tanstack/react-table";
import {Input} from "src/component/input/Input";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {DayReportDTO} from "src/model/firebaseCollection/DayReportDTO";
import {JobDoneDTO} from "src/model/firebaseCollection/JobDoneDTO";
import {TimeUnit} from "src/model/firebaseCollection/time/timeUnit/TimeUnit";
import {DayReportService} from "src/service/DayReportService";
import {JobDoneService} from "src/service/JobDoneService";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/component/table/columns.module.scss";

const INDEX_OF_CHECK_MARK = 0;
const DEFAULT_SUMMARY_TIME = 0;

const columnHelper = createColumnHelper<DayReport>();

const getObjectArrayItem = (arrayItem: JobDone | PlanForNextPeriod | CurrentProblem, getFullItem?: string) => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(getFullItem);
  const handleDoubleClick = () => {
    setIsEdit(true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const updateDayReport = async () => {
    const updatedJobDone: JobDoneDTO = {
      uuid: arrayItem.uuid,
      description: text!,
      time: 30,
      timeUnit: TimeUnit.minute,
    };
    await JobDoneService.updateJobDoneDTO(updatedJobDone, arrayItem.uuid);
  };

  const handleBlur = async () => {
    setIsEdit(false);
    updateDayReport();
  };

  return (
    // (JSON.stringify(arrayItem) === "{}") ?
    //   <div />
    //   :
    //   <div key={arrayItem.uuid}>
    //     {getFullItem}
    //   </div>
    <div onDoubleClick={handleDoubleClick}>
      {isEdit ? (
        <Input
          type="text"
          value={text ?? ""}
          autoFocus={true}
          onChange={handleChange}
          onBlur={handleBlur}
          // OnKeyDown={handleEnter}
        />
      ) : (
        <span className={getFullItem![INDEX_OF_CHECK_MARK] === "✓" ? styles.completed : styles.notCompleted}>
          {text}
        </span>
      )}
    </div>
  );
};

const getStringArrayItem = (arrayItem: string, parentUuid: string) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(arrayItem);

  const handleDoubleClick = () => {
    setIsEditing(true);
    // eslint-disable-next-line no-console
    console.log(parentUuid);
  };

  const updateDayReport = async () => {
    const updatedDayReport: DayReportDTO = {
      uuid: parentUuid,
      date: "2023-01-01",
      jobsDone: [],
      plansForNextPeriod: [],
      problemsForCurrentPeriod: [],
      studentComments: [`${text}`],
      learnedForToday: [""],
      mentorComments: [""],
      isDayOff: false,
    };
    await DayReportService.updateDayReportDTO(updatedDayReport, parentUuid);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBlur = async () => {
    setIsEditing(false);
    updateDayReport();
  };

  const handleEnter = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      updateDayReport();
      setIsEditing(false);
    }
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <Input
          type="text"
          value={text}
          autoFocus={true}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleEnter}
        />
      ) : (
        <span className={arrayItem[INDEX_OF_CHECK_MARK] === "✓" ? styles.completed : styles.notCompleted}>
          {text}
        </span>
      )}
    </div>
  );
};

const getBoolean = (cellValue: CellContext<DayReport, boolean>) => {
  return (
    cellValue.getValue() === true ?
      <div>
        Yes
      </div>
      :
      <div>
        No
      </div>
  );
};

const getDateValue = (cellValue: CellContext<DayReport, Date>) => {
  return (
    DateUtils.getShortISODateValue(cellValue.getValue())
  );
};

export const columns: ColumnDef<DayReport, Date & JobDone[] & PlanForNextPeriod[] & CurrentProblem[] & string[] & boolean>[] = [
  columnHelper.accessor<"date", Date>("date", {
    header: "Date",
    cell: (dateValue) => getDateValue(dateValue),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Sum time",
    cell: (({row}) => {
      return (
        row.original.jobsDone
          ?.reduce((summaryTime, jobDone) => jobDone.time + summaryTime, DEFAULT_SUMMARY_TIME)
      );
    }),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Jobs done",
    cell: ({row}) => {
      return (
        row.original.jobsDone
          ?.map((jobDoneItem) => (getObjectArrayItem(jobDoneItem, jobDoneItem.getJobDone())))
      );
    },
  }),
  columnHelper.accessor<"plansForNextPeriod", PlanForNextPeriod[]>("plansForNextPeriod", {
    header: "Plans for tomorrow",
    cell: ({row}) => {
      return (
        row.original.plansForNextPeriod
          ?.map((planForNextPeriodItem) =>
            (getObjectArrayItem(planForNextPeriodItem, planForNextPeriodItem.getPlanForNextPeriod())))
      );
    },
  }),
  columnHelper.accessor<"problemsForCurrentPeriod", CurrentProblem[]>("problemsForCurrentPeriod", {
    header: "Current problems",
    cell: ({row}) => {
      return (
        row.original.problemsForCurrentPeriod
          ?.map((currentProblemItem) =>
            (getObjectArrayItem(currentProblemItem, currentProblemItem.description)))
      );
    },
  }),
  columnHelper.accessor<"studentComments", string[]>("studentComments", {
    header: "Student comments",
    cell: ({row}) => {
      const parentID = row.original.uuid;
      return (
        row.original.studentComments
          ?.map((studentCommentItem) => (getStringArrayItem(studentCommentItem, parentID)))
      );
    },
  }),
  columnHelper.accessor<"learnedForToday", string[]>("learnedForToday", {
    header: "Learned for today",
    cell: ({row}) => {
      const parentID = row.original.uuid;
      return (
        row.original.learnedForToday
          ?.map((learnedForTodayItem) => (getStringArrayItem(learnedForTodayItem, parentID)))
      );
    },
  }),
  columnHelper.accessor<"mentorComments", string[]>("mentorComments", {
    header: "Mentor comments",
    cell: ({row}) => {
      const parentID = row.original.uuid;
      return (
        row.original.mentorComments
          ?.map((mentorCommentItem) => (getStringArrayItem(mentorCommentItem, parentID)))
      );
    },
  }),
  columnHelper.accessor<"isDayOff", boolean>("isDayOff", {
    header: "Is day off",
    cell: (isDAyOffValue) => getBoolean(isDAyOffValue),
  }),
];
