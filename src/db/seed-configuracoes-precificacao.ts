import "dotenv/config";
import { eq } from "drizzle-orm";
import { db } from "./index";
import { configuracoesPrecificacao } from "./schema";

async function main() {
    const [existing] = await db
        .select({ id: configuracoesPrecificacao.id })
        .from(configuracoesPrecificacao)
        .where(eq(configuracoesPrecificacao.id, 1))
        .limit(1);

    if (!existing) {
        await db.insert(configuracoesPrecificacao).values({ id: 1, mcPadrao: "2.50", multiplicadorMc: "4.80" });
        console.log("Configuração de precificação criada.");
    } else {
        console.log("Configuração de precificação já existia.");
    }
    process.exit(0);
}

main().catch((err) => {
    console.error("Erro ao criar configuração:", err);
    process.exit(1);
});