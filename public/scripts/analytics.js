const ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {});

const generateBarChart = (dishArr) => {
  chart.destroy();
  const resultObj = createObjForBarChart(dishArr);

  const backgroundColors = ['rgb(250,213,92)', 'rgb(38,125,179)', 'rgb(133,97,200)', 'rgb(237,102,71)', 'rgb(109,219,219)', 'rgb(104,193,130)', 'rgb(150, 139, 195)', 'rgb(227,113,178)'];

  chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: resultObj.labelArr,
      datasets: [{
        backgroundColor: backgroundColors,
        // borderColor: 'rgb(255, 99, 132)',
        data: resultObj.sumArr
      }]
    },

    // Configuration options go here
    options: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Total Poutine Sales'
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Quantity'
          },
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Dishes'
          },
        }]
      }
    }
  });

};

// create a obj with 2 arrays
// labelArr and sumArr for barChart
const createObjForBarChart = (dishArr) => {
  const labelArr = [];
  const sumArr = [];

  for (let dish of dishArr) {
    labelArr.push(dish.name);
    sumArr.push(Number(dish.sum));
  }

  return {
    labelArr,
    sumArr
  };
};

// ajax GET request to get all ordered dishes
const getOverallSales = () => {
  $.get('/admin/analytics/overall_sales', function(overallSalesData) {
    generateBarChart(overallSalesData);
  })
    .done(() => console.log('Done with AJAX GET overallsales request'))
    .fail(() => console.log('Oops! Problem with GET overallsales request'));
};

const getMonth = (numStr) => {
  const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };

  return months[numStr];
};

const createObjForLineChart = (salesByMonthsData) => {
  const months = [];
  const data = [];

  for (let monthData of salesByMonthsData) {
    months.push(getMonth(monthData.month.substring(5, 7)));
    data.push(monthData.sum);
  }

  return {
    months,
    data
  };
};

const generateLineChart = (salesByMonthsData) => {
  const resultObj = createObjForLineChart(salesByMonthsData);

  chart.destroy();

  chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: resultObj.months,
      datasets: [{
        // backgroundColor: 'rgb(0,48,107)',
        data: resultObj.data,
        borderColor: '#55bae7',
        fill: false,
        label: 'Quantity',
        pointBorderColor: "rgb(0,48,107)",
        pointHoverBackgroundColor: "rgb(0,48,107)",
      }]
    },

    // Configuration options go here
    options: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Monthly Poutine Sales'
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Quantity'
          },
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Months'
          },
        }]
      }
    }
  });

};

// ajax GET request to get ordered dishes group by months
const getSalesOverMonths = () => {
  $.get('/admin/analytics/sales_by_months', function(salesByMonthsData) {
    console.log(salesByMonthsData);
    generateLineChart(salesByMonthsData);
  })
    .done(() => console.log('Done with AJAX GET salesovermonths data request'))
    .fail(() => console.log('Oops! Problem with GET salesovermonths data request'));
};

$(document).ready(function() {
  getOverallSales();

  const overSalesBtn = $('#overallSales-btn');

  overSalesBtn.click(function() {
    getOverallSales();
  });

  const salesOverMonthsBtn = $('#sales-months-btn');
  salesOverMonthsBtn.click(function() {
    getSalesOverMonths();
  });
});