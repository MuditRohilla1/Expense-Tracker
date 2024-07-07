/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://expense-tracker_owner:68ucDoJHhgAf@ep-icy-grass-a5id60v9.us-east-2.aws.neon.tech/expense-tracker?sslmode=require',
        }
    };