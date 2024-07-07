import {pgTable} from "drizzle-orm/pg-core";

export const Budgets = pgTable('budgets', {
    id:serial('id').primayKey(),
    name:varchar('name').notnull(),
    amount:varchar('amount').notnull(),
    icon:varchar('icon'),
    createdBy:varchar('createdBy').notnull()
})