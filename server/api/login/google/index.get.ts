export default defineEventHandler(async (event) => {
    const authRequest = auth.handleRequest(event);
    const session = await authRequest.validate();
    if (session) {
        return sendRedirect(event, '/');
    }
    const [url, state] = await googleAuth.getAuthorizationUrl();
    setCookie(event, 'google_oauth_state', state, {
        httpOnly: true,
        secure: !process.dev,
        path: '/',
        maxAge: 60 * 60,
    });
    return sendRedirect(event, url.toString());
});
