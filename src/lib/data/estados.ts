import "server-only";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { estados } from "@/db/schema";
import { getCurrentUserId } from "@/lib/auth/dal";

export async function getEstados() {
    await getCurrentUserId();
    return db.select().from(estados).orderBy(asc(estados.nome));
}