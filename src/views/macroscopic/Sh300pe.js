import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// notification
import { useSnackbar } from 'notistack';
// axios
import http from 'utils/axios';

const Sh300pe = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    // notification
    const { enqueueSnackbar } = useSnackbar();
    const loadData = async () => {
        try {
            const res = await http('get', location.pathname);
            // console.log('@@@@@@@@@@@@@res', res);
            setData(res?.data ?? []);
            enqueueSnackbar('沪深300市盈率', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(error.toString(), { variant: 'error' });
        }
    };

    useEffect(() => {
        setData([]);
        // use IIFE to avoid creating named function 🤪
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);
    return <div>Sh300pe</div>;
};
export default Sh300pe;
