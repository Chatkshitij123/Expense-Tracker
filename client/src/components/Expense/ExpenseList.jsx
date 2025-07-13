// import React from 'react'
// import { LuDownload } from 'react-icons/lu'
// import TransactionInfoCard from '../cards/TransactionInfoCard'
// import moment from 'moment'

// const ExpenseList = ({transactions, onDelete, onDownload}) => {
//   return (
//     <div className='card'>
//       <div className='flex items-center justify-between'>
//         <h5 className='text-lg'>All Expenses</h5>

//         <button className='card-btn' onClick={onDownload}>
//             <LuDownload className='text-base' /> Download
//         </button>
//       </div>

//       <div className='grid grid-cols-1 md:grid-cols-2'>
//         {transactions?.map((expense) => (
//             <TransactionInfoCard
//             key={expense._id}
//             title={expense.category}
//             icon={expense.icon}
//             date={moment(expense.date).format("DD MMM YYYY")}
//             amount={expense.amount}
//             type="expense"
//             onDelete={() => onDelete(expense._id)} />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ExpenseList

import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  const hasTransactions = Array.isArray(transactions) && transactions.length > 0;

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>All Expenses</h5>

        {hasTransactions && (
          <button className='card-btn' onClick={onDownload}>
            <LuDownload className='text-base' /> Download
          </button>
        )}
      </div>

      {hasTransactions ? (
        <div className='grid grid-cols-1 md:grid-cols-2'>
          {transactions.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("DD MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense._id)}
            />
          ))}
        </div>
      ) : (
        <div className='text-sm text-gray-400 text-center py-10'>
          No expenses yet. Add some to see them here.
        </div>
      )}
    </div>
  )
}

export default ExpenseList

