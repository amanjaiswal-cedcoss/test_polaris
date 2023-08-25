import React, { useEffect } from 'react';
import { Navigation, Frame } from '@shopify/polaris';
import {
    HomeMajor,
    OrdersMajor,
    ProductsMajor,
    ReturnsMajor,
    ActivitiesMajor,
    QuestionMarkMajor,
} from '@shopify/polaris-icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
const Panel = () => {
    const logo = {
        width: 50,
        topBarSource:
            'https://static.vecteezy.com/system/resources/thumbnails/011/999/627/small/monitoring-icon-logo-illustration-dashboard-admin-symbol-template-for-graphic-and-web-design-collection-free-vector.jpg',
        contextualSaveBarSource:
            'https://static.vecteezy.com/system/resources/thumbnails/011/999/627/small/monitoring-icon-logo-illustration-dashboard-admin-symbol-template-for-graphic-and-web-design-collection-free-vector.jpg',
    };
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{navigate('products')},[])
    const navigationMarkup = (
        <Navigation location={location.pathname}>
            <Navigation.Section
                items={[
                    {
                        label: 'Dashboard',
                        icon: HomeMajor,
                        onClick: () => navigate('/dashboard'),
                        selected: location.pathname === '/dashboard',
                    },
                    {
                        label: 'Products',
                        icon: ProductsMajor,
                        onClick: () => navigate('/products'),
                        selected: location.pathname === '/products',
                    },
                    {
                        label: 'Orders',
                        icon: OrdersMajor,
                        badge: '10',
                    },
                    {
                        label: 'Returns',
                        icon: ReturnsMajor,
                    },

                    {
                        label: 'Activities',
                        icon: ActivitiesMajor,
                    },
                    {
                        label: 'Help',
                        icon: QuestionMarkMajor,
                    },
                ]}
            />
        </Navigation>
    );
    
    return (
        <Frame logo={logo} topBar={<Navbar />} navigation={navigationMarkup}>
            <Outlet/>
        </Frame>
    );
};

export default Panel;
