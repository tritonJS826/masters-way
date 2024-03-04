import {useMemo} from "react";
import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {useGlobalContext} from "src/GlobalContext";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Get options
 */
const getOptions = () => {
  const primaryChartColor = getComputedStyle(document.body).getPropertyValue("--primaryTextColor");

  const options = {
    responsive: true,
    color: primaryChartColor,
    plugins: {
      title: {
        display: true,
        text: "Job done tags used",
        color: primaryChartColor,
      },
    },
  };

  return options;

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
  const {theme} = useGlobalContext();
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

  /**
   * Now it works even without Memo because of global context.
   * After migration to some state manager this line will help us to avoid bugs
   */
  const optionsMemoized = useMemo(() => getOptions(), [theme]);

  return (
    <Pie
      options={optionsMemoized}
      data={data}
    />
  );
};
