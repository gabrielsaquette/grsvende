import { redirect } from "next/navigation";
import { Package } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";
import { getProdutos } from "@/lib/data/produtos";
import { formatCurrency, formatNcm, formatWeight } from "@/lib/format";
import { ProdutoThumb } from "./produto-thumb";
import { ProdutosSearch } from "./produtos-search";

const PAGE_SIZE = 25;

type SearchParams = Promise<{ page?: string | string[]; q?: string | string[] }>;

function first(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value;
}

function hrefFor(page: number, q: string) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `/produtos?${qs}` : "/produtos";
}

export default async function ProdutosPage({ searchParams }: { searchParams: SearchParams }) {
    const sp = await searchParams;
    const q = (first(sp.q) ?? "").trim().slice(0, 100);
    const page = Math.max(1, Number.parseInt(first(sp.page) ?? "1", 10) || 1);

    const { rows, total } = await getProdutos({ page, pageSize: PAGE_SIZE, q });
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    if (page > totalPages) redirect(hrefFor(totalPages, q));

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-ink">Produtos</h1>
                    <p className="text-sm text-ink-muted">
                        {q ? `${total} resultado(s) para "${q}"` : `${total} no catálogo`}
                    </p>
                </div>
                <ProdutosSearch initialQuery={q} />
            </div>

            {rows.length === 0 ? (
                <EmptyState
                    icon={Package}
                    title={q ? "Nenhum produto encontrado" : "Nenhum produto no catálogo"}
                    description={
                        q
                            ? "Tente buscar por outro nome, código ou GTIN."
                            : "Os produtos importados aparecerão aqui."
                    }
                />
            ) : (
                <>
                    <DataTable
                        rows={rows}
                        columns={[
                            {
                                header: "Imagem",
                                className: "w-20",
                                cell: (p) => <ProdutoThumb src={p.imagemUrl} alt={p.nome} />,
                            },
                            { header: "Código", cell: (p) => p.codigo, className: "font-mono text-ink" },
                            { header: "Nome Produto", cell: (p) => p.nome, className: "text-ink" },
                            {
                                header: "Qtde. na Embal.",
                                cell: (p) => p.qtdEmbalagem,
                                className: "text-right font-mono text-ink",
                            },
                            {
                                header: "Valor Unitário",
                                cell: (p) => formatCurrency(p.valorUnitario),
                                className: "text-right font-mono text-ink",
                            },
                            {
                                header: "Peso (Kg)",
                                cell: (p) => formatWeight(p.pesoKg),
                                className: "text-right font-mono text-ink",
                            },
                            { header: "GTIN", cell: (p) => p.gtin ?? "—", className: "font-mono text-xs text-ink-muted" },
                            {
                                header: "NCM",
                                cell: (p) => (p.ncm ? formatNcm(p.ncm) : "—"),
                                className: "font-mono text-xs text-ink-muted",
                            },
                        ]}
                    />

                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        total={total}
                        pageSize={PAGE_SIZE}
                        hrefFor={(p) => hrefFor(p, q)}
                    />
                </>
            )}
        </div>
    );
}