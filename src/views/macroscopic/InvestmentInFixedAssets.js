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
// ===========================|| InvestmentInFixedAssets ||=========================== //

const InvestmentInFixedAssets = () => {
    const chart1 = {
        series: [
            {
                name: '完成额(亿元)',
                data: []
            },
            {
                name: '完成额同比增长(%)',
                data: []
            },
            {
                name: '房地产开发(亿元)',
                data: []
            },
            {
                name: '房地产开发同比增长(%)',
                data: []
            },
            {
                name: '第一产业用同比(%)',
                data: []
            },
            {
                name: '第二产业同比(%)',
                data: []
            },
            {
                name: '第三产业同比(%)',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'investment_in_fixed_assets',
                type: 'line'
            },
            title: {
                text: '固定资产投资',
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
                enabled: true
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
                        if (
                            response.results[i].investmentCompletedAmount &&
                            response.results[i].investmentCompletedAmountYearOnYear &&
                            response.results[i].realEstateDevelopment &&
                            response.results[i].realEstateDevelopmentYearOnYear &&
                            response.results[i].primaryIndustryYearOnYear &&
                            response.results[i].secondaryIndustryYearOnYear &&
                            response.results[i].tertiaryIndustryYearOnYear
                        ) {
                            newOption.options.xaxis.categories.push(response.results[i].date);
                            newOption.series[0].data.push(
                                parseFloat(
                                    response.results[i].investmentCompletedAmount.length === 0
                                        ? 0
                                        : response.results[i].investmentCompletedAmount
                                )
                            );
                            newOption.series[1].data.push(
                                parseFloat(
                                    response.results[i].investmentCompletedAmountYearOnYear.length === 0
                                        ? 0
                                        : response.results[i].investmentCompletedAmountYearOnYear
                                )
                            );
                            newOption.series[2].data.push(
                                parseFloat(
                                    response.results[i].realEstateDevelopment.length === 0 ? 0 : response.results[i].realEstateDevelopment
                                )
                            );
                            newOption.series[3].data.push(
                                parseFloat(
                                    response.results[i].realEstateDevelopmentYearOnYear.length === 0
                                        ? 0
                                        : response.results[i].realEstateDevelopmentYearOnYear
                                )
                            );
                            newOption.series[4].data.push(
                                parseFloat(
                                    response.results[i].primaryIndustryYearOnYear.length === 0
                                        ? 0
                                        : response.results[i].primaryIndustryYearOnYear
                                )
                            );
                            newOption.series[5].data.push(
                                parseFloat(
                                    response.results[i].secondaryIndustryYearOnYear.length === 0
                                        ? 0
                                        : response.results[i].secondaryIndustryYearOnYear
                                )
                            );
                            newOption.series[6].data.push(
                                parseFloat(
                                    response.results[i].tertiaryIndustryYearOnYear.length === 0
                                        ? 0
                                        : response.results[i].tertiaryIndustryYearOnYear
                                )
                            );
                        }
                    }
                    ApexCharts.exec(`investment_in_fixed_assets`, 'updateOptions', newOption.options);
                    ApexCharts.exec(`investment_in_fixed_assets`, 'updateSeries', newOption.series);
                    setNewOption(newOption);
                    enqueueSnackbar('固定资产投资', { variant: 'success' });
                } else {
                    enqueueSnackbar('固定资产投资 find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`固定资产投资 find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...newOption} />
        </MainCard>
    );
};

export default InvestmentInFixedAssets;
