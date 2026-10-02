import "server-only";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { regioesFrete } from "@/db/schema";
import { getCurrentUserId } from "@/lib/auth/dal";

export async function getRegioesFrete() {
    await getCurrentUserId();
    return db.select().from(regioesFrete).orderBy(asc(regioesFrete.nome));
}