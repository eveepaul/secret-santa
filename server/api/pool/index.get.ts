import { eq } from 'drizzle-orm';
import { user } from '~/db/schema';
export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (!session) {
    setResponseStatus(event, 500);
    return {
      error: 'Invalid session'
    };
  }

  const query = getQuery(event);

  const { db } = getDatabase();

  const results = await db.query.user.findFirst({
    where: eq(user.id, session.user.userId),
    with: {
      pools: {
        with: {
          members: {
            columns: {
              poolId: false,
              id: false,
              memberId: false
            },
            with: {
              member: {
                columns: {
                  santa: false
                }
              }
            }
          }
        }
      },
    }
  });

  return results;
});
