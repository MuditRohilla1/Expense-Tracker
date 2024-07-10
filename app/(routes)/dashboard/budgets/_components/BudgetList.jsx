"use client"
import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import { db } from '@/utils/dbConfig';
import { eq, getTableColumns, sql, desc } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from './BudgetItem';
import { Skeleton } from '@/components/ui/skeleton';

function BudgetList() {
    const [budgetList, setBudgetList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            getBudgetList();
        }
    }, [user]);

    const getBudgetList = async () => {
        try {
            const result = await db.select({
                ...getTableColumns(Budgets),
                totalSpend: sql`coalesce(sum(CAST(${Expenses.amount} AS NUMERIC)), 0)`.mapWith(Number),
                totalItems: sql`count(${Expenses.id})`.mapWith(Number)
            })
                .from(Budgets)
                .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
                .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
                .groupBy(Budgets.id)
                .orderBy(desc(Budgets.id));

            console.log("Budget List Result:", result);
            setBudgetList(result);
        } catch (error) {
            console.error("Error fetching budget list:", error);
        }
    };

    return (
        <div className='mt-7'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <CreateBudget refreshData={() => getBudgetList()} />
            </div>
            <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {budgetList.length > 0 ? (
                    renderBudgetItems(budgetList)
                ) : (
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-400">
                            <Skeleton className="h-4 w-[230px] bg-slate-500 mt-20 ml-2"/>
                            <Skeleton className="h-4 w-[200px] bg-slate-500 mt-1 ml-2" />
                        </Skeleton>
                    </div>
                )}
            </div>
        </div>
    );
}

const renderBudgetItems = (budgetList) => {
    return budgetList.map(budget => (
        <BudgetItem key={budget.id} budget={budget} />
    ));
};

export default BudgetList;
