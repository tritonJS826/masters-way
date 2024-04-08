import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {ItemStat} from "src/component/chart/ItemStat";
import {useGlobalContext} from "src/GlobalContext";
import {LanguageService} from "src/service/LangauageService";
import styles from "src/component/chart/PieChart.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Chart props
 */
interface PieChartProps {

  /**
   * Label inside section description
   */
  label: string;

  /**
   * All items data
   */
  itemStat: ItemStat[];

}

/**
 * Pie chart component (Similar radar chart)
 */
export const PieChart = (props: PieChartProps) => {
  const {language} = useGlobalContext();
  const labels = props.itemStat.map((i) => i.name);
  const jobTagsBackgroundColors = props.itemStat.map((i) => i.color);
  const itemValues = props.itemStat.map((i) => i.value);

  const data = {
    labels,
    datasets: [
      {
        label: props.label,
        data: itemValues,
        backgroundColor: jobTagsBackgroundColors,
      },
    ],
  };

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
        text: LanguageService.way.statisticsBlock.jobDoneTagsUsed[language],
        color: primaryChartColor,
      },
    },
  };

  return (
    <Pie
      className={styles.pieChart}
      options={options}
      data={data}
    />
  );
};
