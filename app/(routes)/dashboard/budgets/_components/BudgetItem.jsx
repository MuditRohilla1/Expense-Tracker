import Link from 'next/link';
import React from 'react';

function BudgetItem({ budget }) {

    const calculateProgress=()=>{
        const perc=(budget?.totalSpend/ budget?.amount)*100;
        return perc.toFixed(2);
    }
    return (

        <Link href={'/dashboard/expenses/'+budget?.id} >
        <div className='p-4 border rounded-lg gap-5 bg-orange-50 hover:shadow-md cursor-pointer h-[170px]'>
            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <h2 className='text-xl p-3 bg-slate-100 shadow-lg rounded-full'>{budget?.icon}</h2>
                    <div>
                        <h2 className='text-xl font-bold uppercase font-serif'>{budget?.name}</h2>
                        <h2 className='text-sm text-gray-500'>Items: {budget?.totalItems}</h2>
                    </div>
                </div>
                <h2 className='font-bold text-primary text-lg'>${budget?.amount}</h2>
            </div>

            <div className='mt-5'>

                <div className='flex items-center justify-between mb-3'>
                    <h2 className='text-xs text-slate-400'>${budget?.totalSpend?budget?.totalSpend:0} Spend </h2>
                    <h2 className='text-xs text-slate-400'>${budget?.amount-budget?.totalSpend} Remaining</h2>

                </div>

                <div className='w-full bg-orange-200 h-2 rounded-full'>
                    <div className='bg-primary h-2 rounded-full'
                    style={{width:`${calculateProgress()}%`}}>

                    </div>
                </div>
            </div>
            </div>
        </Link>
    );
}

export default BudgetItem;
