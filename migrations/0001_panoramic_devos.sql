ALTER TABLE "steps" ALTER COLUMN "order" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "steps" ADD COLUMN "file-path" text;