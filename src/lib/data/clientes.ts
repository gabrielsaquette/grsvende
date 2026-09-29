import "server-only";
import { desc, eq, and } from "drizzle-orm";
import { db } from "@/db";
import { clientes } from "@/db/schema";
import { getCurrentUserId } from "@/lib/auth/dal";

export async function getClientes() {
    const userId = await getCurrentUserId();
    return db.query.clientes.findMany({
        where: eq(clientes.userId, userId),
        orderBy: [desc(clientes.createdAt)],
    });
}

export async function getClienteById(id: number) {
    const userId = await getCurrentUserId();
    const cliente = await db.query.clientes.findFirst({
        where: and(eq(clientes.id, id), eq(clientes.userId, userId)),
    });
    return cliente ?? null;
}