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
        data: ['静态-中位数', '静态-等权平均', '静态市盈率', '滚动-(TTM)中位数', '滚动-(TTM)等权平均', '滚动-(TTM)']
    },
    xAxis: { data: [] },
    yAxis: {},
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
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
            name: '静态-中位数',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: '静态-等权平均',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: '静态市盈率',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: '滚动-(TTM)中位数',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: '滚动-(TTM)等权平均',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: '滚动-(TTM)',
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

    const loadData = async () => {
        axios('get', location.pathname).then((response) => {
            const newOption = cloneDeep(option);
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < response.results.length; i++) {
                newOption.xAxis.data.push(formatdate(new Date(response.results[i].time), 'yyyy-MM-dd'));
                newOption.series[0].data.push(response.results[i].middleLyrPe); // 沪深300静态市盈率中位数
                newOption.series[1].data.push(response.results[i].lyrPe); // 沪深300静态市盈率等权平均
                newOption.series[2].data.push(response.results[i].addLyrPe); // 沪深300静态市盈率
                newOption.series[3].data.push(response.results[i].middleTtmPe); // 沪深300滚动市盈率(TTM)中位数
                newOption.series[4].data.push(response.results[i].ttmPe); // 沪深300滚动市盈率(TTM)等权平均
                newOption.series[5].data.push(response.results[i].addTtmPe); // 沪深300滚动市盈率(TTM)
            }
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
                <ReactECharts option={option} loadingOption={Loadabel} showLoading={loading} />
            </Grid>
        </MainCard>
    );
};
export default Sh300pe;
