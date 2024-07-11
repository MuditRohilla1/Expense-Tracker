import React from 'react';
import { BarChart, Bar, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

function BarchartDashboard({ budgetList }) {
    return (
        <div className='border rounded-lg p-5' style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="80%" height="100%">
            <h2 className='font-bold text-lg'>Activity</h2>
                <BarChart
                    data={budgetList}
                    margin={{
                        top: 7,
                        right: 5,
                        left: 5,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='totalSpend' stackId="a" fill='#ffA500' />
                    <Bar dataKey='amount' stackId="a" fill='#FFDBBB' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarchartDashboard;
