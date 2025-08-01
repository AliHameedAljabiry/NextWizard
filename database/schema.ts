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



// Categories Table
export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(), // e.g., "Authentication", "Setup"
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  slug: varchar("slug", {length: 100}).notNull().unique()
});

// Parts Table
export const parts = pgTable('parts', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(), // e.g., "Google Auth", "Credentials"
  slug: varchar('slug', { length: 100 }).notNull().unique(), // for clean URLs
  categoryId: uuid('category_id').references(() => categories.id).notNull(),
  order: integer('order').default(0), // for manual sorting
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Steps Table
export const steps = pgTable('steps', {
  id: uuid('id').defaultRandom().primaryKey(),
  partId: uuid('part_id').references(() => parts.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  filePath: text('file-path'),
  code: text('code'), // code block for the step
  resources: text('resources'), // optional: JSON string of resource links
  order: integer('order').default(0).notNull(), // step order within part
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

