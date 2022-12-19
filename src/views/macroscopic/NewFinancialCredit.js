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

const NewFinancialCredit = () => {
    const chart1 = {
        series: [
            {
                name: '当月(亿元)',
                data: []
            },
            {
                name: '同比增长(%)',
                data: []
            },
            {
                name: '环比增长',
                data: []
            },
            {
                name: '累计(亿元)',
                data: []
            },
            {
                name: '同比增长(%)',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'new_financial_credit',
                type: 'line'
            },
            title: {
                text: '中国新增信贷数据',
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

    const [newOption, setNewOption] = useState(chart1);
    useEffect(() => {
        axios('get', location.pathname)
            .then((response) => {
                if (response && response.results && response.results.length > 0) {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < response.results.length; i++) {
                        newOption.options.xaxis.categories.push(response.results[i].date);
                        newOption.series[0].data.push(Math.floor(response.results[i].loany * 100) / 100);
                        newOption.series[1].data.push(Math.floor(response.results[i].loanYearOnYear * 100) / 100);
                        newOption.series[2].data.push(Math.floor(response.results[i].loanyYearOverYear * 100) / 100);
                        newOption.series[3].data.push(Math.floor(response.results[i].loanyAcc * 100) / 100);
                        newOption.series[4].data.push(Math.floor(response.results[i].loanyAccYearOnYear * 100) / 100);
                    }
                    ApexCharts.exec(`new_financial_credit`, 'updateOptions', newOption.options);
                    ApexCharts.exec(`new_financial_credit`, 'updateSeries', newOption.series);
                    setNewOption(newOption);
                    enqueueSnackbar('中国新增信贷数据', { variant: 'success' });
                } else {
                    enqueueSnackbar('中国新增信贷数据 find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`中国新增信贷数据 find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...newOption} />
        </MainCard>
    );
};

export default NewFinancialCredit;
