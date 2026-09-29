CREATE TABLE "produtos" (
	"id" serial PRIMARY KEY NOT NULL,
	"codigo" integer NOT NULL,
	"nome" varchar(255) NOT NULL,
	"qtd_embalagem" integer DEFAULT 1 NOT NULL,
	"valor_unitario" numeric(12, 2) DEFAULT '0' NOT NULL,
	"peso_kg" numeric(10, 3) DEFAULT '0' NOT NULL,
	"gtin" varchar(14),
	"ncm" varchar(8),
	"imagem_url" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "produtos_codigo_unique" UNIQUE("codigo")
);
--> statement-breakpoint
CREATE INDEX "produtos_nome_trgm_idx" ON "produtos" USING gin ("nome" gin_trgm_ops);