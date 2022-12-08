import { useEffect } from 'react';
import { Grid } from '@mui/material';
// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import MainCard from 'ui-component/cards/MainCard';
import chartData from './chart-data/generate-day-wise-time-series';
import axios from 'utils/axios';

function EquityBbondYieldSpreads({ isLoading }) {
    useEffect(() => {
        axios('get', '/getEquityBbondYieldSpreads').then((response) => {
            const array1 = Object.keys(response.data);
            const array2 = Object.values(response.data);
            const arr = [];
            // array1.forEach((currentValue, index) => arr.push([new Date(currentValue).getTime(), array2[index]]));
            array1.forEach((currentValue, index) => arr.push([currentValue, array2[index]]));
            console.log(arr);
            const newOption = {
                series: [
                    {
                        data: arr
                    }
                ]
            };
            ApexCharts.exec(chartData.options.chart.id, 'updateOptions', newOption);
        });
    }, []);
    return (
        <MainCard>
            <Grid item xs={12}>
                <Chart {...chartData} />
            </Grid>
        </MainCard>
    );
}

export default EquityBbondYieldSpreads;
