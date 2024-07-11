'use client'
import React, { useEffect } from 'react'
import { PenBox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

function EditBudget({budgetInfo, refreshData}) {

    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [budgetName, setBudgetName] = useState('');
    const [budgetAmount, setBudgetAmount] = useState('');
    const { user } = useUser();

    useEffect(()=>{
        if(budgetInfo)
        {
            setEmojiIcon(budgetInfo?.icon)
            setBudgetName(budgetInfo?.name)
            setBudgetAmount(budgetInfo?.amount)
        }        
    },[budgetInfo])

    const onUpdateBudget = async () => {
        let result = null;
    
        try {
            result = await db.update(Budgets)
                .set({
                    name: budgetName,
                    amount: budgetAmount,
                    icon: emojiIcon,
                })
                .where(eq(Budgets.id, budgetInfo.id))
                .returning();
            
            console.log(result);
        } catch (error) {
            console.error("Error updating budget:", error);
        }
    
        if (result) {
            refreshData();
            toast('Budget Updated!');
        }
    };
    
    return (
        <div>      
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex gap-2"><PenBox />edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Current Budget</DialogTitle>
                        <DialogDescription>
                            <div className='mt-5'>
                                <Button variant="outline" size="lg" className='text-lg' onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                                    {emojiIcon}
                                </Button>
                                {openEmojiPicker && (
                                    <div className='absolute z-3'>
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setEmojiIcon(e.emoji);
                                                setOpenEmojiPicker(false);
                                            }}
                                        />
                                    </div>
                                )}
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Name</h2>
                                    <Input
                                        placeholder="e.g. Rental"
                                        defaultValue={budgetInfo?.name}
                                        onChange={(e) => setBudgetName(e.target.value)}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 1000$"
                                        defaultValue={budgetInfo?.amount}
                                        onChange={(e) => setBudgetAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                disabled={!(budgetName && budgetAmount)}
                                onClick={onUpdateBudget}
                                className='mt-5 w-full'>

                                Update Budget

                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget