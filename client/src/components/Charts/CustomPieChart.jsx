import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts"
import CustomToolTip from './CustomToolTip'
import CustomLegend from './CustomLegend'

const CustomPieChart = ({data,label,totalAmount,colors,showTextAnchor}) => {
     if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full h-[300px] bg-white flex items-center justify-center text-gray-400 text-sm mt-6">
        No data to display
      </div>
    );
  }
  return (
     <div className="w-full max-w-[400px] mx-auto">
    <ResponsiveContainer width="100%" aspect={1}>
      <PieChart  margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
        <Pie
        data={data}
        dataKey="amount"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={130}
        innerRadius={100}
        labelLine={false}
        >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
        </Pie>
        <Tooltip content={<CustomToolTip />} />
        <Legend content={<CustomLegend />} />

        {showTextAnchor && (
            <>
            <text
                x="50%"
                y="50%"
                dy={-25}
                textAnchor='middle'
                fill="#665"
                fontSize="14px"
                >
                    {label}
                </text>
                <text
                x="50%"
                y="50%"
                dy={8}
                textAnchor='middle'
                fill="#333"
                fontSize="24px"
                fontWeight="semi-bold"
                >
                    {totalAmount}
                </text>
            </>
        )}
      </PieChart>
    </ResponsiveContainer>
    </div>
  )
}

export default CustomPieChart
