
import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);



function App() {

const [chartData, setChartData] = useState({
  datasets: [],
})
const [chartOptions, setChartOptions] = useState({
  datasets: [],
})

useEffect(() => {

  let seriesadata= [];

  let seriesa1data = [];

  let commondata =[];

  let newrounddata =[];

  axios.get('https://my-json-server.typicode.com/Yowzel/jsontest/posts')
    .then(res => {
      console.log(res);
      for(let dataObj of res.data) {
        console.log(dataObj)
        if(dataObj.class === "common"){
          commondata.push({
            x: dataObj.exitval,
            y: dataObj.priceper
          });
        } else if (dataObj.class === "a") {
          seriesadata.push(
            {
            x: dataObj.exitval,
            y: dataObj.priceper
            }
          );
        } else if (dataObj.class === "a1") {
          seriesa1data.push({
            x: dataObj.exitval,
            y: dataObj.priceper
          });
        } else if (dataObj.class === 'new') {
          newrounddata.push({
            x: dataObj.exitval,
            y: dataObj.priceper
          })
        }
      }
      setChartData({
        type: 'scatter',
        datasets: [
          {
            label: "common",
            data: commondata,
            pointRadius: 2,
            showLine: true
          },
          {
            label: "series a preferred",
            data: seriesadata,
            pointRadius: 2,
            showLine: true
          }, 
          {
            label: "series a1 preferred",
            data: seriesa1data,
            pointRadius: 2,
            showLine: true
          },
          {
            label: "new",
            data: newrounddata,
            pointRadius: 2,
            showLine: true
          }
        ],
      });
    });



  setChartOptions({
    responsive: true,
    hover: {
      mode: 'nearest'
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        usePointStyle: true,
        padding: 20,
        callbacks : {
          beforeLabel: function(context) {
            let beforeLabel = context.dataset.label
            return beforeLabel
          },
          label: function(context) {
            let label = "Valuation: $" + context.parsed.x 
            return label
          },
          afterLabel: function (context) {
            let afterLabel = "Price Per Share: $" + context.parsed.y
            return afterLabel
          }
        }
      }
    }
  })
}, []);




  return (
    <div className="App">
       <Scatter data={chartData} options={chartOptions} />
    </div>
  );
}

export default App;
