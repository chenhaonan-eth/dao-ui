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

const HousingStartsUnderConstructionCompletion = () => {
    const chart1 = {
        series: [
            {
                name: '施工面积_累计值(万平方米)',
                data: []
            },
            {
                name: '施工面积_累计增长(%)',
                data: []
            },
            {
                name: '新开工施工面积_累计值(万平方米)',
                data: []
            },
            {
                name: '新开工施工面积_累计增长(%)',
                data: []
            },
            {
                name: '竣工面积_累计值(万平方米)',
                data: []
            },
            {
                name: '竣工面积_累计增长(%)',
                data: []
            }
        ],
        height: 480,
        options: {
            chart: {
                id: 'housing_starts_under_construction_completion',
                type: 'line'
            },
            title: {
                text: '房地产施工、开工、竣工面积',
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
                        newOption.series[0].data.push(Math.floor(response.results[i].underConstruction * 100) / 100);
                        newOption.series[1].data.push(response.results[i].underConstructionIncreasedCumulatively);
                        newOption.series[2].data.push(Math.floor(response.results[i].starts * 100) / 100);
                        newOption.series[3].data.push(response.results[i].startsIncreasedCumulatively);
                        newOption.series[4].data.push(Math.floor(response.results[i].completion * 100) / 100);
                        newOption.series[5].data.push(response.results[i].completionIncreasedCumulatively);
                    }
                    ApexCharts.exec(`housing_starts_under_construction_completion`, 'updateOptions', newOption.options);
                    ApexCharts.exec(`housing_starts_under_construction_completion`, 'updateSeries', newOption.series);
                    setNewOption(newOption);
                    enqueueSnackbar('房地产施工、开工、竣工面积', { variant: 'success' });
                } else {
                    enqueueSnackbar('房地产施工、开工、竣工面积 find data is null', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar(`房地产施工、开工、竣工面积 find data err`, { variant: 'error' });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...newOption} />
        </MainCard>
    );
};

export default HousingStartsUnderConstructionCompletion;
