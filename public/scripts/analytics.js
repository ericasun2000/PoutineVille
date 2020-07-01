const generateChart = (dishArr) => {
    const resultObj = generateArrays(dishArr);

    const backgroundColors = ['rgb(250,213,92)', 'rgb(38,125,179)', 'rgb(133,97,200)', 'rgb(237,102,71)', 'rgb(109,219,219)', 'rgb(104,193,130)', 'rgb(150, 139, 195)', 'rgb(227,113,178)']

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
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
                text: 'Sales of PoutineVille'
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

}

const generateArrays = (dishArr) => {
    const labelArr = [];
    const sumArr = [];

    for (let dish of dishArr) {
        labelArr.push(dish.name);
        sumArr.push(Number(dish.sum));
    }

    return {
        labelArr,
        sumArr
    }
}

$(document).ready(function () {
    $.get('/admin/analysisData', function (dishArr) {
        generateChart(dishArr);
    })
        .done(() => console.log('Done with AJAX GET request'))
        .fail(() => console.log('Oops! Problem with GET  request'));
})