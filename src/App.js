import { useSelector } from 'react-redux';

// material ui
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';

// notification
import { SnackbarProvider } from 'notistack';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <SnackbarProvider>
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </SnackbarProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
