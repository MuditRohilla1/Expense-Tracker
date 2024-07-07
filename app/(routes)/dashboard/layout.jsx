"use client";
import React, { useEffect } from 'react';
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function DashboardLayout({ children }) {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            checkUserBudget();
        }
    }, [user]);

    const checkUserBudget = async () => {
        if (user?.primaryEmailAddress?.emailAddress) {
            const result = await db
                .select()
                .from(Budgets)
                .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress));
            console.log(result);
            if (result?.length === 0) {
                router.push('/dashboard/budgets');
            }
        }
    };

    return (
        <div>
            <div className='fixed md:w-64 hidden md:block'>
                <SideNav />
            </div>
            <div className='md:ml-64'>
                <DashboardHeader />
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;
