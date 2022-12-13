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

const MoneySupply = () => {
    const chart1 = {
        series: [
            {
                name: '货币和准货币(M2)数量(亿元)',
                data: []
            },
            {
                name: '货币(M1)数量(亿元)',
                data: []
            },
            {
                name: '流通中的现金(M0)数量(亿元)',
                data: []
            },
            {
                name: '货币和准货币(M2)同比增长(%)',
                data: []
            },
            {
                name: '货币(M1)同比增长(%)',
                data: []
            },
            {
                name: '流通中的现金(M0)同比增长(%)',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'money_supply',
                type: 'line'
            },
            title: {
                text: '货币供应',
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
    const [newOption, setNewOption] = useState(chart1);

    useEffect(() => {
        axios('get', location.pathname)
            .then((response) => {
                if (response && response.results && response.results.length > 0) {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < response.results.length; i++) {
                        newOption.options.xaxis.categories.push(response.results[i].date);
                        newOption.series[0].data.push(Math.floor(response.results[i].m2 * 100) / 100);
                        newOption.series[1].data.push(Math.floor(response.results[i].m1 * 100) / 100);
                        newOption.series[2].data.push(Math.floor(response.results[i].m0 * 100) / 100);
                        newOption.series[3].data.push(Math.floor(response.results[i].m2YearOnYear * 100) / 100);
                        newOption.series[4].data.push(Math.floor(response.results[i].m1YearOnYear * 100) / 100);
                        newOption.series[5].data.push(Math.floor(response.results[i].m0YearOnYear * 100) / 100);
                    }
                    ApexCharts.exec(`money_supply`, 'updateOptions', newOption.options);
                    ApexCharts.exec(`money_supply`, 'updateSeries', newOption.series);
                    setNewOption(newOption);
                    enqueueSnackbar('货币供应', { variant: 'success' });
                } else {
                    enqueueSnackbar('货币供应 find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`货币供应 find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...newOption} />
        </MainCard>
    );
};

export default MoneySupply;
