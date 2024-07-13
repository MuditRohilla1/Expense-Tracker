import { Trash } from 'lucide-react';
import React from 'react';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { toast } from 'sonner';
import { eq } from 'drizzle-orm';

function ExpenseListTable({ expenseList , refreshData}) {

    const deleteExpenses = async(expense)=>{
        const result = await db.delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

        if(result)
        {
            refreshData();
            toast('Expense Deleted!')
        }
    }

    const renderExpenses = () => {
        const expenseRows = [];
        if (Array.isArray(expenseList)) {
            for (let i = 0; i < expenseList.length; i++) {
                const expenses = expenseList[i];
                expenseRows.push(
                    <div key={i} className="grid grid-cols-4 bg-slate-100 p-2 border-b border-slate-300">
                        <h2>{expenses.name}</h2>
                        <h2>{expenses.amount}</h2>
                        <h2>{expenses.createdAt}</h2>
                        <h2>
                            <Trash className="text-red-600 cursor-pointer" 
                                onClick={() => deleteExpenses(expenses)}
                            />
                        </h2>
                    </div>
                );
            }
        }
        return expenseRows;
    };

    return (
        <div className="mt-3">
        <h2 className='font-bold text-3xl mb-2'>Latest Expenses</h2>
            <div className="grid grid-cols-4 bg-slate-300 p-2 font-semibold rounded-t-xl">
                <h2 className='font-bold'>Name</h2>
                <h2 className='font-bold'>Amount</h2>
                <h2 className='font-bold'>Date</h2>
                <h2 className='font-bold'>Action</h2>
            </div>
            {renderExpenses()}
        </div>
    );
}

export default ExpenseListTable;
