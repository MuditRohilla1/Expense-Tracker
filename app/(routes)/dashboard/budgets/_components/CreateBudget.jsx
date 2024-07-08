"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { db } from '@/utils/dbConfig'
import { DialogClose } from '@radix-ui/react-dialog'
    

function CreateBudget() {

    const [emojiIcon, setEmojiIcon] = useState('🤑');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [budgetName, setBudgetName] = useState();
    const [budgetAmount, setBudgetAmount] = useState();
    const {user} = useUser();

    // USED TO CREATE NEW BUDGET
    const onCreateBudget= async ()=>{
        const result = await db.insert(Budgets)
        .values({
            name: budgetName,
            amount: budgetAmount,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            icon: emojiIcon
        }).returning({insertedId:Budgets.id})

        if(result)
        {
            toast('NEW BUDGET CREATED!')
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                <div className='bg-slate-200 p-10 rounded-md justify-center items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
                    <h2 className='text-3xl'>+</h2>
                    <h2>Create New Budget</h2>
                </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Create New Budget</DialogTitle>
                    <DialogDescription>
                        <div className='mt-5'>
                            <Button variant="outline" size="lg" className='text-lg' onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                                {emojiIcon}
                            </Button>
                            <div className='absolute'>
                                <EmojiPicker 
                                open={openEmojiPicker}
                                onEmojiClick={(e) => {
                                    setEmojiIcon(e.emoji) 
                                    setOpenEmojiPicker(false)}}
                                />
                            </div>
                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'>Budget Name</h2>
                                <Input placeholder="e.g. Rental"
                                    onChange={(e)=>setBudgetName(e.target.value)}
                                />
                            </div>
                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                <Input 
                                    type="number"
                                    placeholder="e.g. 1000$"
                                    onChange={(e)=>setBudgetAmount(e.target.value)}
                                />
                            </div>
                        </div>                        
                    </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                        <Button 
                            disabled={!(budgetName&&budgetAmount)}
                            onClick={()=>onCreateBudget()}
                            className='mt-5 w-full'>Create Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>                               
        </div>
    )
}

export default CreateBudget