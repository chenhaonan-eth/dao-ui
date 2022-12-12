import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

// material-ui
import MainCard from 'ui-component/cards/MainCard';
// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import cloneDeep from 'lodash.clonedeep';
// notification
import { useSnackbar } from 'notistack';
// axios
import axios from 'utils/axios';
// ===========================|| SH300 ||=========================== //

const CnCpi = () => {
    const chart1 = {
        series: [
            {
                name: '全国同比增加(%)',
                data: []
            },
            {
                name: '城市同比增加(%)',
                data: []
            },
            {
                name: '农村同比增加(%)',
                data: []
            },
            {
                name: '全国当月',
                data: []
            },
            {
                name: '城市当月',
                data: []
            },
            {
                name: '农村当月',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'cpi',
                type: 'line'
            },
            title: {
                text: '消费者物价指数 CPI',
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

    useEffect(() => {
        axios('get', location.pathname)
            .then((response) => {
                if (response && response.results && response.results.length > 0) {
                    const newOption = cloneDeep(chart1);
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < response.results.length; i++) {
                        newOption.options.xaxis.categories.push(response.results[i].date);
                        newOption.series[0].data.push(Math.floor(response.results[i].nationalYearOnYear * 100) / 100);
                        newOption.series[1].data.push(Math.floor(response.results[i].cityYearOnYear * 100) / 100);
                        newOption.series[2].data.push(Math.floor(response.results[i].ruralYearOnYear * 100) / 100);
                        newOption.series[3].data.push(Math.floor(response.results[i].national * 100) / 100);
                        newOption.series[4].data.push(Math.floor(response.results[i].city * 100) / 100);
                        newOption.series[5].data.push(Math.floor(response.results[i].rural * 100) / 100);
                    }
                    ApexCharts.exec(`cpi`, 'updateOptions', newOption.options);
                    ApexCharts.exec(`cpi`, 'updateSeries', newOption.series);
                    enqueueSnackbar('消费者物价指数 CPI', { variant: 'success' });
                } else {
                    enqueueSnackbar('消费者物价指数 CPI find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`消费者物价指数 CPI find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...chart1} />
        </MainCard>
    );
};

export default CnCpi;
