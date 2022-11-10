import dashboard from '../redux/sidebar/dashboard';
import topics from '../redux/sidebar/topics';
// import consumers from './consumers';
// import brokers from './brokers';
// import producers from './producers';
// import configs from './configs';
import pages from './pages';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, pages, topics]
};

export default menuItems;
