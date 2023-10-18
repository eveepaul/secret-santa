import { lucia } from "lucia";
import { google } from "@lucia-auth/oauth/providers";
import { pg } from "@lucia-auth/adapter-postgresql";
import { h3 } from "lucia/middleware";
import "lucia/polyfill/node";

import { drizzle } from "drizzle-orm/node-postgres";

import postgres from "pg";

const runtimeConfig = useRuntimeConfig();

const pool = new postgres.Pool({
  connectionString: runtimeConfig.pgConnectionString
});

export const db = drizzle(pool);


export const auth = lucia({
  adapter: pg(pool, {
    user: "auth_user",
    session: "user_session",
    key: "user_key"
  }),
  middleware: h3(),
  env: process.dev ? "DEV" : "PROD",
  getUserAttributes: (data) => {
    return {
      name: data
    };
  }
});




export const githubAuth = google(auth, {
  clientId: runtimeConfig.googleClientId,
  clientSecret: runtimeConfig.googleClientSecret,
  redirectUri: runtimeConfig.googleRedirectUri
});


export type Auth = typeof auth;