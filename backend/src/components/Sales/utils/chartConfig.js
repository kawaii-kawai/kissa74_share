export const getChartConfig = (salesByHour) => {
    const fullHourData = {};
    for (let i = 7; i < 19; i++) {
      const timeKey = `${i.toString().padStart(2, '0')}:00`;
      fullHourData[timeKey] = salesByHour[timeKey] || { total: 0, count: 0 };
    }
  
    const timeData = {
      labels: Object.keys(fullHourData),
      datasets: [
        {
          label: '売上金額 (¥)',
          data: Object.values(fullHourData).map(data => data.total),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          tension: 0.1,
          fill: true
        },
        {
          label: '注文件数',
          data: Object.values(fullHourData).map(data => data.count),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          tension: 0.1,
          fill: true,
          yAxisID: 'count'
        }
      ]
    };
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              if (context.dataset.label === '売上金額 (¥)') {
                return `${context.dataset.label}: ¥${context.raw.toLocaleString()}`;
              }
              return `${context.dataset.label}: ${context.raw}件`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: true
          },
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: '売上金額 (¥)'
          }
        },
        count: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: '注文件数'
          },
          grid: {
            drawOnChartArea: false
          }
        }
      }
    };
  
    return { timeData, chartOptions };
  };