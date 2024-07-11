"use client"
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { eq, getTableColumns } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { Expenses } from '@/utils/schema'
import BudgetItem from '../../budgets/_components/BudgetItem'
import { Skeleton } from '@/components/ui/skeleton'
import AddExpenses from '../_components/AddExpenses'

function ExpensesScreen({params}) {
    
    const { user } = useUser();
    const [budgetInfo , setbudgetInfo] = useState();
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
                .groupBy(Budgets.id)
                ;
                
                setbudgetInfo(result[0]);
            console.log("Budget List Result:", result);
        } catch (error) {
            console.error("Error fetching budget list:", error);
        }
    };
    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold p-10'>My Expenses</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {budgetInfo? <BudgetItem 
                    budget={budgetInfo}
                />: <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-400">
                            <Skeleton className="h-4 w-[230px] bg-slate-500 mt-20 ml-2"/>
                            <Skeleton className="h-4 w-[200px] bg-slate-500 mt-1 ml-2" />
                        </Skeleton>
                    </div>
                }
                <AddExpenses budgetId = {params.id}
                    user={user}
                    refreshData={()=>{
                        getBudgetInfo();
                    }}
                />
            </div>
        </div>
    )
}

export default ExpensesScreen