import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';
import { Calendar, BarChart2 } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressChart = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // ダミーデータを生成
    const generateDummyData = () => {
      const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
      const plannedProgress = [10, 25, 40, 60, 80, 100];
      const actualProgress = [8, 22, 35, 55, 70, 85];

      return {
        labels,
        datasets: [
          {
            label: t('plannedProgress'),
            data: plannedProgress,
            borderColor: 'rgb(74, 144, 226)',
            backgroundColor: 'rgba(74, 144, 226, 0.5)',
          },
          {
            label: t('actualProgress'),
            data: actualProgress,
            borderColor: 'rgb(245, 166, 35)',
            backgroundColor: 'rgba(245, 166, 35, 0.5)',
          },
        ],
      };
    };

    setChartData(generateDummyData());
  }, [t]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: t('projectProgress'),
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <BarChart2 className="mr-2" />
          {t('progressChart')}
        </h2>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="mr-1" />
          {t('lastUpdated')}: {new Date().toLocaleDateString()}
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-md">
        {chartData ? (
          <Line options={options} data={chartData} />
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded-md">
          <h3 className="text-lg font-medium text-blue-700">{t('completionRate')}</h3>
          <p className="text-2xl font-bold text-blue-800">85%</p>
        </div>
        <div className="bg-orange-50 p-3 rounded-md">
          <h3 className="text-lg font-medium text-orange-700">{t('remainingTasks')}</h3>
          <p className="text-2xl font-bold text-orange-800">12</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;