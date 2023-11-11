import { lucia } from 'lucia';
import { google } from '@lucia-auth/oauth/providers';
import { pg } from '@lucia-auth/adapter-postgresql';
import { h3 } from 'lucia/middleware';
import 'lucia/polyfill/node';


const runtimeConfig = useRuntimeConfig();
const { pool } = getDatabase();

export const auth = lucia({
    adapter: pg(pool, {
        user: 'auth_user',
        session: 'user_session',
        key: 'user_key',
    }),
    middleware: h3(),
    env: process.dev ? 'DEV' : 'PROD',
    getUserAttributes: (data) => {
        return {
            name: data.name,
            picture: data.picture,
            email: data.email,
        };
    },
});

export const googleAuth = google(auth, {
    clientId: runtimeConfig.googleClientId,
    clientSecret: runtimeConfig.googleClientSecret,
    redirectUri: runtimeConfig.googleRedirectUri,
    scope: ['https://www.googleapis.com/auth/userinfo.email'],
});

export type Auth = typeof auth;
