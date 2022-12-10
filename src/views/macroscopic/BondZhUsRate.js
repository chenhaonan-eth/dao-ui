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
// ===========================|| BondZhUsRate ||=========================== //

const BondZhUsRate = () => {
    const chart1 = {
        series: [
            {
                name: '中国国债收益率2年',
                data: []
            },
            {
                name: '中国国债收益率5年',
                data: []
            },
            {
                name: '中国国债收益率10年',
                data: []
            },
            {
                name: '中国国债收益率30年',
                data: []
            },
            {
                name: '中国国债收益率10年-2年',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'bond_zh_rate',
                type: 'line'
            },
            title: {
                text: '中国债',
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
    const chart2 = {
        series: [
            {
                name: '美国国债收益率2年',
                data: []
            },
            {
                name: '美国国债收益率5年',
                data: []
            },
            {
                name: '美国国债收益率10年',
                data: []
            },
            {
                name: '美国国债收益率30年',
                data: []
            },
            {
                name: '美国国债收益率10年-2年',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'bond_Us_rate',
                type: 'line'
            },
            title: {
                text: '美国债',
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
                    console.log('￥￥￥', response);
                    const zhOption = cloneDeep(chart1);
                    const usOption = cloneDeep(chart2);
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < response.results.length; i++) {
                        if (
                            response.results[i].cN2Years !== 0 &&
                            response.results[i].cN5Years !== 0 &&
                            response.results[i].cN10Years !== 0 &&
                            response.results[i].cN30Years !== 0 &&
                            response.results[i].cN30Years !== 0
                        ) {
                            zhOption.options.xaxis.categories.push(response.results[i].date);
                            zhOption.series[0].data.push(response.results[i].cN2Years); // 中国国债收益率2年
                            zhOption.series[1].data.push(response.results[i].cN5Years); // 中国国债收益率5年
                            zhOption.series[2].data.push(response.results[i].cN10Years); // 中国国债收益率10年
                            zhOption.series[3].data.push(response.results[i].cN30Years); // 中国国债收益率30年
                            zhOption.series[4].data.push(response.results[i].cN102Years); // 中国国债收益率10年-2年
                        }
                        if (
                            response.results[i].uS2Years !== 0 &&
                            response.results[i].uS5Years !== 0 &&
                            response.results[i].uS10Years !== 0 &&
                            response.results[i].uS30Years !== 0 &&
                            response.results[i].uS102Years !== 0
                        ) {
                            usOption.options.xaxis.categories.push(response.results[i].date);
                            usOption.series[0].data.push(response.results[i].uS2Years); // 美国国债收益率2年
                            usOption.series[1].data.push(response.results[i].uS5Years); // 美国国债收益率5年
                            usOption.series[2].data.push(response.results[i].uS10Years); // 美国国债收益率10年
                            usOption.series[3].data.push(response.results[i].uS30Years); // 美国国债收益率30年
                            usOption.series[4].data.push(response.results[i].uS102Years); // 美国国债收益率10年-2年
                        }
                    }
                    console.log('@@@', zhOption);
                    console.log('@@@', usOption);
                    ApexCharts.exec(`bond_zh_rate`, 'updateOptions', zhOption.options);
                    ApexCharts.exec(`bond_zh_rate`, 'updateSeries', zhOption.series);

                    ApexCharts.exec(`bond_Us_rate`, 'updateOptions', usOption.options);
                    ApexCharts.exec(`bond_Us_rate`, 'updateSeries', usOption.series);

                    enqueueSnackbar('中美国债', { variant: 'success' });
                } else {
                    enqueueSnackbar('中美国债 find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`中美国债 find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...chart1} />
            <Chart {...chart2} />
        </MainCard>
    );
};

export default BondZhUsRate;
