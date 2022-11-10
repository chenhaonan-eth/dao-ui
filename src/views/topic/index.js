import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// notification
import { useSnackbar } from 'notistack';
// data-grid
import { DataGrid } from '@mui/x-data-grid';

// axios
import http from 'utils/axios';

// redux
import { useSelector } from 'react-redux';
import { selectAllSites } from 'redux/site/sitesSlice';

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: 600,
    width: '100%',
    '& .MuiFormGroup-options': {
        alignItems: 'center',
        paddingBottom: theme.spacing(1),
        '& > div': {
            minWidth: 100,
            margin: theme.spacing(2),
            marginLeft: 0
        }
    }
}));
function SettingsPanel(props) {
    const { onApply, size } = props;
    const [sizeState, setSize] = React.useState(size);
    const [selectedPaginationValue, setSelectedPaginationValue] = React.useState(-1);

    const handleSizeChange = React.useCallback((event) => {
        setSize(Number(event.target.value));
    }, []);

    const handlePaginationChange = React.useCallback((event) => {
        setSelectedPaginationValue(event.target.value);
    }, []);

    const handleApplyChanges = React.useCallback(() => {
        onApply({
            size: sizeState,
            pagesize: selectedPaginationValue
        });
    }, [sizeState, selectedPaginationValue, onApply]);

    return (
        <FormGroup className="MuiFormGroup-options" row>
            <FormControl variant="standard">
                <InputLabel>Rows</InputLabel>
                <Select value={sizeState} onChange={handleSizeChange}>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
                    <MenuItem value={10000}>{Number(10000).toLocaleString()}</MenuItem>
                    <MenuItem value={100000}>{Number(100000).toLocaleString()}</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel>Page Size</InputLabel>
                <Select value={selectedPaginationValue} onChange={handlePaginationChange}>
                    <MenuItem value={-1}>off</MenuItem>
                    <MenuItem value={0}>auto</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
                </Select>
            </FormControl>
            <Button size="small" variant="outlined" color="primary" onClick={handleApplyChanges}>
                <KeyboardArrowRightIcon fontSize="small" /> Apply
            </Button>
        </FormGroup>
    );
}

SettingsPanel.propTypes = {
    onApply: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired
};

const MyTopic = () => {
    // notification
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();
    const sites = useSelector(selectAllSites);
    const [data, setData] = useState([]);
    const [size, setSize] = React.useState(100);
    const [pagination, setPagination] = React.useState({
        pagination: false,
        autoPageSize: false,
        pageSize: undefined
    });
    const columns = [
        { field: 'id', headerName: 'Id', width: 100 },
        { field: 'topic', headerName: 'Topic', editable: true, width: 130 },
        { field: 'partition', headerName: 'Partition', editable: true, width: 120 },
        { field: 'offset', headerName: 'Offset', editable: true, width: 130 },
        { field: 'key', headerName: 'Key', editable: true, width: 110 },
        { field: 'value', headerName: 'Value', editable: true, width: 160 },
        { field: 'time', headerName: 'Time', editable: true, width: 140 }
    ];

    const loadData = async () => {
        try {
            const res = await http('post', location.pathname, { addr: `${sites[0].ip}:${sites[0].port}`, count: size });
            console.log('@@@@@@@@@@@@@res', res);
            setData(res?.data ?? []);
        } catch (err) {
            enqueueSnackbar(err, { variant: 'error' });
            setData([]);
        }
    };
    React.useEffect(() => {
        setData([]);
        // use IIFE to avoid creating named function 🤪
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const handleApplyClick = (settings) => {
        if (size !== settings.size) {
            setSize(settings.size);
        }

        if (size !== settings.size) {
            setData([]);
            loadData();
        }
        const newPaginationSettings = {
            pagination: settings.pagesize !== -1,
            autoPageSize: settings.pagesize === 0,
            pageSize: settings.pagesize > 0 ? settings.pagesize : undefined
        };

        setPagination((currentPaginationSettings) => {
            if (
                currentPaginationSettings.pagination === newPaginationSettings.pagination &&
                currentPaginationSettings.autoPageSize === newPaginationSettings.autoPageSize &&
                currentPaginationSettings.pageSize === newPaginationSettings.pageSize
            ) {
                return currentPaginationSettings;
            }
            return newPaginationSettings;
        });
    };
    return (
        <StyledBox>
            <SettingsPanel onApply={handleApplyClick} size={size} />
            <DataGrid rows={data} columns={columns} checkboxSelection disableSelectionOnClick loading={data.length === 0} {...pagination} />
        </StyledBox>
        // <> {loading ? console.log(data) : 'f'}</>
    );
};
export default MyTopic;
