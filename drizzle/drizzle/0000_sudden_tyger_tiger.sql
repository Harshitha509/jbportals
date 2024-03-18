CREATE TABLE IF NOT EXISTS "student" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fullName" text NOT NULL,
	"branch" text NOT NULL,
	"registerNo" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "student_fullName_unique" UNIQUE("fullName"),
	CONSTRAINT "student_registerNo_unique" UNIQUE("registerNo")
);
