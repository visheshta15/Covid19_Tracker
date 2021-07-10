import React, {useState, useEffect} from 'react'
import './LineGraph.css';
import {Line } from "react-chartjs-2";
import numeral from "numeral";


const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

  const casesTypeColors = {
    cases: {
      hex: '#0984e3',
      multiplier: 800,
      label: 'Active'
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 1200,
      label: 'Recovered'
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 2000,
      label: 'Deaths'
    },
  };
  

function LineGraph({casesType='cases'}) {
    const [datas, setData] = useState({});
    const buildChartData = (data) =>{
        const chartData = []
        let lastDataPoint;
        for( let date in data[casesType]){
            if(lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }


    useEffect(()=>{
        const fetchData = async () =>{

            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then((response)=> response.json())
            .then((data)=>{
                console.log(data)
                const chartData = buildChartData(data);
                console.log(chartData)
                setData(chartData)
        })
        }
        
        fetchData();
    },[casesType]);

      console.log(casesTypeColors[casesType].hex)


       return (
        <div className="lineGraph">
      {datas?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "#c8d6e5",
                borderColor: casesTypeColors[casesType].hex,
                data: datas,
                label: casesTypeColors[casesType].label,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
    )
}

export default LineGraph
