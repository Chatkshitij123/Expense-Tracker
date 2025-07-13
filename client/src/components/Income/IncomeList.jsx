// import moment from 'moment'
// import React from 'react'
// import { LuDownload } from 'react-icons/lu'
// import TransactionInfoCard from '../cards/TransactionInfoCard'

// const IncomeList = ({transactions, onDelete, onDownload}) => {
//   return (
//     <div className='card'>
//       <div className='flex items-center justify-between'>
//         <h5 className='text-lg'>Income Sources</h5>

//         <button className='card-btn' onClick={onDownload}>
//             <LuDownload className='text-base' /> Download
//         </button>
//       </div>

//       <div className='grid grid-cols-1 md:grid-cols-2'>
//         {transactions?.map((income) => (
//             <TransactionInfoCard
//             key={income._id}
//             title={income.source}
//             icon={income.icon}
//             date={moment(income.date).format("DD MMM YYYY")}
//             amount={income.amount}
//             type="income"
//             onDelete={() => onDelete(income._id)} />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default IncomeList

import moment from 'moment'
import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../cards/TransactionInfoCard'

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  const hasTransactions = Array.isArray(transactions) && transactions.length > 0;

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Income Sources</h5>

        {hasTransactions && (
          <button className='card-btn' onClick={onDownload}>
            <LuDownload className='text-base' /> Download
          </button>
        )}
      </div>

      {hasTransactions ? (
        <div className='grid grid-cols-1 md:grid-cols-2'>
          {transactions.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("DD MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))}
        </div>
      ) : (
        <div className='text-sm text-gray-400 text-center py-10'>
          No income sources available yet.
        </div>
      )}
    </div>
  )
}

export default IncomeList
