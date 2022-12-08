/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-boolean-value */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
// third-party
import ReactECharts from 'echarts-for-react';
import cloneDeep from 'lodash.clonedeep';
import MainCard from 'ui-component/cards/MainCard';
import Loadabel from 'ui-component/Loadable';
// notification
import { useSnackbar } from 'notistack';
// axios
import axios from 'utils/axios';
import formatdate from 'utils/date';

const DEFAULT_OPTION = {
    title: {
        text: '沪深300市盈率',
        left: '1%'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: [
            '沪深300静态市盈率中位数',
            '沪深300静态市盈率中位数',
            '沪深300静态市盈率',
            '沪深300滚动市盈率(TTM)中位数',
            '沪深300滚动市盈率(TTM)等权平均',
            '沪深300滚动市盈率(TTM)'
        ]
    },
    xAxis: { data: [] },
    yAxis: {},
    toolbox: {
        right: 10,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            saveAsImage: {}
        }
    },
    dataZoom: [
        {
            type: 'inside',
            start: 90,
            end: 100
        },
        {
            start: 90,
            end: 100
        }
    ],
    series: [
        {
            name: '沪深300静态市盈率中位数',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: '沪深300静态市盈率等权平均',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: '沪深300静态市盈率',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: '沪深300滚动市盈率(TTM)中位数',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: '沪深300滚动市盈率(TTM)等权平均',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: '沪深300滚动市盈率(TTM)',
            type: 'line',
            stack: 'Total',
            data: []
        }
    ]
};

const Sh300pe = () => {
    const location = useLocation();
    const [option, setOption] = useState(DEFAULT_OPTION);
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    function onChartReady(echarts) {
        // eslint-disable-next-line no-undef
        echarts.hideLoading();
    }
    const loadData = async () => {
        axios('get', location.pathname).then((response) => {
            const newOption = cloneDeep(option);
            // create an empty array
            const times = [];
            const middleLyrPe = []; // 沪深300静态市盈率中位数
            const lyrPe = []; // 沪深300静态市盈率等权平均
            const addLyrPe = []; // 沪深300静态市盈率
            const middleTtmPe = []; // 沪深300滚动市盈率(TTM)中位数
            const ttmPe = []; // 沪深300滚动市盈率(TTM)等权平均
            const addTtmPe = []; // 沪深300滚动市盈率(TTM)

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < response.results.length; i++) {
                times.push(formatdate(new Date(response.results[i].time), 'yyyy-MM-dd'));
                middleLyrPe.push(response.results[i].middleLyrPe);
                lyrPe.push(response.results[i].lyrPe);
                addLyrPe.push(response.results[i].addLyrPe);
                middleTtmPe.push(response.results[i].middleTtmPe);
                ttmPe.push(response.results[i].ttmPe);
                addTtmPe.push(response.results[i].addTtmPe);
            }
            newOption.xAxis.data = times;
            newOption.series[0].data = middleLyrPe;
            newOption.series[1].data = lyrPe;
            newOption.series[2].data = addLyrPe;
            newOption.series[3].data = middleTtmPe;
            newOption.series[4].data = ttmPe;
            newOption.series[5].data = addTtmPe;
            setOption(newOption);
            setLoading(false);
            enqueueSnackbar('沪深300市盈率', { variant: 'success' });
        });
    };
    useEffect(() => {
        // use IIFE to avoid creating named function 🤪
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Grid item xs={12}>
                {/* <ReactECharts option={option} onChartReady={onChartReady} /> */}
                <ReactECharts option={option} loadingOption={Loadabel} showLoading={loading} />
            </Grid>
        </MainCard>
    );
};
export default Sh300pe;
