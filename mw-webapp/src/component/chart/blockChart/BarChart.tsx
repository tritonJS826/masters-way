import React from "react";
import {Bar} from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  // ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import {ItemStat} from "src/component/chart/ItemStat";
// Import {useGlobalContext} from "src/GlobalContext";
// import {LanguageService} from "src/service/LangauageService";
import styles from "src/component/chart/blockChart/BarChart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

/**
 * Chart props
 */
interface BarChartProps {

  /**
   * Label inside section description
   */
  label: string;

  /**
   * All items data
   */
  itemStats: ItemStat[];

}

/**
 * Pie chart component (Similar radar chart)
 */
export const BarChart = (props: BarChartProps) => {
  // Const {language} = useGlobalContext();

  const dataSet = props.itemStats.map((itemStat) => {
    return {
      label: itemStat.name,
      data: [itemStat.value],
      borderColor: itemStat.color,
      backgroundColor: itemStat.color,
    };
  });

  const data = {
    labels: [""],
    datasets: dataSet,
  };

  // Const primaryChartColor = getComputedStyle(document.body).getPropertyValue("--primaryTextColor");
  // ChartOptions
  const options = {
    indexAxis: "y" as const,
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    // Responsive: true,
    plugins: {
      legend: {
        position: "left" as const,
        display: false,
      },
      title: {
        padding: 1,
        display: true,
        text: "",
        // Text: LanguageService.way.statisticsBlock.jobDoneTagsUsed[language],
        // color: primaryChartColor,
      },
    },
  };

  return (
    <div className={styles.barChartContainer}>
      <Bar
        className={styles.barChart}
        options={options}
        data={data}
      />
    </div>
  );
};
