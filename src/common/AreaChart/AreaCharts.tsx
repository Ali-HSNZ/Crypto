import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { type FC } from 'react'

import { type IAreaChartProps } from './resources'

const DAreaChart: FC<IAreaChartProps> = ({ seriesData }) => {
    const options: Highcharts.Options = {
        chart: {
            type: 'areaspline',
            height: 100,
        },
        // Set credits false to hidden 'highcharts' copyright
        credits: {
            enabled: false,
        },
        // Set this to true to enable accessibility features
        accessibility: {
            enabled: false,
        },
        // title of chart
        title: {
            text: '',
        },
        xAxis: {
            visible: false,
        },
        yAxis: [
            {
                visible: false,
            },
        ],
        plotOptions: {
            series: {
                pointPlacement: 'off',
            },
            areaspline: {
                // fill opacity color
                fillOpacity: 0.2,
                lineWidth: 3,
                // disable marker point in legend symbol
                marker: {
                    enabled: false,
                },
            },
        },
        tooltip: {
            useHTML: true,

            // Render Tooltip With Html Tag
            headerFormat: `<table class="mt-1">`,
            pointFormat: `
                                <tr class="flex px-2 items-center text-sm justify-between py-1 gap-x-2">
                                    <td class="font-semibold flex gap-x-1">
                                            {point.y}
                                    </td>
                                    <td class="font-semibold text-sm" style="color:{series.color};">
                                        :{series.name}
                                    </td>
                                </tr>`,
            footerFormat: '</table>',
            shared: true,
            shadow: false,
            borderWidth: 1,
            style: {
                fontFamily: 'font-iranyekan-bold',
            },
            borderColor: '#ccc',
        },

        legend: {
            enabled: false,
            useHTML: false,
            align: 'left',
            verticalAlign: 'top',
            // change text color in legend
            itemStyle: {
                color: '#1f2937',
            },
            // change text color in legend when hovered
            itemHoverStyle: {
                color: '#1f2937',
            },
            labelFormatter: function () {
                return `<p class="font-normal text-base">${this.name}</p>`
            },
            // Set Item Margin Bottom
            itemMarginBottom: 15,

            // symbol Width
            symbolWidth: 10,
        },

        series: seriesData,
    }
    return (
        <div className='grid'>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default DAreaChart
