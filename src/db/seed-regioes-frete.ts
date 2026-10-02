import "dotenv/config";
import { db } from "./index";
import { regioesFrete } from "./schema";

const REGIOES = [
    ["Acre", "361.00"], ["Alagoas", "488.00"], ["Amapá", "548.00"], ["Amazonas", "373.00"],
    ["Bahia", "583.00"], ["Ceará", "392.00"], ["Distrito Federal", "233.00"], ["Espírito Santo", "382.00"],
    ["Goiás", "227.00"], ["Maranhão", "482.00"], ["Mato Grosso", "450.00"], ["Mato Grosso do Sul", "551.00"],
    ["Minas Gerais", "456.00"], ["Pará", "588.00"], ["Paraíba", "371.00"], ["Paraná", "286.00"],
    ["Pernambuco", "318.00"], ["Piauí", "373.00"], ["Rio de Janeiro", "228.00"], ["Rio Grande do Norte", "403.00"],
    ["Rio Grande do Sul", "456.00"], ["Rondônia", "274.00"], ["Roraima", "274.00"], ["Santa Catarina", "180.00"],
    ["São Paulo", "67.00"], ["Sergipe", "662.50"], ["Tocantins", "350.00"], ["Interior São Paulo", "280.00"],
    ["Retira", "9.30"],
] as const;

async function main() {
    await db
        .insert(regioesFrete)
        .values(REGIOES.map(([nome, valorM3]) => ({ nome, valorM3 })))
        .onConflictDoNothing();
    console.log(`${REGIOES.length} regiões verificadas/inseridas.`);
    process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });