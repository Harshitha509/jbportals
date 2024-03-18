ALTER TABLE "student" DROP CONSTRAINT "student_registerNo_unique";--> statement-breakpoint
ALTER TABLE "student" ADD COLUMN "studentId" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "student" DROP COLUMN IF EXISTS "registerNo";--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_studentId_unique" UNIQUE("studentId");