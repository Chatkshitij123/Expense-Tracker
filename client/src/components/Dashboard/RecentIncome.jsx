// import React from 'react'
// import { LuArrowRight } from 'react-icons/lu'
// import TransactionInfoCard from '../cards/TransactionInfoCard'
// import moment from 'moment'

// const RecentIncome = ({transactions, onSeeMore}) => {
//   return (
//     <div className='card'>
//       <div className='flex items-center justify-between'>
//         <h5 className='text-lg'>Income</h5>

//         <button className='card-btn' onClick={onSeeMore}>
//             See All <LuArrowRight className='text-base' />
//         </button>
//         </div>
//         <div className='mt-5'>
//             {transactions?.slice(0,5)?.map((item) => (
//                 <TransactionInfoCard
//                 key={item._id}
//                 title={item.source}
//                 icon={item.icon}
//                 date={moment(item.date).format("DD MM YYYY")}
//                 amount={item.amount}
//                 type="income"
//                 hideDeletebtn
//                  />
//             ))}
//         </div>
//     </div>
//   )
// }

// export default RecentIncome

import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import moment from 'moment'

const RecentIncome = ({ transactions, onSeeMore }) => {
  const hasTransactions = Array.isArray(transactions) && transactions.length > 0;

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Income</h5>

        <button className='card-btn' onClick={onSeeMore}>
          See All <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className='mt-5'>
        {hasTransactions ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.source}
              icon={item.icon}
              date={moment(item.date).format("DD MMM YYYY")}
              amount={item.amount}
              type="income"
              hideDeletebtn
            />
          ))
        ) : (
          <p className='text-gray-400 text-sm text-center py-6'>
            No recent income data to display
          </p>
        )}
      </div>
    </div>
  )
}

export default RecentIncome

