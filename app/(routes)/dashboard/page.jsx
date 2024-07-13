'use client'
import { useUser } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';
import CardsInfo from './_components/CardsInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import BarchartDashboard from './_components/BarchartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Page() {
    const { user } = useUser();
    const [budgetList, setBudgetList] = useState([]);
    const [expensesList, setExpensesList] = useState([]);

    useEffect(() => {
        if (user) {
            getBudgetList();
        }
    }, [user]);

    const getAllExpenses =async()=>{
        const result = await db.select({
            id:Expenses.id,
            name:Expenses.name,
            amount:Expenses.amount,
            createdAt:Expenses.createdAt
        })
        .from(Budgets)
        .rightJoin(Expenses,eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(Expenses.id))
        ;
        setExpensesList(result);        
    }

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
            getAllExpenses();
        } catch (error) {
            console.error("Error fetching budget list:", error);
        }
    };

    return (
        <div className='p-5 bg-gradient-to-b from-orange-400 to-amber-900 rounded-xl'>
            <h2 className='font-bold text-3xl font-serif'>Hi, {user?.fullName}</h2>
            <p className='text-gray-600'>Here's what's happening with your money, let's manage your expenses!</p>

            <CardsInfo budgetList={budgetList} />
            <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
                <div className='md:col-span-2'>
                    <BarchartDashboard budgetList={budgetList} />

                    <ExpenseListTable
                        expenseList={expensesList}
                        refreshData={()=>{
                            getBudgetList()
                        }}
                    />
                </div>
                <div className='grid gap-5'>
                <h2 className='font-bold text-3xl'>Latest Budget</h2>
                    {budgetList.map((budget, index) => (
                        <BudgetItem budget={budget} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page;
