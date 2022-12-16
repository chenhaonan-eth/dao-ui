import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// Macroscopic routing
const MacroscopicSh300pe = Loadable(lazy(() => import('views/macroscopic/SH300')));
const MacroscopicBondZhUsRate = Loadable(lazy(() => import('views/macroscopic/BondZhUsRate')));
const MacroscopicSocialFinancingFlows = Loadable(lazy(() => import('views/macroscopic/SocialFinancingFlows')));
const MacroscopicSocialFinancingStock = Loadable(lazy(() => import('views/macroscopic/SocialFinancingStock')));
const MacroscopicFuturesForeignHist = Loadable(lazy(() => import('views/macroscopic/FuturesForeignHist')));
const MacroscopicCnPpi = Loadable(lazy(() => import('views/macroscopic/CnPpi')));
const MacroscopicCnGdp = Loadable(lazy(() => import('views/macroscopic/CnGdp')));
const MacroscopicCnPmi = Loadable(lazy(() => import('views/macroscopic/CnPmi')));
const MacroscopicCnCpi = Loadable(lazy(() => import('views/macroscopic/CnCpi')));
const MacroscopicMoneySupply = Loadable(lazy(() => import('views/macroscopic/MoneySupply')));
const MacroscopicConsumerGoodsRetail = Loadable(lazy(() => import('views/macroscopic/ConsumerGoodsRetail')));
const MacroscopicCxPmi = Loadable(lazy(() => import('views/macroscopic/CxPmi')));
const MacroscopicValueAddedOfIndustrialProduction = Loadable(lazy(() => import('views/macroscopic/ValueAddedOfIndustrialProduction')));
const MacroscopicSocialElectricityConsumption = Loadable(lazy(() => import('views/macroscopic/SocialElectricityConsumption')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'macroscopic/sh300pe',
            element: <MacroscopicSh300pe />
        },
        {
            path: 'macroscopic/bond_zh_us_rate',
            element: <MacroscopicBondZhUsRate />
        },
        {
            path: 'macroscopic/social_financing_flows',
            element: <MacroscopicSocialFinancingFlows />
        },
        {
            path: 'macroscopic/social_financing_stock',
            element: <MacroscopicSocialFinancingStock />
        },
        {
            path: 'macroscopic/futures_foreign_hist/*',
            element: <MacroscopicFuturesForeignHist />
        },
        {
            path: 'macroscopic/cn/ppi',
            element: <MacroscopicCnPpi />
        },
        {
            path: 'macroscopic/cn/gdp',
            element: <MacroscopicCnGdp />
        },
        {
            path: 'macroscopic/cn/pmi',
            element: <MacroscopicCnPmi />
        },
        {
            path: 'macroscopic/cx_pmi',
            element: <MacroscopicCxPmi />
        },
        {
            path: 'macroscopic/cn/cpi',
            element: <MacroscopicCnCpi />
        },
        {
            path: 'macroscopic/cn/money_supply',
            element: <MacroscopicMoneySupply />
        },
        {
            path: 'macroscopic/consumer_goods_retail',
            element: <MacroscopicConsumerGoodsRetail />
        },
        {
            path: 'macroscopic/value_added_of_industrial_production',
            element: <MacroscopicValueAddedOfIndustrialProduction />
        },
        {
            path: 'macroscopic/social_electricity_consumption',
            element: <MacroscopicSocialElectricityConsumption />
        },
        {
            path: '*', // 404 page
            element: <div>404</div>
        }
    ]
};

export default MainRoutes;
