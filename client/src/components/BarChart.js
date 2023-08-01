import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const BarChartComponent = (props) => {
    const { data } = props;
    return (
        <ResponsiveContainer width='100 %' height={300}>
            <BarChart data={data} margin={{ top: 50 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey={data} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey='count' fill='#2cb1bc' barSize={75} />
            </BarChart>
        </ResponsiveContainer >
    );
};

export default BarChartComponent;
