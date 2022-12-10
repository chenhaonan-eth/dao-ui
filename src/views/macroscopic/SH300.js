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

const SH300 = () => {
    const chart1 = {
        series: [
            {
                name: '静态-中位数',
                data: []
            },
            {
                name: '静态-等权平均',
                data: []
            },
            {
                name: '静态市盈率',
                data: []
            },
            {
                name: '滚动-(TTM)中位数',
                data: []
            },
            {
                name: '滚动-(TTM)等权平均',
                data: []
            },
            {
                name: '滚动-(TTM)',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'sh300pes',
                type: 'line'
            },
            title: {
                text: '沪深300市盈率',
                align: 'left'
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yyyy'
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
                categories: []
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
                        newOption.options.xaxis.categories.push(response.results[i].time);
                        newOption.series[0].data.push(response.results[i].middleLyrPe); // 沪深300静态市盈率中位数
                        newOption.series[1].data.push(response.results[i].lyrPe); // 沪深300静态市盈率等权平均
                        newOption.series[2].data.push(response.results[i].addLyrPe); // 沪深300静态市盈率
                        newOption.series[3].data.push(response.results[i].middleTtmPe); // 沪深300滚动市盈率(TTM)中位数
                        newOption.series[4].data.push(response.results[i].ttmPe); // 沪深300滚动市盈率(TTM)等权平均
                        newOption.series[5].data.push(response.results[i].addTtmPe); // 沪深300滚动市盈率(TTM)
                    }
                    ApexCharts.exec(`sh300pes`, 'updateOptions', newOption.options);
                    ApexCharts.exec(`sh300pes`, 'updateSeries', newOption.series);
                    enqueueSnackbar('沪深300市盈率', { variant: 'success' });
                } else {
                    enqueueSnackbar('沪深300市盈率 find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`沪深300市盈率 find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...chart1} />
        </MainCard>
    );
};

export default SH300;
