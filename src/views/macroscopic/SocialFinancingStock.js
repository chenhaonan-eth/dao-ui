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

const SocialFinancingStock = () => {
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
                name: '社会融资规模',
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
            // {
            //     name: '存款类金融机构资产支持证券',
            //     data: [],
            //     color: '#74787c'
            // },
            // {
            //     name: '贷款核销',
            //     data: [],
            //     color: '#f47a55'
            // },
            // {
            //     name: '政府债券',
            //     data: [],
            //     color: '#8a8c8e'
            // }
        ],
        height: 480,
        options: {
            chart: {
                id: 'social_financing_stock',
                type: 'line'
            },
            title: {
                text: '中国社会融资规模存量(亿元)',
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
                categories: []
            }
        }
    };
    const chart2 = {
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
                name: '社会融资规模',
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
            // {
            //     name: '存款类金融机构资产支持证券',
            //     data: [],
            //     color: '#F6CBC0'
            // },
            // {
            //     name: '贷款核销',
            //     data: [],
            //     color: '#F6CBC0'
            // },
            // {
            //     name: '政府债券',
            //     data: [],
            //     color: '#F6CBC0'
            // }
        ],
        height: 480,
        options: {
            chart: {
                id: 'social_financing_stock2',
                type: 'line'
            },
            title: {
                text: '中国社会融资规模存量增速（%)',
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
                    const option = cloneDeep(chart1);
                    const bgrowthrateOption = cloneDeep(chart2);
                    console.log('&&&&&&', response);
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < response.results.length; i++) {
                        option.options.xaxis.categories.push(response.results[i].date);
                        option.series[0].data.push(parseFloat(response.results[i].ndbab));
                        option.series[1].data.push(parseFloat(response.results[i].entrustloan));
                        option.series[2].data.push(parseFloat(response.results[i].forcloan));
                        option.series[3].data.push(parseFloat(response.results[i].rmblaon));
                        option.series[4].data.push(parseFloat(response.results[i].bibae));
                        option.series[5].data.push(parseFloat(response.results[i].tiosfs));
                        option.series[6].data.push(parseFloat(response.results[i].sfinfe));
                        option.series[7].data.push(parseFloat(response.results[i].trustloan));
                        // option.series[8].data.push(parseFloat(response.results[i].assetBackedSecurities));
                        // option.series[9].data.push(parseFloat(response.results[i].loansWrittenOff));
                        // option.series[10].data.push(parseFloat(response.results[i].governmentBonds));

                        bgrowthrateOption.options.xaxis.categories.push(response.results[i].date);
                        bgrowthrateOption.series[0].data.push(parseFloat(response.results[i].ndbabgrowthrate));
                        bgrowthrateOption.series[1].data.push(parseFloat(response.results[i].entrustloangrowthrate));
                        bgrowthrateOption.series[2].data.push(parseFloat(response.results[i].forcloangrowthrate));
                        bgrowthrateOption.series[3].data.push(parseFloat(response.results[i].rmblaongrowthrate));
                        bgrowthrateOption.series[4].data.push(parseFloat(response.results[i].bibaegrowthrate));
                        bgrowthrateOption.series[5].data.push(parseFloat(response.results[i].tiosfsgrowthrate));
                        bgrowthrateOption.series[6].data.push(parseFloat(response.results[i].sfinfegrowthrate));
                        bgrowthrateOption.series[7].data.push(parseFloat(response.results[i].trustloangrowthrate));
                        // bgrowthrateOption.series[8].data.push(parseFloat(response.results[i].assetBackedSecuritiesgrowthrate));
                        // bgrowthrateOption.series[9].data.push(parseFloat(response.results[i].loansWrittenOffgrowthrate));
                        // bgrowthrateOption.series[10].data.push(parseFloat(response.results[i].governmentBondsgrowthrate));
                    }
                    console.log('@@@', option);
                    console.log('@@@', bgrowthrateOption);
                    ApexCharts.exec(`social_financing_stock`, 'updateOptions', option.options);
                    ApexCharts.exec(`social_financing_stock`, 'updateSeries', option.series);

                    ApexCharts.exec(`social_financing_stock2`, 'updateOptions', bgrowthrateOption.options);
                    ApexCharts.exec(`social_financing_stock2`, 'updateSeries', bgrowthrateOption.series);

                    enqueueSnackbar('中国社会融资规模存量', { variant: 'success' });
                } else {
                    enqueueSnackbar('中国社会融资规模存量 find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`中国社会融资规模存量 find data err`, { variant: 'error' });
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

export default SocialFinancingStock;
