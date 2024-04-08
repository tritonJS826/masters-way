import {useMemo} from "react";
import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {useGlobalContext} from "src/GlobalContext";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";
import {LanguageService} from "src/service/LangauageService";
import styles from "src/component/chart/PieChart.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Get options
 */
const getOptions = (title: string) => {
  const primaryChartColor = getComputedStyle(document.body).getPropertyValue("--primaryTextColor");

  const options = {
    layout: {padding: {top: 10}},
    responsive: true,
    color: primaryChartColor,
    plugins: {
      legend: {
        position: "left" as const,
        labels: {textAlign: "left" as const},
      },
      title: {
        padding: 20,
        display: true,
        text: title,
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
  const {theme, language} = useGlobalContext();
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
  const optionsMemoized = useMemo(() => getOptions(LanguageService.way.statisticsBlock.jobDoneTagsUsed[language]), [theme]);

  return (
    <Pie
      className={styles.pieChart}
      options={optionsMemoized}
      data={data}
    />
  );
};
