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

const SocialFinancingFlows = () => {
    const chart1 = {
        series: [
            {
                name: '未贴现银行承兑汇票',
                data: []
            },
            {
                name: '委托贷款',
                data: []
            },
            {
                name: '委托贷款外币(折合人民币)',
                data: []
            },
            {
                name: '人民币贷款',
                data: []
            },
            {
                name: '企业债券',
                data: []
            },
            {
                name: '社会融资规模增量(亿元)',
                data: []
            },
            {
                name: '非金融企业境内股票融资',
                data: []
            },
            {
                name: '信托贷款',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'social_financing_flows',
                type: 'line'
            },
            title: {
                text: '中国社会融资规模增量',
                align: 'left'
            },
            colors: ['#6A41EB', '#D1BA74', '#DCB7F5', '#BA22CC', '#F4606C', '#19CAAD', '#8CC7B5', '#A0EEE1'],
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
                        newOption.series[0].data.push(response.results[i].ndbab);
                        newOption.series[1].data.push(response.results[i].entrustloan);
                        newOption.series[2].data.push(response.results[i].forcloan);
                        newOption.series[3].data.push(response.results[i].rmblaon);
                        newOption.series[4].data.push(response.results[i].bibae);
                        newOption.series[5].data.push(response.results[i].tiosfs);
                        newOption.series[6].data.push(response.results[i].sfinfe);
                        newOption.series[7].data.push(response.results[i].trustloan);
                    }
                    ApexCharts.exec(`social_financing_flows`, 'updateOptions', newOption.options);
                    ApexCharts.exec(`social_financing_flows`, 'updateSeries', newOption.series);
                    setNewOption(newOption);
                    enqueueSnackbar('Social Financing Flows', { variant: 'success' });
                } else {
                    enqueueSnackbar('SocialFinancingFlows find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`SocialFinancingFlows find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...newOption} />
        </MainCard>
    );
};

export default SocialFinancingFlows;
