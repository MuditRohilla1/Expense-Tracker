"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideNav() {
    const menuList = [
        {
            id:1,
            name:'Dashboard',
            icon:LayoutGrid,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Budget',
            icon:PiggyBank,
            path:'/dashboard/budgets'
        },
        // {
        //     id:3,
        //     name:'Expenses',
        //     icon:ReceiptText,
        //     path:'/dashboard/expenses'
        // },
        // {
        //     id:4,
        //     name:'Upgrades',
        //     icon:ShieldCheck,
        //     path:'/dashboard/upgrades'            
        // },
    ]

    const path = usePathname();

    useEffect(() => {
        console.log(path)
    }, [path])

    const { user } = useUser();

    return (
        <div className='h-screen p-5 border border-black rounded-lg shadow-lg'>
            <Image
                src={'/logo.svg'}
                alt={'logo'}
                width={160}
                height={100}
            />

            <div className='mt-5'>
                {menuList.map((menu) => (
                    <Link href={menu.path}>
                        <h2 className={`flex gap-2 items-center text-gray-600 font-medium mb-2 cursor-pointer p-5 rounded-md hover:text-primary hover:bg-orange-100 ${path==menu.path && 'text-primary bg-orange-100'}`}>
                            <menu.icon/>
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>

            <div className='fixed bottom-10 flex p-5 gap-2 items-center'>
                <UserButton/>
                {user?.fullName}
            </div>
        </div>
    )
}

export default SideNav
