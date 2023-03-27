import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import useTranslation from 'next-translate/useTranslation';
import { Pie } from 'react-chartjs-2';

import { CHART_COLORS } from '../../../constant';
import { BoughtProduct } from '../../../models/analysis';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  boughtProducts: BoughtProduct[];
};

const ProductsPieChart = ({ boughtProducts }: Props) => {
  const { t } = useTranslation();

  const chartData = {
    labels: boughtProducts.map((product) => product.title),
    datasets: [
      {
        label: t('num_of_sales'),
        data: boughtProducts.map((product) => product.num_of_purchase),
        backgroundColor: CHART_COLORS,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default ProductsPieChart;
