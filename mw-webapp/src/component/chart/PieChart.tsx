import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {observer} from "mobx-react-lite";
import {ItemStat} from "src/component/chart/ItemStat";
import {languageStore} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
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
export const PieChart = observer((props: PieChartProps) => {
  const {language} = languageStore;
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
});
