import { db } from './tests/db/connection';
import * as dotenv from 'dotenv';
dotenv.config();

async function run() {
    try {
        const result = await db.query(`SELECT DISTINCT ten_cap_don_vi FROM public.don_vi LIMIT 20`);
        console.log("ten_cap_don_vi values:");
        console.dir(result.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await db.end();
    }
}
run();
