import React from 'react'
import BudgetList from './_components/BudgetList'

function Budget() {
    return (
        <div className='p-10 bg-gradient-to-r from-teal-200 to-teal-500 rounded-xl'>
            <h2 className='font-bold text-3xl'>My Budgets</h2>
            <BudgetList/>
        </div>
    )
}

export default Budget