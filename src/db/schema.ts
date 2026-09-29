import {
    pgTable,
    serial,
    integer,
    varchar,
    text,
    numeric,
    timestamp,
    index,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clientes = pgTable(
    "clientes",
    {
        id: serial("id").primaryKey(),
        userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
        name: varchar("name", { length: 255 }).notNull(),
        email: varchar("email", { length: 255 }),
        phone: varchar("phone", { length: 30 }),
        company: varchar("company", { length: 255 }),
        document: varchar("document", { length: 20 }),
        segment: varchar("segment", { length: 100 }),
        addressStreet: varchar("address_street", { length: 255 }),
        addressNumber: varchar("address_number", { length: 20 }),
        addressComplement: varchar("address_complement", { length: 100 }),
        addressCity: varchar("address_city", { length: 100 }),
        addressState: varchar("address_state", { length: 2 }),
        addressZip: varchar("address_zip", { length: 10 }),
        notes: text("notes"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => [index("clientes_user_id_idx").on(table.userId)]
);

export const transportadoras = pgTable(
    "transportadoras",
    {
        id: serial("id").primaryKey(),
        userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
        name: varchar("name", { length: 255 }).notNull(),
        email: varchar("email", { length: 255 }),
        phone: varchar("phone", { length: 30 }),
        company: varchar("company", { length: 255 }),
        document: varchar("document", { length: 20 }),
        segment: varchar("segment", { length: 100 }),
        addressStreet: varchar("address_street", { length: 255 }),
        addressNumber: varchar("address_number", { length: 20 }),
        addressComplement: varchar("address_complement", { length: 100 }),
        addressCity: varchar("address_city", { length: 100 }),
        addressState: varchar("address_state", { length: 2 }),
        addressZip: varchar("address_zip", { length: 10 }),
        notes: text("notes"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => [index("transportadoras_user_id_idx").on(table.userId)]
);

export const produtos = pgTable(
    "produtos",
    {
        id: serial("id").primaryKey(),
        codigo: integer("codigo").notNull().unique(),
        nome: varchar("nome", { length: 255 }).notNull(),
        qtdEmbalagem: integer("qtd_embalagem").notNull().default(1),
        valorUnitario: numeric("valor_unitario", { precision: 12, scale: 2 }).notNull().default("0"),
        pesoKg: numeric("peso_kg", { precision: 10, scale: 3 }).notNull().default("0"),
        gtin: varchar("gtin", { length: 14 }),
        ncm: varchar("ncm", { length: 8 }),
        imagemUrl: varchar("imagem_url", { length: 500 }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => [index("produtos_nome_trgm_idx").using("gin", sql`${table.nome} gin_trgm_ops`)]
);

export const usersRelations = relations(users, ({ many }) => ({
    clientes: many(clientes),
    transportadoras: many(transportadoras),
}));

export const clientesRelations = relations(clientes, ({ one }) => ({
    user: one(users, { fields: [clientes.userId], references: [users.id] }),
}));

export const transportadorasRelations = relations(transportadoras, ({ one }) => ({
    user: one(users, { fields: [transportadoras.userId], references: [users.id] }),
}));