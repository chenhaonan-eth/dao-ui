/* eslint-disable react/jsx-no-bind */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-boolean-value */
// 股债利率差
import { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import MainCard from 'ui-component/cards/MainCard';
import { Grid } from '@mui/material';
import cloneDeep from 'lodash.clonedeep';
import axios from '../../../utils/axios'

function EquityBbondYieldSpreadsEcharts() {
    const DEFAULT_OPTION = {
        title: {
            text: '股债利率差',
            left: '1%'
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '5%',
            right: '15%',
            bottom: '10%'
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
                startValue: '2014-06-01'
            },
            {
                type: 'inside'
            }
        ],
        visualMap: {
            top: 50,
            right: 10,
            pieces: [
                {
                    gt: 0,
                    lte: 1,
                    color: '#93CE07'
                },
                {
                    gt: 1,
                    lte: 2,
                    color: '#FBDB0F'
                },
                {
                    gt: 2,
                    lte: 3,
                    color: '#FC7D02'
                }
            ],
            outOfRange: {
                color: '#999'
            }
        },
        series: {
            name: '股债利率差',
            type: 'line',
            showSymbol: false,
            data: [],
            markLine: {
                silent: true,
                lineStyle: {
                    color: '#333'
                },
                data: [
                    {
                        yAxis: 1
                    },
                    {
                        yAxis: 2
                    },
                    {
                        yAxis: 3
                    }
                ]
            }
        }
    };

    const [option, setOption] = useState(DEFAULT_OPTION);

    useEffect(() => {
            axios('get','/getEquityBbondYieldSpreads').
            then((response) => {
            const newOption = cloneDeep(option);
            newOption.series.data = Object.values(response.data);
            newOption.xAxis.data = Object.keys(response.data);
            setOption(newOption);
        });
    }, [option]);

    return (
        <MainCard>
            <Grid item xs={12}>
                <ReactECharts option={option} />
            </Grid>
        </MainCard>
    );
}

export default EquityBbondYieldSpreadsEcharts;
