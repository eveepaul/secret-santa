import { member, pool, user, userPool } from "~/db/schema";


export type InsertPool = typeof pool.$inferInsert;
export type SelectPool = typeof pool.$inferSelect;

export type InsertMember = typeof member.$inferInsert;
export type SelectMember = typeof member.$inferSelect;

export type InserUserPool = typeof userPool.$inferInsert;
export type SelectUserPool = typeof userPool.$inferSelect;

export type SelectUser = typeof user.$inferSelect;