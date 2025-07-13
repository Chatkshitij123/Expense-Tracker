// import React from 'react'
// import { LuArrowRight } from 'react-icons/lu'
// import moment from "moment"
// import TransactionInfoCard from '../cards/TransactionInfoCard'


// const RecentTransactions = ({transactions = [],onSeeMore}) => {
//   return (
//     <div className='card'>
//         <div className='flex items-center justify-between'>
//             <h5 className='text-lg'>Recent Transactions</h5>

//             <button className='card-btn' onClick={onSeeMore}>
//                 See All <LuArrowRight className='text-base' />
//             </button>
//         </div>

//         <div className='mt-6'>
//             {transactions?.slice(0,5)?.map((item) => (
//                 <TransactionInfoCard
//                 key={item._id}
//                 title={item.type == "expense" ? item.category : item.source}
//                 icon={item.icon}
//                 date={moment(item.date).format("DD MM YYYY")}
//                 amount={item.amount}
//                 type={item.type}
//                 hideDeletebtn
//                 />
//             ))}
//         </div>
//         <div className=''>
//             <div>
                
//             </div>
//         </div>
//       </div>
//   )
// }

// export default RecentTransactions

import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../cards/TransactionInfoCard';

const RecentTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Recent Transactions</h5>

        <button className='card-btn' onClick={onSeeMore}>
          See All <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className='mt-6'>
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => {
            const IconComponent = item.icon;
            return (
              <TransactionInfoCard
                key={item._id}
                title={item.type === 'expense' ? item.category : item.source}
                icon={IconComponent ? <IconComponent /> : null}
                date={moment(item.date).format('DD MM YYYY')}
                amount={item.amount}
                type={item.type}
                hideDeletebtn
              />
            );
          })
        ) : (
          <p className='text-sm text-gray-500 text-center'>
            No recent transactions available.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;

