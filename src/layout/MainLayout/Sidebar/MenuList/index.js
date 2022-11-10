// material-ui
import { Typography } from '@mui/material';
// react-redux
import { useSelector } from 'react-redux';
import { selectEntitiesSidebar } from 'redux/sidebar/sidebarSlice';

// project imports
import NavGroup from './NavGroup';
// import menuItem from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const sidebarItems = useSelector(selectEntitiesSidebar);
    const navItems = sidebarItems.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
