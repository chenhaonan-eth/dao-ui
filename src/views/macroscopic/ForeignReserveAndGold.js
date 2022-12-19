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

const ForeignReserveAndGold = () => {
    const chart1 = {
        series: [
            {
                name: '黄金储备(万盎司)',
                data: []
            },
            {
                name: '外汇储备(亿美元)',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'foreign-reserve-and-gold',
                type: 'line'
            },
            title: {
                text: '外汇储备与黄金',
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
                        newOption.series[0].data.push(parseFloat(response.results[i].gold));
                        newOption.series[1].data.push(parseFloat(response.results[i].foreignReserve));
                    }
                    ApexCharts.exec(`foreign-reserve-and-gold`, 'updateOptions', newOption.options);
                    ApexCharts.exec(`foreign-reserve-and-gold`, 'updateSeries', newOption.series);
                    setNewOption(newOption);
                    enqueueSnackbar('外汇储备与黄金', { variant: 'success' });
                } else {
                    enqueueSnackbar('外汇储备与黄金 find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`外汇储备与黄金 find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...newOption} />
        </MainCard>
    );
};

export default ForeignReserveAndGold;
