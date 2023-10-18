import { OAuthRequestError } from "@lucia-auth/oauth";

export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (session) {
    return sendRedirect(event, "/");
  }
  const storedState = getCookie(event, "github_oauth_state");
  const query = getQuery(event);
  const state = query.state?.toString();
  const code = query.code?.toString()
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return sendError(
      event,
      createError({
        statusCode: 500
      })
    );
  }

  try {
    const { googleUser, googleTokens, createUser, getExistingUser } = await githubAuth.validateCallback(code)

    const { name, picture } = googleUser;
    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          name,
          picture
        }
      });
      return user;
    };
    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    });


    authRequest.setSession(session);
    return sendRedirect(event, "/");


  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return sendError(
        event,
        createError({
          statusCode: 400
        })
      );
    }

    console.error(e);
    return sendError(
      event,
      createError({
        statusCode: 500
      })
    );
  }
  // try {
  //   const { getExistingUser, githubUser, createUser } =
  //     await githubAuth.validateCallback(code);

  //   const getUser = async () => {
  //     const existingUser = await getExistingUser();
  //     if (existingUser) return existingUser;
  //     const user = await createUser({
  //       attributes: {
  //         username: githubUser.login
  //       }
  //     });
  //     return user;
  //   };

  //   const user = await getUser();
  //   const session = await auth.createSession({
  //     userId: user.userId,
  //     attributes: {}
  //   });
  //   authRequest.setSession(session);
  //   return sendRedirect(event, "/");
  // } catch (e) {
  //   if (e instanceof OAuthRequestError) {
  //     // invalid code
  //     return sendError(
  //       event,
  //       createError({
  //         statusCode: 400
  //       })
  //     );
  //   }
  //   return sendError(
  //     event,
  //     createError({
  //       statusCode: 500
  //     })
  //   );
  // }
});