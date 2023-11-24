import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../../db/schema';

import postgres from 'pg';

export const getDatabase = () => {
    const runtimeConfig = useRuntimeConfig();

    const pool = new postgres.Pool({
        connectionString: runtimeConfig.pgConnectionString,
    });
    const db = drizzle(pool, { schema });

    return {
        db,
        pool
    };
};