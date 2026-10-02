import "dotenv/config";
import { db } from "./index";
import { tributos } from "./schema";

const TRIBUTOS = [
    { codigo: "COFINS", nome: "COFINS", escalaPelaCondicao: true },
    { codigo: "PIS", nome: "PIS", escalaPelaCondicao: true },
    { codigo: "PDD", nome: "PDD (Provisão Devedores Duvidosos)", escalaPelaCondicao: false },
    { codigo: "CS", nome: "CS (Contribuição Social)", escalaPelaCondicao: true },
    { codigo: "IRPJ", nome: "IRPJ", escalaPelaCondicao: true },
    { codigo: "OUTROS", nome: "Outros", escalaPelaCondicao: false },
    { codigo: "IPI", nome: "IPI", escalaPelaCondicao: true },
];

async function main() {
    await db.insert(tributos).values(TRIBUTOS.map((t) => ({ ...t, aliquota: "0" }))).onConflictDoNothing();
    console.log(`${TRIBUTOS.length} tributos verificados/inseridos.`);
    process.exit(0);
}

main().catch((err) => {
    console.error("Erro ao inserir tributos:", err);
    process.exit(1);
});