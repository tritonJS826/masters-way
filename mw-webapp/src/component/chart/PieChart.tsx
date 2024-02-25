import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Job done tags used",
    },
  },
};

/**
 * Chart props
 */
interface PieChartProps {

  /**
   * Start date
   */
  startDate: Date;

  /**
   * Last date
   */
  lastDate: Date;

  /**
   * All tag statistics
   */
  tagStats: JobTagStat[];

}

/**
 * Pie chart component
 */
export const PieChart = (props: PieChartProps) => {
  const labels = props.tagStats.map((tag) => tag.jobTag.name);

  const jobTagsBackgroundColors = props.tagStats.map((tag) => tag.jobTag.color);
  const jobTagsTotalTime = props.tagStats.map((tag) => tag.totalTime);

  const data = {
    labels,
    datasets: [
      {
        label: "Time",
        data: jobTagsTotalTime,
        backgroundColor: jobTagsBackgroundColors,
      },
    ],
  };

  return (
    <Pie
      options={options}
      data={data}
    />
  );
};
