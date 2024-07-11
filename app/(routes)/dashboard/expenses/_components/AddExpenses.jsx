import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { Loader2 } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpenses({ budgetId, user, refreshData }) {

    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [Loading, setLoading] = useState(false);

    const addNewExpense = async () => {
        try {
            setLoading(true);
            const result = await db.insert(Expenses).values({
                name: name,
                amount: amount,
                budgetId: budgetId,
                createdAt: moment().format('DD/MM/yyy')
            }).returning({ insertedId: Budgets.id });

            setAmount('');
            setName('');

            console.log(result);
            if (result) {
                setLoading(false);
                refreshData();
                toast('New Expense Added!')
            }
            setLoading(false);
        }
        catch (err) {
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input
                    type="number"
                    placeholder="e.g. 1000$"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button disabled={!(name && amount) || Loading}
                onClick={() => addNewExpense()}
                className='bg-primary w-full text-white font-bold py-2 px-4 rounded mt-3'>
                {Loading ?
                    <Loader2 className='animate-spin' /> : "Add New Expense"
                }
            </Button>
        </div>
    )
}

export default AddExpenses