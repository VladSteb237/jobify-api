import React from 'react';
import Wrapper from '../assets/wrappers/SmallSidebar';
import Logo from './Logo';
import { useAppContext } from '../context/appContext';
import { FaTimes } from 'react-icons/fa';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
    const { toggleSidebar, showSidebar } = useAppContext();
    return (
        <Wrapper>
            <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
                <div className='content'>
                    <button className='close-btn'
                        onClick={toggleSidebar}
                    >
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <div className='nav-links'>
                        <NavLinks toggleSidebar={toggleSidebar} />
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default SmallSidebar;
