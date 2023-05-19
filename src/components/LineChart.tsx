import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs, 
  Title, 
  LineElement,
  Filler,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'


ChartJs.register(
  Title, 
  LineElement, 
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
)


const LineChart = ({chart} : {chart : Array<[number,number]>}) => {

  const data : any = {
    // For Get/Show Time
    labels : chart.map((data : [number,number]) => data[0]),
    datasets : [
      {
        // for Get/Show Price
        data : chart.map((data : [number,number]) => data[1]),
        
        fill : true,

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

  const options : object = {
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
 
export default LineChart;