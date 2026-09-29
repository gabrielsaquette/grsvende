import "server-only";
import { desc, eq, and } from "drizzle-orm";
import { db } from "@/db";
import { transportadoras } from "@/db/schema";
import { getCurrentUserId } from "@/lib/auth/dal";

export async function getTransportadoras() {
    const userId = await getCurrentUserId();
    return db.query.transportadoras.findMany({
        where: eq(transportadoras.userId, userId),
        orderBy: [desc(transportadoras.createdAt)],
    });
}

export async function getTransportadoraById(id: number) {
    const userId = await getCurrentUserId();
    const transportadora = await db.query.transportadoras.findFirst({
        where: and(eq(transportadoras.id, id), eq(transportadoras.userId, userId)),
    });
    return transportadora ?? null;
}