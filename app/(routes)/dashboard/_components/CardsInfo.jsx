import { Skeleton } from '@/components/ui/skeleton';
import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function CardsInfo({ budgetList }) {
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);
    const [budgetCount, setBudgetCount] = useState(0);

    useEffect(() => {
        if (budgetList) {
            calculateCardInfo();
        }
    }, [budgetList]);

    const calculateCardInfo = () => {
        let totalBudget_ = 0;
        let totalSpend_ = 0;
        budgetList.forEach(element => {
            totalBudget_ += Number(element.amount);
            totalSpend_ += element.totalSpend;
        });
        setTotalBudget(totalBudget_);
        setTotalSpend(totalSpend_);
        setBudgetCount(budgetList.length);
        console.log(totalBudget_, totalSpend_);
    };

    return (
        <div>                  
        {budgetList?.length > 0?
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>Total Budget</h2>
                    <h2 className='font-bold text-2xl'>${totalBudget}</h2>
                </div>
                <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
            </div>

            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>Total Spend</h2>
                    <h2 className='font-bold text-2xl'>${totalSpend}</h2>
                </div>
                <ReceiptText className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
            </div>

            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>No. of Budgets</h2>
                    <h2 className='font-bold text-2xl'>{budgetCount}</h2>
                </div>
                <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
            </div>
        </div>
        :
        <div className='mt-3'>
            <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-400">
                    <Skeleton className="h-4 w-[230px] bg-slate-500 mt-20 ml-2"/>
                    <Skeleton className="h-4 w-[200px] bg-slate-500 mt-1 ml-2" />
                </Skeleton>
            </div>
        </div>
        }       
        </div>  
    );
}

export default CardsInfo;
