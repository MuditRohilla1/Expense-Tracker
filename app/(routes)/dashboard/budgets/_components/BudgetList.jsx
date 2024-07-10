"use client"
import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import { db } from '@/utils/dbConfig';
import { eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from './BudgetItem';

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
                .groupBy(Budgets.id);

            console.log("Budget List Result:", result);
            setBudgetList(result);
        } catch (error) {
            console.error("Error fetching budget list:", error);
        }
    };

    return (
        <div className='mt-7'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <CreateBudget />
            </div>
            <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {budgetList.length > 0 ? (
                    renderBudgetItems(budgetList)
                ) : (
                    <p>No budgets available</p>
                )}
            </div>
        </div>
    );
}

const renderBudgetItems = (budgetList) => {
    const budgetItems = [];
    for (let i = 0; i < budgetList.length; i++) {
        budgetItems.push(
            <BudgetItem key={budgetList[i].id} budget={budgetList[i]} />
        );
    }
    return budgetItems;
};

export default BudgetList;
