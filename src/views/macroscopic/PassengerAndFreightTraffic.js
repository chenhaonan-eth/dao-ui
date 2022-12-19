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

const PassengerAndFreightTraffic = () => {
    const chart1 = {
        series: [
            {
                name: '国际航线',
                data: []
            },
            {
                name: '港澳地区航线',
                data: []
            },
            {
                name: '国内航线',
                data: []
            },
            {
                name: '民航',
                data: []
            },
            {
                name: '水运',
                data: []
            },
            {
                name: '公路',
                data: []
            },
            {
                name: '铁路',
                data: []
            },
            {
                name: '合计',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'passenger_and_freight_traffic',
                type: 'line'
            },
            title: {
                text: '全社会客货运输量同比(%)',
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
                        // if (response.results[i].class === 0) {
                        //     newOption.options.xaxis.categories.push(response.results[i].date);
                        //     newOption.series[0].data.push(parseFloat(response.results[i].freightVolumeYearOnYear));
                        // }
                        const freightVolumeYearOnYear = response.results[i].freightVolumeYearOnYear;
                        if (freightVolumeYearOnYear) {
                            switch (response.results[i].class) {
                                case 'InternationalService':
                                    newOption.series[0].data.push(parseFloat(freightVolumeYearOnYear));
                                    break;
                                case 'HongKongMacaoRegionalRoute':
                                    newOption.series[1].data.push(parseFloat(freightVolumeYearOnYear));
                                    break;
                                case 'DomesticAirline':
                                    newOption.series[2].data.push(parseFloat(freightVolumeYearOnYear));
                                    break;
                                case 'CivilAviation':
                                    newOption.options.xaxis.categories.push(response.results[i].date);
                                    newOption.series[3].data.push(parseFloat(freightVolumeYearOnYear));
                                    break;
                                case 'WaterTransport':
                                    newOption.series[4].data.push(parseFloat(freightVolumeYearOnYear));
                                    break;
                                case 'Highway':
                                    newOption.series[5].data.push(parseFloat(freightVolumeYearOnYear));
                                    break;
                                case 'Railway':
                                    newOption.series[6].data.push(parseFloat(freightVolumeYearOnYear));
                                    break;
                                case 'Total':
                                    newOption.series[7].data.push(parseFloat(freightVolumeYearOnYear));
                                    break;
                                default:
                            }
                        }
                    }
                    console.log('@@@@', newOption);
                    ApexCharts.exec(`passenger_and_freight_traffic`, 'updateOptions', newOption.options);
                    ApexCharts.exec(`passenger_and_freight_traffic`, 'updateSeries', newOption.series);
                    setNewOption(newOption);
                    enqueueSnackbar('全社会客货运输量', { variant: 'success' });
                } else {
                    enqueueSnackbar('全社会客货运输量 find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`全社会客货运输量 find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...newOption} />
        </MainCard>
    );
};

export default PassengerAndFreightTraffic;
