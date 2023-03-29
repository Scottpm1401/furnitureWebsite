import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import useTranslation from 'next-translate/useTranslation';
import { Line } from 'react-chartjs-2';

import { CHART_COLORS, MONTHS } from '../../../constant';
import { Revenue } from '../../../models/analysis';

type LineChartProps = {
  revenue: Revenue[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueLineChart = ({ revenue }: LineChartProps) => {
  const { t } = useTranslation();

  const chartData: ChartData<'line', number[], string> = {
    labels: MONTHS.map((month) => t(month)),
    datasets: revenue.map((item, index) => ({
      label: `${item.year}`,
      data: item.data.map((point) => point.revenue),
      fill: false,
      backgroundColor: CHART_COLORS[index],
      borderColor: CHART_COLORS[index],
    })),
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default RevenueLineChart;
