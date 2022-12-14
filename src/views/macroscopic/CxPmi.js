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

const CnPmi = () => {
    const chart1 = {
        series: [
            {
                name: '制造业',
                data: []
            },
            {
                name: '服务业',
                data: []
            },
            {
                name: '综合',
                data: []
            },
            {
                name: '制造业环比 %',
                data: []
            },
            {
                name: '服务业环比 %',
                data: []
            },
            {
                name: '综合环比 %',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'cxpmi',
                type: 'line'
            },
            title: {
                text: '财新采购经理人指数 PMI',
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
                        newOption.series[0].data.push(response.results[i].manufacture);
                        newOption.series[1].data.push(response.results[i].service);
                        newOption.series[2].data.push(response.results[i].synthesis);
                        newOption.series[3].data.push(response.results[i].manufactureYearOverYear);
                        newOption.series[4].data.push(response.results[i].serviceYearOverYear);
                        newOption.series[5].data.push(response.results[i].synthesisYearOverYear);
                    }
                    ApexCharts.exec(`cxpmi`, 'updateOptions', newOption.options);
                    ApexCharts.exec(`cxpmi`, 'updateSeries', newOption.series);
                    setNewOption(newOption);
                    enqueueSnackbar('财新采购经理人指数 PMI', { variant: 'success' });
                } else {
                    enqueueSnackbar('财新采购经理人指数 PMI find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`财新采购经理人指数 PMI find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...newOption} />
        </MainCard>
    );
};

export default CnPmi;
