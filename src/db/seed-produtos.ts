import "dotenv/config";
import { sql } from "drizzle-orm";
import { db } from "./index";
import { produtos } from "./schema";

const dados = [
    {
        codigo: 538,
        nome: "BALDE REFORCADO N.12 COLOR",
        qtdEmbalagem: 12,
        valorUnitario: "6.45",
        pesoKg: "0.330",
        gtin: "7898939775389",
        ncm: "39249000",
    },
];

async function main() {
    await db
        .insert(produtos)
        .values(dados)
        .onConflictDoUpdate({
            target: produtos.codigo,
            set: {
                nome: sql`excluded.nome`,
                qtdEmbalagem: sql`excluded.qtd_embalagem`,
                valorUnitario: sql`excluded.valor_unitario`,
                pesoKg: sql`excluded.peso_kg`,
                gtin: sql`excluded.gtin`,
                ncm: sql`excluded.ncm`,
                updatedAt: new Date(),
            },
        });

    console.log(`${dados.length} produto(s) inserido(s) ou atualizado(s).`);
    process.exit(0);
}

main().catch((err) => {
    console.error("Erro ao inserir produtos:", err);
    process.exit(1);
});