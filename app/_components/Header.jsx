"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';

function Header() {

  const{ user, isSignedIn } = useUser();
  return (
    <div className='p-3 flex justify-between shadow-lg align-middle border rounded-sm'>
        <Image
            src={'./LOGO.svg'}
            alt={'logo'}
            width={160}
            height={100}
        />
        
        {isSignedIn?
        <UserButton/> : 
        <Link href={'/sign-in'}>
          <Button>Get Started</Button>
        </Link>}

    </div>
  )
}

export default Header