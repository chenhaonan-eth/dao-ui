import React from 'react';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

const CnGdp = () => {
    const chart = {
        series: [
            {
                name: 'Line 1',
                data: [1, 2, 3]
            },
            {
                name: 'Line 2',
                data: [4, 5, 6]
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'my-line-chart',
                type: 'line'
            },
            title: {
                text: 'My Line Chart',
                align: 'left'
            },
            xaxis: {
                type: 'category'
            },
            // show only the first Y axis
            yaxis: [
                {
                    show: true
                },
                // hide the remaining Y axes
                {
                    show: false
                }
            ]
        }
    };
    const [opt, setOpt] = React.useState(chart);
    React.useEffect(() => {
        setOpt({ ...opt, height: 40 });
        ApexCharts.exec(`bond_Us_rate`, 'updateOptions', opt);
    }, []);

    return (
        <div>
            <Chart options={chart.options} series={chart.series} type="line" height={chart.height} />
        </div>
    );
};

export default CnGdp;
