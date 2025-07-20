ALTER TABLE "users" RENAME COLUMN "phone" TO "company_name";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_phone_unique";