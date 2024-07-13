import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

function DashboardHeader() {
    return (
        <div className='p-5 border border-black flex justify-between items-center shadow-xl rounded-lg w-full'>
            <h1 className='hidden lg:block w-full h-10 font-bold text-3xl bg-gradient-to-l from-orange-400 to-amber-900 bg-clip-text text-transparent'>Your Own Expense Tracker</h1>
            <div className='flex justify-between gap-3 lg:hidden md:hidden'>
                <Link href='/dashboard'>
                    <Button className='lg:text-3xl md:text-2xl  font-bold font-serif shadow-md hover:bg-slate-700 hover:shadow-lg'>Dashboard</Button>
                </Link>

                <Link href='/dashboard/budgets'>
                    <Button className='lg:text-3xl md:text-2xl  font-bold font-serif shadow-md hover:bg-slate-700 hover:shadow-lg'>Budgets</Button>
                </Link>
            </div>

            <div className='flex justify-end w-full'>
                <UserButton />
            </div>
        </div>
    )
}

export default DashboardHeader