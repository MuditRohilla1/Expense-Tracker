import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://expense-tracker_owner:68ucDoJHhgAf@ep-icy-grass-a5id60v9.us-east-2.aws.neon.tech/expense-tracker?sslmode=require');
const db = drizzle(sql,{schema});