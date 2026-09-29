CREATE TYPE "public"."frete_status" AS ENUM('pendente', 'em_transito', 'entregue', 'cancelado');--> statement-breakpoint
CREATE TABLE "fretes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"cliente_id" integer NOT NULL,
	"carrier" varchar(255),
	"origin" varchar(255) NOT NULL,
	"destination" varchar(255) NOT NULL,
	"value" numeric(12, 2) DEFAULT '0' NOT NULL,
	"status" "frete_status" DEFAULT 'pendente' NOT NULL,
	"shipping_date" date,
	"expected_delivery_date" date,
	"tracking_code" varchar(100),
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "negocios" CASCADE;--> statement-breakpoint
ALTER TABLE "clientes" ADD COLUMN "document" varchar(20);--> statement-breakpoint
ALTER TABLE "clientes" ADD COLUMN "segment" varchar(100);--> statement-breakpoint
ALTER TABLE "clientes" ADD COLUMN "address_street" varchar(255);--> statement-breakpoint
ALTER TABLE "clientes" ADD COLUMN "address_number" varchar(20);--> statement-breakpoint
ALTER TABLE "clientes" ADD COLUMN "address_complement" varchar(100);--> statement-breakpoint
ALTER TABLE "clientes" ADD COLUMN "address_city" varchar(100);--> statement-breakpoint
ALTER TABLE "clientes" ADD COLUMN "address_state" varchar(2);--> statement-breakpoint
ALTER TABLE "clientes" ADD COLUMN "address_zip" varchar(10);--> statement-breakpoint
ALTER TABLE "fretes" ADD CONSTRAINT "fretes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fretes" ADD CONSTRAINT "fretes_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "fretes_user_id_idx" ON "fretes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "fretes_cliente_id_idx" ON "fretes" USING btree ("cliente_id");--> statement-breakpoint
CREATE INDEX "fretes_status_idx" ON "fretes" USING btree ("status");--> statement-breakpoint
DROP TYPE "public"."negocio_stage";