import {
    date, 
    uuid, 
    varchar, 
    integer, 
    pgTable, 
    text, 
    timestamp, 
    pgEnum 
} from 'drizzle-orm/pg-core';

export const STATUS_ENUM = pgEnum('status', [ 
    'PENDING', 
    'APPROVED', 
    'REJECTED'
]);
export const ROLE_ENUM = pgEnum('role', [
    'USER', 
    'ADMIN'
]);

export const users = pgTable('users', {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull().default('-'),
    companyName: varchar('company_name', { length: 255 }).notNull().default('Unknown'),
    status: STATUS_ENUM('status').notNull().default('PENDING'),
    role: ROLE_ENUM('role').notNull().default('USER'),
    lastActivityDate: date('last_activity_date').notNull().defaultNow(),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    image: varchar("image", { length: 500 }),
    username: varchar("username", { length: 100 }),
    passwordResetToken: text("password_reset_token"),
    passwordResetExpires: timestamp("password_reset_expires", { mode: 'date' }),
});