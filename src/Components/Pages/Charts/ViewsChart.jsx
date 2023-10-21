import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

function ChartComponent({ data }) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const labels = data.map(item => item.date.substring(0, 10));
    const views = data.map(item => item.views);

    if (chartInstance) {
      // If a chart instance already exists, destroy it before creating a new one.
      chartInstance.destroy();
    }

    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Views',
            data: views,
            borderColor: 'white',
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            grid: {
              color: 'green', // Change the color of the horizontal grid lines
            },
          },
        },
      },
    });

    // Set the new chart instance in the state.
    setChartInstance(newChartInstance);
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
}

export default ChartComponent;
