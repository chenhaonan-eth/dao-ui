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
// ===========================|| SH300 ||=========================== //

const CnPmi = () => {
    const chart1 = {
        series: [
            {
                name: '制造业',
                data: []
            },
            {
                name: '同比增加(%)',
                data: []
            },
            {
                name: '非制造业',
                data: []
            },
            {
                name: '同比增加(%)',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'pmi',
                type: 'line'
            },
            title: {
                text: '采购经理人指数 PMI',
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

    useEffect(() => {
        axios('get', location.pathname)
            .then((response) => {
                if (response && response.results && response.results.length > 0) {
                    const newOption = cloneDeep(chart1);
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < response.results.length; i++) {
                        newOption.options.xaxis.categories.push(response.results[i].date);
                        newOption.series[0].data.push(response.results[i].manufacturing);
                        newOption.series[1].data.push(Math.floor(response.results[i].manufacturingYearOnYear * 100) / 100);
                        newOption.series[2].data.push(response.results[i].nonManufacturing);
                        newOption.series[3].data.push(Math.floor(response.results[i].nonManufacturingYearOnYear * 100) / 100);
                    }
                    ApexCharts.exec(`pmi`, 'updateOptions', newOption.options);
                    ApexCharts.exec(`pmi`, 'updateSeries', newOption.series);
                    enqueueSnackbar('采购经理人指数 PMI', { variant: 'success' });
                } else {
                    enqueueSnackbar('采购经理人指数 PMI find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`采购经理人指数 PMI find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...chart1} />
        </MainCard>
    );
};

export default CnPmi;
