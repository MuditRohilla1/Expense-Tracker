import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpenses({budgetId, user , refreshData}) {

    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    const addNewExpense= async ()=>{
        try{
            const result = await db.insert(Expenses).values({
                name: name,
                amount: amount,
                budgetId: budgetId,
                createdAt: user.primaryEmailAddress?.emailAddress
            }).returning({insertedId: Budgets.id});
    
            console.log(result);
            if(result)
            {
                refreshData();
                toast('New Expense Added!')
            }
        }
        catch(err){
            toast('Error Occured:');
        }
        }
        
    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input
                    placeholder="e.g. Rental"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input
                    type="number"
                    placeholder="e.g. 1000$"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button disabled={!(name&&amount)} 
                onClick={()=> addNewExpense()}
                className='bg-primary w-full text-white font-bold py-2 px-4 rounded mt-3'>
                Add Expense
            </Button>
        </div>
    )
}

export default AddExpenses