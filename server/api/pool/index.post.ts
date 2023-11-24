import { member, pool, userPool } from '~/db/schema';
import type { InsertPool } from '~/types/dbTypes';
import { generateRandomStr } from '~/utils/generateRandomStr';


export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { db } = getDatabase();

  const newPool: InsertPool = {
    code: generateRandomStr(5),
    description: '',
    owner: body.owner
  };
  const testId = await db.insert(pool).values(newPool).returning({ insertedId: pool.id });;

  return { newPool, testId };
});
