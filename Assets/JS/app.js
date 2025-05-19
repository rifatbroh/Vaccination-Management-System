const getChartOptions = () => ({
  series: [35.1, 23.5, 2.4, 5.4],
  colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
  chart: {
    height: 320,
    width: "100%",
    type: "donut",
  },
  stroke: {
    colors: ["transparent"],
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: { show: true, offsetY: 20 },
          total: {
            show: true,
            label: "Unique visitors",
            formatter: function (w) {
              const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              return '$' + sum + 'k';
            },
          },
          value: {
            show: true,
            offsetY: -20,
            formatter: (val) => val + 'k',
          },
        },
        size: "80%",
      },
    },
  },
  labels: ["Phizer", "Convox", "Znova", "Mordana"],
  dataLabels: { enabled: false },
  legend: {
    position: "bottom",
  },
  grid: {
    padding: { top: -2 },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("donut-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("donut-chart"), getChartOptions());
    chart.render();

    const checkboxes = document.querySelectorAll('#devices input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (event) => {
        const value = event.target.value;
        if (event.target.checked) {
          switch (value) {
            case 'desktop':
              chart.updateSeries([15.1, 22.5, 4.4, 8.4]); break;
            case 'tablet':
              chart.updateSeries([25.1, 26.5, 1.4, 3.4]); break;
            case 'mobile':
              chart.updateSeries([45.1, 27.5, 8.4, 2.4]); break;
            default:
              chart.updateSeries([55.1, 28.5, 1.4, 5.4]);
          }
        } else {
          chart.updateSeries([35.1, 23.5, 2.4, 5.4]);
        }
      });
    });
  }
});