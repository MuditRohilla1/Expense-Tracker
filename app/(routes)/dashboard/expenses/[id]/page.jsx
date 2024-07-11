"use client"
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import BudgetItem from '../../budgets/_components/BudgetItem';
import { Skeleton } from '@/components/ui/skeleton';
import AddExpenses from '../_components/AddExpenses';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'


function ExpensesScreen({ params }) {
    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState(null);
    const [expensesInfo, setExpensesInfo] = useState([]);
    const router = useRouter()

    useEffect(() => {
        if (user) {
            getBudgetInfo();
        }
    }, [user]);

    const getBudgetInfo = async () => {
        try {
            const result = await db.select({
                ...getTableColumns(Budgets),
                totalSpend: sql`coalesce(sum(CAST(${Expenses.amount} AS NUMERIC)), 0)`.mapWith(Number),
                totalItems: sql`count(${Expenses.id})`.mapWith(Number)
            })
                .from(Budgets)
                .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
                .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
                .where(eq(Budgets.id, params.id))
                .groupBy(Budgets.id);

            setBudgetInfo(result[0]);
            getExpenseList();
        } catch (error) {
            console.error("Error fetching budget list:", error);
        }
    };

    const getExpenseList = async () => {
        try {
            const result = await db.select()
                .from(Expenses)
                .where(eq(Expenses.budgetId, params.id))
                .orderBy(desc(Expenses.id));

            setExpensesInfo(result);
        } catch (error) {
            console.error("Error fetching expense list:", error);
        }
    };

    const deleteBudget = async() =>{

        const deleteExpensesResult = await db.delete(Expenses)
        .where(eq(Expenses.budgetId, params.id))
        .returning();

        if(deleteExpensesResult)
        {
            const result = await db.delete(Budgets)
            .where(eq(Budgets.id, params.id))
            .returning();
        }      
        toast('Budget Deleted!')
        router.push('/dashboard/budgets')
    }

    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold p-10 flex justify-between items-center gap-5'>My Expenses
                <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className ="flex gap-2" variant="destructive"> <Trash/> Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your Budget
                        and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
                
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {budgetInfo ? (
                    <BudgetItem budget={budgetInfo} />
                ) : (
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-400">
                            <Skeleton className="h-4 w-[230px] bg-slate-500 mt-20 ml-2" />
                            <Skeleton className="h-4 w-[200px] bg-slate-500 mt-1 ml-2" />
                        </Skeleton>
                    </div>
                )}
                <AddExpenses 
                    budgetId={params.id}
                    user={user}
                    refreshData={()=>getBudgetInfo()}
                />
            </div>
            <div className='mt-4'>
                <h2 className='font-bold text-lg'>Latest Expenses</h2>
                <ExpenseListTable expenseList={expensesInfo} 
                    refreshData = {()=>{
                        getBudgetInfo()
                    }}
                />
            </div>
        </div>
    );
}

export default ExpensesScreen;
