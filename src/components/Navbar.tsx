import { ActionList, TopBar } from '@shopify/polaris';
import React, { useCallback, useRef, useState } from 'react';

const Navbar = () => {
    const defaultState = useRef({
        emailFieldValue: 'amanjaiswal@cedcommerce.com',
        nameFieldValue: 'Aman Jaiswal',
    });
    const [userMenuActive, setUserMenuActive] = useState(false);

    const toggleUserMenuActive = useCallback(() => setUserMenuActive((userMenuActive) => !userMenuActive), []);

    const userMenuMarkup = (
        <TopBar.UserMenu
            actions={[]}
            name="Aman Jaiswal"
            detail={defaultState.current.nameFieldValue}
            initials="AJ"
            open={userMenuActive}
            onToggle={toggleUserMenuActive}
        />
    );
    return (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
        />
    );
};

export default Navbar;
