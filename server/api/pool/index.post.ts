import { member, pool, userPool } from '~/db/schema';
import type { InserUserPool, InsertMember, InsertPool } from '~/types/dbTypes';
import { generateRandomStr } from '~/utils/generateRandomStr';
import _ from 'lodash';

import { array, object, string } from 'yup';


export default defineEventHandler(async (event) => {

  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (!session) {
    setResponseStatus(event, 500);
    return {
      error: 'Invalid session'
    };
  }

  const { db } = getDatabase();

  const requestSchema = object({
    owner: string().required(),
    title: string().required(),
    description: string().required(),
    users: array()
      .of(
        object().shape({
          email: string().email(),
          name: string().required()
        })
      )
  });

  const body = await readBody(event);
  try {
    const data = await requestSchema.validate(body);

    const newPool: InsertPool = {
      code: generateRandomStr(5),
      description: data.description,
      title: data.title,
      owner: data.owner
    };
    const poolId = await db.insert(pool).values(newPool).returning({ insertedId: pool.id });

    _.forEach(data.users, async (user) => {
      user.email = user.email || '';
      const memberId = await db.insert(member).values(user as InsertMember).returning({ insertedId: member.id });
      const newUserPool: InserUserPool = {
        poolId: _.head(poolId)?.insertedId || 0,
        memberId: _.head(memberId)?.insertedId || 0
      };
      await db.insert(userPool).values(newUserPool);

    });

    setResponseStatus(event, 201);
    return { data };

  } catch (error) {
    return createError({
      statusCode: 400,
      statusMessage: 'Invalid input',
    });
  }


  // 

});
