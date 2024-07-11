'use client'
import { useUser } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';
import CardsInfo from './_components/CardsInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';

function Page() {
    const { user } = useUser();
    const [budgetList, setBudgetList] = useState([]);

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
        <div className='p-5'>
            <h2 className='font-bold text-3xl font-serif'>Hi, {user?.fullName}</h2>
            <p className='text-gray-600'>Here's what's happening with your money, let's manage your expenses!</p>

            <CardsInfo budgetList={budgetList} />
        </div>
    );
}

export default Page;
