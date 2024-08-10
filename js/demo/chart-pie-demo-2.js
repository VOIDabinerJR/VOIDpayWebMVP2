// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function getDataFromElement(id) {
  var dataElement = document.getElementById(id);
  if (dataElement) {
    var dataValues = dataElement.getAttribute("data-values");
    return JSON.parse(dataValues); // Converte a string JSON em uma matriz
  } else {
    console.error("Element with id '" + id + "' not found.");
    return []; // Retorna um array vazio se o elemento não for encontrado
  }
}

// Defina os dados usando a função
var dataSales = getDataFromElement("pieChart-data-sales");
var dataRevenue = getDataFromElement("pieChart-data-revenue");
var dataTicket = getDataFromElement("pieChart-data-ticket");
var dataCancelled = getDataFromElement("pieChart-data-cancelled");
var dataMethod = getDataFromElement("pieChart-data-method");
var dataProducts = getDataFromElement("pieChart-data-products");
var dataAbandoned = getDataFromElement("pieChart-data-abandoned");
var dataRecurring = getDataFromElement("pieChart-data-recurring");
var dataCheckout = getDataFromElement("pieChart-data-checkout");

// Pie Charts
function getContext(id) {
  var canvas = document.getElementById(id);
  if (canvas) {
    return canvas.getContext('2d');
  } else {
    console.error("Canvas with id '" + id + "' not found.");
    return null;
  }
}

var ctx1 = getContext("myPieChartSales");
var ctx2 = getContext("myPieChartRevenue");
var ctx3 = getContext("myPieChartTicket");
var ctx4 = getContext("myPieChartCancelled");
var ctx5 = getContext("myPieChartMethod");
var ctx6 = getContext("myPieChartProducts");
var ctx7 = getContext("myPieChartAbandoned");
var ctx8 = getContext("myPieChartRecurring");
var ctx9 = getContext("myPieChartCheckout");

// Função para criar gráficos
function createPieChart(ctx, data, labels) {
  if (ctx) {
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'],
          hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#f9a825'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false
        },
        cutoutPercentage: 80,
      },
    });
  } else {
    console.error("Context is null for the chart.");
  }
}

// Cria cada gráfico com seus dados
createPieChart(ctx1, dataSales, ["Sales"]);
createPieChart(ctx2, dataRevenue, ["Revenue"]);
createPieChart(ctx3, dataTicket, ["Tickets"]);
createPieChart(ctx4, dataCancelled, ["Cancelled"]);
createPieChart(ctx5, dataMethod, ["Method 1", "Method 2", "Method 3"]); // Assumindo que o método recebe 3 valores
createPieChart(ctx6, dataProducts, ["Products"]);
createPieChart(ctx7, dataAbandoned, ["Abandoned"]);
createPieChart(ctx8, dataRecurring, ["Recurring"]);
createPieChart(ctx9, dataCheckout, ["Checkout"]);
