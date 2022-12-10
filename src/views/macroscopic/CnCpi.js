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

const CnCpi = () => {
    const options = {
        series: [
            {
                data: [1, 42, 34, 5, 76, 87]
            }
        ],
        height: 230,
        options: {
            chart: {
                id: 'chart2',
                type: 'line',
                toolbar: {
                    autoSelected: 'pan',
                    show: false
                }
            },
            colors: ['#546E7A'],
            stroke: {
                width: 3
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 1
            },
            markers: {
                size: 0
            },
            xaxis: {
                type: 'datetime',
                categories: ['2011/2/13', '2012/2/1', '2013/2/1', '2014/2/1', '2015/4/24', '2017/2/1']
            }
        }
    };
    const optionsLine = {
        series: [
            {
                data: [1, 42, 34, 5, 76, 87]
            }
        ],
        height: 90,
        options: {
            chart: {
                id: 'chart1',
                brush: {
                    target: 'chart2',
                    autoScaleYaxis: true,
                    enabled: true
                },
                selection: {
                    enabled: true,
                    xaxis: {
                        min: new Date('2015/2/13').getTime(),
                        max: new Date('2017/2/1').getTime()
                    }
                }
            },
            xaxis: {
                type: 'datetime',
                categories: ['2011/2/13', '2012/2/1', '2013/2/1', '2014/2/1', '2015/4/24', '2017/2/1'],
                tooltip: {
                    enabled: false
                }
            },
            yaxis: {
                tickAmount: 2
            }
        }
    };
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainCard>
            <Chart {...options} />
            <Chart {...optionsLine} />
        </MainCard>
    );
};

export default CnCpi;
