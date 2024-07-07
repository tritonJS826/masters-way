import {useMemo} from "react";
import {Line} from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import {observer} from "mobx-react-lite";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
);

/**
 * Get options
 */
const getOptions = () => {
  const primaryChartColor = getComputedStyle(document.body).getPropertyValue("--primaryTextColor");
  const hexColor = primaryChartColor.replace(/^#?/, "");

  const rgbColor = [0, 0, 0];
  for (let i = 0; i < hexColor.length; i++) {
    // eslint-disable-next-line no-magic-numbers
    rgbColor[i] = parseInt(hexColor[i] + (hexColor.length === 3 ? hexColor[i] : ""), 16);
  }

  // eslint-disable-next-line no-magic-numbers
  const primaryChartColorRGB = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;

  const gridColor = primaryChartColorRGB.replace("rgb", "rgba").replace(")", ", 0.2)");

  const options = {
    responsive: true,
    color: primaryChartColor,
    scales: {
      y: {
        min: 0,
        ticks: {color: primaryChartColor},
        grid: {color: gridColor},
      },
      x: {
        min: 0,
        ticks: {color: primaryChartColor},
        grid: {color: gridColor},
      },
    },
  };

  return options;
};

/**
 * Chart props
 */
interface AreaChartProps {

  /**
   * Start date
   */
  startDate: Date;

  /**
   * Last date
   */
  lastDate: Date;

  /**
   * All dates in the way with JobTotalTime
   * @key date
   * @value job done total time per day
   */
  datesWithJobTotalTime: Map<string, number>;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

}

/**
 * Area chart component
 */
export const AreaChart = observer((props: AreaChartProps) => {
  const {theme} = themeStore;
  const {language} = languageStore;

  const dateList = DateUtils.getDatesBetween(props.startDate, props.lastDate);
  const labels = dateList.map(DateUtils.getShortISODateValue);

  const dateWithJobTotalTime: Map<string, number> = new Map(labels.map((date) => {
    const jobDoneTotal = props.datesWithJobTotalTime.get(date) ?? 0;

    return [date, jobDoneTotal];
  }));

  const dataJob = Array.from(dateWithJobTotalTime.values());

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        lineTension: 0.4,
        label: LanguageService.way.statisticsBlock.totalTimeLabel[language],
        data: dataJob,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  /**
   * Now it works even without Memo because of global context.
   * After migration to some state manager this line will help us to avoid bugs
   */
  const optionsMemoized = useMemo(() =>
    getOptions(), [theme, language]);

  return (
    <Line
      options={optionsMemoized}
      data={data}
      data-cy={props.dataCy}
      style={{maxHeight: "250px"}}
    />
  );
});
