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

const CnPpi = () => {
    const chart1 = {
        series: [
            {
                name: '工业品出厂价格指数',
                data: []
            },
            {
                name: '当月同比增长(%)',
                data: []
            },
            {
                name: '累计',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'ppi',
                type: 'line'
            },
            title: {
                text: '工业生产者价格指数',
                align: 'left'
            },
            tooltip: {
                x: {
                    format: 'MM/yyyy'
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
                        newOption.series[0].data.push(parseFloat(response.results[i].ppi));
                        newOption.series[1].data.push(parseFloat(response.results[i].yearOnYear));
                        newOption.series[2].data.push(parseFloat(response.results[i].accumulative));
                    }
                    ApexCharts.exec(`ppi`, 'updateOptions', newOption.options);
                    ApexCharts.exec(`ppi`, 'updateSeries', newOption.series);
                    enqueueSnackbar('工业生产者价格指数', { variant: 'success' });
                } else {
                    enqueueSnackbar('工业生产者价格指数 find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`工业生产者价格指数 find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...chart1} />
        </MainCard>
    );
};

export default CnPpi;
