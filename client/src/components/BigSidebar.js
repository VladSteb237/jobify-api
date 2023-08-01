import React from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/BigSidebar';

const BigSidebar = () => {
    const { showSidebar } = useAppContext();
    return (
        <Wrapper>
            <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
                <div className='content'>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    );
};

export default BigSidebar;
