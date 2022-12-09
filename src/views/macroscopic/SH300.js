import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import cloneDeep from 'lodash.clonedeep';
// notification
import { useSnackbar } from 'notistack';
// axios
import axios from 'utils/axios';
import formatdate from 'utils/date';
// ===========================|| SH300 ||=========================== //

const SH300 = () => {
    const chartData = {
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
                text: '沪深300',
                align: 'left'
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
        axios('get', location.pathname).then((response) => {
            const newOption = cloneDeep(chartData);
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < response.results.length; i++) {
                newOption.options.xaxis.categories.push(formatdate(new Date(response.results[i].time), 'yyyy-MM-dd'));
                newOption.series[0].data.push(response.results[i].middleLyrPe); // 沪深300静态市盈率中位数
                newOption.series[1].data.push(response.results[i].lyrPe); // 沪深300静态市盈率等权平均
                newOption.series[2].data.push(response.results[i].addLyrPe); // 沪深300静态市盈率
                newOption.series[3].data.push(response.results[i].middleTtmPe); // 沪深300滚动市盈率(TTM)中位数
                newOption.series[4].data.push(response.results[i].ttmPe); // 沪深300滚动市盈率(TTM)等权平均
                newOption.series[5].data.push(response.results[i].addTtmPe); // 沪深300滚动市盈率(TTM)
            }
            console.log('###########', newOption);
            enqueueSnackbar('沪深300市盈率', { variant: 'success' });
            ApexCharts.exec(`sh300pes`, 'updateOptions', newOption.options);
            ApexCharts.exec(`sh300pes`, 'updateSeries', newOption.series);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...chartData} />
        </MainCard>
    );
};

export default SH300;
