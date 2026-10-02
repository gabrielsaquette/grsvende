import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { configuracoesPrecificacao } from "@/db/schema";
import { getCurrentUserId } from "@/lib/auth/dal";

export async function getConfiguracoesPrecificacao() {
    await getCurrentUserId();
    const [config] = await db
        .select()
        .from(configuracoesPrecificacao)
        .where(eq(configuracoesPrecificacao.id, 1))
        .limit(1);
    return config ?? { id: 1, mcPadrao: "2.50", multiplicadorMc: "4.80" };
}