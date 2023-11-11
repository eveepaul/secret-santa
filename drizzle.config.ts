import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
    schema: "./db/*",
    out: "./drizzle",
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.NUXT_PG_CONNECTION_STRING || '',
    }
} satisfies Config;