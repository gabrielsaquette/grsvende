CREATE TABLE "transportadoras" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(30),
	"company" varchar(255),
	"document" varchar(20),
	"segment" varchar(100),
	"address_street" varchar(255),
	"address_number" varchar(20),
	"address_complement" varchar(100),
	"address_city" varchar(100),
	"address_state" varchar(2),
	"address_zip" varchar(10),
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "fretes" CASCADE;--> statement-breakpoint
ALTER TABLE "transportadoras" ADD CONSTRAINT "transportadoras_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "transportadoras_user_id_idx" ON "transportadoras" USING btree ("user_id");--> statement-breakpoint
DROP TYPE "public"."frete_status";