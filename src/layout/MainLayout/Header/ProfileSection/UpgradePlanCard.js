// material-ui
import { styled } from '@mui/material/styles';
import { Button, Card, Divider, CardContent, Grid, Stack, Typography } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// redux
import { useSelector } from 'react-redux';
import { selectAllSites } from 'redux/site/sitesSlice';

// styles
const CardStyle = styled(Card)(({ theme }) => ({
    background: theme.palette.warning.light,
    marginTop: '16px',
    marginBottom: '16px',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: '200px',
        height: '200px',
        border: '19px solid ',
        borderColor: theme.palette.warning.main,
        borderRadius: '50%',
        top: '65px',
        right: '-150px'
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '200px',
        height: '200px',
        border: '3px solid ',
        borderColor: theme.palette.warning.main,
        borderRadius: '50%',
        top: '145px',
        right: '-70px'
    }
}));

// ==============================|| Site info ||============================== //

const UpgradePlanCard = () => {
    const sites = useSelector(selectAllSites);
    const site = sites[0];
    return (
        <CardStyle>
            <CardContent>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="h4">
                            {site.ip} : {site.port}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" color="grey.900" sx={{ opacity: 0.6 }}>
                            creation time <br />
                            {new Date(parseInt(site.loginTime, 10) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')}
                        </Typography>
                        <Divider />
                        <Typography variant="subtitle2" color="grey.900" sx={{ opacity: 0.6 }}>
                            <Typography>
                                Description <br />
                            </Typography>
                            {site.description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="row">
                            <AnimateButton>
                                <Button variant="contained" color="warning" sx={{ boxShadow: 'none' }}>
                                    Go Particulars
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </CardStyle>
    );
};

export default UpgradePlanCard;
