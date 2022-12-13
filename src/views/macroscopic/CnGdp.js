import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

// material-ui
import MainCard from 'ui-component/cards/MainCard';
// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
// notification
import { useSnackbar } from 'notistack';
// axios
import axios from 'utils/axios';
// ===========================|| SH300 ||=========================== //

const CnGdp = () => {
    const chart1 = {
        series: [
            {
                name: '国内生产总值(亿元)',
                data: []
            },
            {
                name: '国内生产总值季度累计同比增长（%)',
                data: []
            },
            {
                name: '第一产业增加值(亿元)',
                data: []
            },
            {
                name: '第一产业增加值季度累计同比增长(%)',
                data: []
            },
            {
                name: '第二产业增加值（亿元）',
                data: []
            },
            {
                name: '第二产业增加值季度累计同比增长(%)',
                data: []
            },
            {
                name: '第三产业增加值（亿元）',
                data: []
            },
            {
                name: '第三产业增加值季度累计同比增长（%)',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'gdp',
                type: 'line'
            },
            title: {
                text: '国内生产总值',
                align: 'left'
            },
            tooltip: {
                x: {
                    format: 'M/yyyy'
                }
            },
            legend: {
                position: 'top'
            },
            fill: {
                type: 'solid'
            },
            stroke: {
                width: 2,
                curve: 'straight'
            },
            noData: {
                text: 'Loading...'
            },
            markers: {
                size: 0
            },
            animations: {
                enabled: false
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                type: 'datetime',
                categories: [],
                labels: {
                    datetimeUTC: false
                }
            }
        }
    };
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const [options, setOptions] = useState(chart1);
    useEffect(() => {
        axios('get', location.pathname)
            .then((response) => {
                if (response && response.results && response.results.length > 0) {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < response.results.length; i++) {
                        options.options.xaxis.categories.push(response.results[i].date);
                        options.series[0].data.push(parseFloat(response.results[i].gdp));
                        options.series[1].data.push(parseFloat(response.results[i].gdpYearOnYear));
                        options.series[2].data.push(parseFloat(response.results[i].primaryIndustry));
                        options.series[3].data.push(parseFloat(response.results[i].primaryIndustryYearOnYear));
                        options.series[4].data.push(parseFloat(response.results[i].secondaryIndustries));
                        options.series[5].data.push(parseFloat(response.results[i].secondaryIndustriesYearOnYear));
                        options.series[6].data.push(parseFloat(response.results[i].tertiaryIndustry));
                        options.series[7].data.push(parseFloat(response.results[i].tertiaryIndustryYearOnYear));
                    }
                    ApexCharts.exec(`gdp`, 'updateOptions', options.options);
                    ApexCharts.exec(`gdp`, 'updateSeries', options.series);
                    setOptions(options);
                    enqueueSnackbar('国内生产总值', { variant: 'success' });
                } else {
                    enqueueSnackbar('国内生产总值 find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`国内生产总值 find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...options} />
        </MainCard>
    );
};

export default CnGdp;
