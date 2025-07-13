import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} 
from "recharts"


const CustomBarChart = ({data,xKey = "category"}) => {

     if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full h-[300px] bg-white flex items-center justify-center text-gray-400 text-sm mt-6">
        No data to display
      </div>
    );
  }

    //function to alternate colours
    const getBarColor = (index) => {
        return index % 2 === 0 ? "#075cf5" : "#cfbefb"
    };

    const CustomToolTip = ({active, payload}) => {
        if (active && payload && payload.length){
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    <p className='text-xs font-semibold text-purple-800 mb-1'>
  {payload[0].payload[xKey]}
</p>
                    <p className='text-sm text-gray-600'>
                        Amount: <span className='text-sm font-medium text-gray-500'>${payload[0].payload.amount}</span>
                    </p>
                </div>
            )
        }
        return null;
    }
  return (
    <div className='w-full h-[300px] bg-white mt-6'>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
            <CartesianGrid stroke="none" />

            <XAxis dataKey={xKey} tick={{fontSize: 12, fill: "#555" }} stroke="none" />
            <YAxis tick={{fontSize: 12, fill: "#555"}} stroke="none" />

            <Tooltip content={CustomToolTip} />

            <Bar dataKey="amount"
            // fill="#1f8042"
            radius={[10,10,0,0]}
            // activeDot={{r:0, fill: "yellow"}}
            // activeStyle={{fill: "green"}}
            >
                {data.map((entry, index) => (
                    <Cell key={index} fill={getBarColor(index)} />
                ))}

            </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
