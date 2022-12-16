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
// ===========================|| SocialElectricityConsumption ||=========================== //

const SocialElectricityConsumption = () => {
    const chart1 = {
        series: [
            {
                name: '全社会用电量',
                data: []
            },
            {
                name: '全社会用电量同比(%)',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'social_electricity_consumption',
                type: 'line'
            },
            title: {
                text: '全社会用电量',
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
            },
            yaxis: [{ opposite: true }, { opposite: false }]
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
                        if (response.results[i].wholeSocietyYearOnYear) {
                            newOption.options.xaxis.categories.push(response.results[i].date);
                            newOption.series[0].data.push(parseFloat(response.results[i].wholeSociety));
                            newOption.series[1].data.push(parseFloat(response.results[i].wholeSocietyYearOnYear));
                            // newOption.series[2].data.push(parseFloat(response.results[i].allIndustries));
                            // newOption.series[3].data.push(parseFloat(response.results[i].allIndustriesYearOnYear));
                        }
                    }
                    console.log('@@@@', newOption);
                    ApexCharts.exec(`social_electricity_consumption`, 'updateOptions', newOption.options);
                    ApexCharts.exec(`social_electricity_consumption`, 'updateSeries', newOption.series);
                    setNewOption(newOption);
                    enqueueSnackbar('全社会用电量', { variant: 'success' });
                } else {
                    enqueueSnackbar('全社会用电量 find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`全社会用电量 find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...newOption} />
        </MainCard>
    );
};

export default SocialElectricityConsumption;
