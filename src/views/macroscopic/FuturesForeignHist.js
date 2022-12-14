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

const FuturesForeignHist = () => {
    const chart1 = {
        series: [
            {
                name: '收盘价',
                data: []
            },
            {
                name: '成交量',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'futures_foreign_hist',
                type: 'line'
            },
            title: {
                text: '期货',
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
                        newOption.series[0].data.push(parseFloat(response.results[i].lose));
                        newOption.series[1].data.push(parseFloat(response.results[i].volume));
                    }
                    newOption.options.title.text = `期货${response.results[0].symbol}`;
                    ApexCharts.exec(`futures_foreign_hist`, 'updateOptions', newOption.options);
                    ApexCharts.exec(`futures_foreign_hist`, 'updateSeries', newOption.series);
                    setNewOption(newOption);
                    enqueueSnackbar('期货', { variant: 'success' });
                } else {
                    enqueueSnackbar('期货 find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`期货 find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...newOption} />
        </MainCard>
    );
};

export default FuturesForeignHist;
