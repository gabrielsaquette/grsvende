import "server-only";
import { asc, count, eq, ilike, like, or } from "drizzle-orm";
import { db } from "@/db";
import { produtos } from "@/db/schema";
import { getCurrentUserId } from "@/lib/auth/dal";

function escapeLike(value: string) {
    return value.replace(/[\\%_]/g, "\\$&");
}

export async function getProdutos({
    page,
    pageSize,
    q,
}: {
    page: number;
    pageSize: number;
    q: string;
}) {
    await getCurrentUserId(); // catálogo compartilhado: exige apenas sessão válida

    const term = q.trim().slice(0, 100);
    const isDigits = /^\d+$/.test(term);

    const where = term
        ? or(
            ilike(produtos.nome, `%${escapeLike(term)}%`),
            // limite de 9 dígitos evita estourar o tipo integer do Postgres
            isDigits && term.length <= 9 ? eq(produtos.codigo, Number(term)) : undefined,
            isDigits ? like(produtos.gtin, `${term}%`) : undefined
        )
        : undefined;

    const [rows, [{ total }]] = await Promise.all([
        db
            .select({
                id: produtos.id,
                codigo: produtos.codigo,
                nome: produtos.nome,
                qtdEmbalagem: produtos.qtdEmbalagem,
                cubagemM3: produtos.cubagemM3,
                valorUnitario: produtos.valorUnitario,
                pesoKg: produtos.pesoKg,
                gtin: produtos.gtin,
                ncm: produtos.ncm,
                imagemUrl: produtos.imagemUrl,
            })
            .from(produtos)
            .where(where)
            .orderBy(asc(produtos.codigo))
            .limit(pageSize)
            .offset((page - 1) * pageSize),
        db.select({ total: count() }).from(produtos).where(where),
    ]);

    return { rows, total };
}