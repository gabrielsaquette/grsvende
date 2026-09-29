CREATE TYPE "public"."negocio_stage" AS ENUM('prospeccao', 'qualificacao', 'proposta', 'negociacao', 'ganho', 'perdido');--> statement-breakpoint
CREATE TABLE "clientes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(30),
	"company" varchar(255),
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "negocios" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"cliente_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"value" numeric(12, 2) DEFAULT '0' NOT NULL,
	"stage" "negocio_stage" DEFAULT 'prospeccao' NOT NULL,
	"expected_close_date" date,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "negocios" ADD CONSTRAINT "negocios_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "negocios" ADD CONSTRAINT "negocios_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "clientes_user_id_idx" ON "clientes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "negocios_user_id_idx" ON "negocios" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "negocios_cliente_id_idx" ON "negocios" USING btree ("cliente_id");--> statement-breakpoint
CREATE INDEX "negocios_stage_idx" ON "negocios" USING btree ("stage");