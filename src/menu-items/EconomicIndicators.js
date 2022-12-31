// assets
import ApartmentIcon from '@mui/icons-material/Apartment';

const economic = {
    id: 'EconomicIndicators',
    title: '经济指标',
    type: 'group',
    children: [
        {
            id: 'macro',
            title: '宏观',
            type: 'collapse',
            icon: ApartmentIcon,
            children: [
                {
                    id: 'tabler-icons',
                    title: '沪深300市盈率',
                    type: 'item',
                    url: '/macroscopic/sh300pe',
                    breadcrumbs: false
                },
                {
                    id: 'sino-us-treasury-bonds',
                    title: '中美国债收益率',
                    type: 'item',
                    url: '/macroscopic/bond_zh_us_rate',
                    breadcrumbs: false
                },
                {
                    id: 'total-social-flows',
                    title: '社会融资总量',
                    type: 'item',
                    url: '/macroscopic/social_financing_flows',
                    breadcrumbs: false
                },
                {
                    id: 'social-financing-stock',
                    title: '社会融资存量',
                    type: 'item',
                    url: '/macroscopic/social_financing_stock',
                    breadcrumbs: false
                },
                {
                    id: 'futures-foreign',
                    title: '期货',
                    type: 'collapse',
                    children: [
                        {
                            id: 'futures-foreign-cad',
                            title: '铜',
                            type: 'item',
                            url: '/macroscopic/futures_foreign_hist/CAD',
                            breadcrumbs: false
                        }
                    ]
                },
                {
                    id: 'macroscopic-ppi',
                    title: '生产者物价指数 PPI',
                    type: 'item',
                    url: '/macroscopic/cn/ppi',
                    breadcrumbs: false
                },
                {
                    id: 'macroscopic-gdp',
                    title: '国内生产总值 GDP',
                    type: 'item',
                    url: '/macroscopic/cn/gdp',
                    breadcrumbs: false
                },
                {
                    id: 'macroscopic-pmi',
                    title: '采购经理人指数 PMI',
                    type: 'item',
                    url: '/macroscopic/cn/pmi',
                    breadcrumbs: false
                },
                {
                    id: 'macroscopic-cxpmi',
                    title: '财新采购经理人指数 PMI',
                    type: 'item',
                    url: '/macroscopic/cx_pmi',
                    breadcrumbs: false
                },
                {
                    id: 'macroscopic-cpi',
                    title: '消费者物价指数 CPI',
                    type: 'item',
                    url: '/macroscopic/cn/cpi',
                    breadcrumbs: false
                },
                {
                    id: 'macroscopic-money-supply',
                    title: '货币供应',
                    type: 'item',
                    url: '/macroscopic/cn/money_supply',
                    breadcrumbs: false
                },
                {
                    id: 'macroscopic-consumer-goods-retail',
                    title: '社会消费品零售总额',
                    type: 'item',
                    url: '/macroscopic/consumer_goods_retail',
                    breadcrumbs: false
                },
                {
                    id: 'value-added-of-industrial-production',
                    title: '工业生产增长',
                    type: 'item',
                    url: '/macroscopic/value_added_of_industrial_production',
                    breadcrumbs: false
                },
                {
                    id: 'social-electricity-consumption',
                    title: '全社会用电',
                    type: 'item',
                    url: '/macroscopic/social_electricity_consumption',
                    breadcrumbs: false
                },
                {
                    id: 'passenger-and-freight-traffic',
                    title: '全社客货运输量',
                    type: 'item',
                    url: '/macroscopic/passenger_and_freight_traffic',
                    breadcrumbs: false
                },
                {
                    id: 'new-financial-credit',
                    title: '中国新增信贷数据',
                    type: 'item',
                    url: '/macroscopic/new_financial_credit',
                    breadcrumbs: false
                },
                {
                    id: 'foreign-reserve-and-gold',
                    title: '外汇储备与黄金',
                    type: 'item',
                    url: '/macroscopic/foreign_reserve_and_gold',
                    breadcrumbs: false
                },
                {
                    id: 'investment-in-fixed-assets',
                    title: '固定资产投资',
                    type: 'item',
                    url: '/macroscopic/investment_in_fixed_assets',
                    breadcrumbs: false
                },
                {
                    id: 'housing-starts-under-construction-completion',
                    title: '房地产施工、开工、竣工面积',
                    type: 'item',
                    url: '/macroscopic/housing_starts_under_construction_completion',
                    breadcrumbs: false
                }
            ]
        }
    ]
};
export default economic;
