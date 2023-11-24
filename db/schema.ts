import { pgTable, bigint, varchar, text, serial, integer } from 'drizzle-orm/pg-core';

export const user = pgTable('auth_user', {
    id: varchar('id', {
        length: 15, // change this when using custom user ids
    }).primaryKey(),
    name: varchar('name', {
        length: 36,
    }),
    picture: text('picture'),
    email: varchar('email', {
        length: 36,
    }),
    // other user attributes
});

export const session = pgTable('user_session', {
    id: varchar('id', {
        length: 128,
    }).primaryKey(),
    userId: varchar('user_id', {
        length: 15,
    })
        .notNull()
        .references(() => user.id),
    activeExpires: bigint('active_expires', {
        mode: 'number',
    }).notNull(),
    idleExpires: bigint('idle_expires', {
        mode: 'number',
    }).notNull(),
});

export const key = pgTable('user_key', {
    id: varchar('id', {
        length: 255,
    }).primaryKey(),
    userId: varchar('user_id', {
        length: 15,
    })
        .notNull()
        .references(() => user.id),
    hashedPassword: varchar('hashed_password', {
        length: 255,
    }),
});

export const pool = pgTable('pool', {
    id: serial('id').primaryKey(),
    code: varchar('code', {
        length: 10,
    }).notNull(),
    owner: varchar('owner', {
        length: 15
    }).notNull().references(() => user.id),
    description: text('description').default('')
});

export const member = pgTable('member', {
    id: serial('id').primaryKey(),
    name: varchar('name', {
        length: 32
    }).notNull(),
    santa: varchar('santa', {
        length: 15
    }).default(''),
    blacklist: varchar('blacklist', {
        length: 15
    }).default('')
});

export const userPool = pgTable('user_pool', {
    id: serial('id').primaryKey(),
    memberId: integer('member_id').notNull().references(() => member.id),
    poolId: integer('pool_id').notNull().references(() => pool.id)
});