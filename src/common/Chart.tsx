import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs, 
  Title, 
  Tooltip, 
  LineElement,
  Filler,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import { useEffect, useState } from "react";

ChartJs.register(
  Title, 
  Tooltip, 
  LineElement, 
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
)

import axios from 'axios';
import { timeStampToPersianDate } from "@/utils/methods";



const Chart = ({chart}) => {
  
// console.log("chart : ",chart);

  const data = {
    labels : chart.history.map(e => timeStampToPersianDate(e[0])),
    datasets : [
      {
        data : chart.history.map(e => e[1]),
        
        fill : true,
        // backgroundColor: '#2AC480',
        
        // Line
        borderWidth : 4,
        borderColor : '#2AC479',
        tension : '0.5',

        // Point
        pointHoverBorderWidth: 3,
        pointBackgroundColor : 'white',
        pointBorderColor : "#2AC479",
        pointRadius : 5,
        pointBorderWidth : 3
      }
    ]
  }

  const options= {
    maintainAspectRatio : false,
    responsive : true,
      plugins: {
          datalabels: {display : false},
          tooltip: {display : false},
          legend: {display: false}
      },
      scales: {
          x: {display : false},
          y: {display : false}
      }
  }
  

  return (  
    <div className="w-[full] h-auto max-h-[120px]">
      <Line data={data} options={options}>Data</Line>
      
    </div>
  );
}
 
export default Chart;