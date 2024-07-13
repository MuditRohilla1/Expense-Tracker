import React from 'react'
import Image from 'next/image'

function UpgradePage() {
    return (
        <div className='w-full h-[100vh] flex flex-col gap-7 bg-orange-200 justify-center items-center'>
        <div className='flex gap-5 justify-center flex-col items-center p-5'>
            <h1 className='font-bold text-3xl font-mono'>Upgrade Page</h1>
            <p className='font-bold text-2xl font-mono'>This Page is Under-Development</p>
        </div>
        <div>
            <Image
            src='/settings.png'
            width={200}
            height={200}
            alt='Settings Icon'
            className='animate-spinSlow'
            />
        </div>
        </div>
    )
}

export default UpgradePage
