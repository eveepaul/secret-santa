export default defineEventHandler(async (event) => {
    const authRequest = auth.handleRequest(event);
    const session = await authRequest.validate();
    return session?.user ?? null;
});
