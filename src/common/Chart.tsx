import { timeStampToPersianDate } from "@/utils/methods";
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
import { TPriceChangesResponse } from "@/types/crypto.types";


ChartJs.register(
  Title, 
  LineElement, 
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
)




const Chart = ({chart} : {chart : TPriceChangesResponse}) => {
  

  const data : any = {
    labels : chart.history.map((e : Array<number>) => timeStampToPersianDate(e[0])),
    datasets : [
      {
        data : chart.history.map((e : Array<number>) => e[1]),
        
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
 
export default Chart;