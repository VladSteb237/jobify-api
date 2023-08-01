import React from 'react';
import Wrapper from '../assets/wrappers/StatItem';

const StatsItem = (props) => {
    const { color, icon, title, count } = props;
    return (
        <Wrapper color={color}>
            <header>
                <span className='count'>{count}</span>
                <div className='icon'>{icon}</div>
            </header>
            <h5 className='title'>{title}</h5>
        </Wrapper>
    );
};

export default StatsItem;
