CREATE TYPE "public"."is_free" AS ENUM('FREE', 'PAID');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"image_url" text,
	"video_url" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"author" varchar(100) NOT NULL,
	"is_free" "is_free" DEFAULT 'FREE' NOT NULL,
	"author_image_url" text,
	"publish_date" timestamp with time zone,
	"github_url" text
);
