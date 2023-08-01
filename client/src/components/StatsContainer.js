import React from 'react';
import StatsItem from './StatsItem';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/StatsContainer';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

const StatsContainer = () => {
    const { stats } = useAppContext();
    const defaultStats = [
        {
            title: 'pending applications',
            count: stats.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: '#e9b949',
            bcg: '#fcefc7',
        },
        {
            title: 'interview scheduled',
            count: stats.interview || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9',
        },
        {
            title: 'jobs declined',
            count: stats.declined || 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee',
        },
    ];
    return (
        <Wrapper>
            {defaultStats.map((item, index) => {
                return (
                    <StatsItem key={index}{...item} />
                );
            })}
        </Wrapper>
    );
};

export default StatsContainer;
