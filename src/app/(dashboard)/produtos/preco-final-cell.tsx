"use client";

import { usePriceCalculator } from "./price-calculator-context";
import { formatCurrency } from "@/lib/format";

type ProdutoPreco = { valorUnitario: string; cubagemM3: string; qtdEmbalagem: number };

export function PrecoFinalCell({ produto }: { produto: ProdutoPreco }) {
    const { calcular } = usePriceCalculator();
    const resultado = calcular(produto);

    return (
        <div className="text-right">
            <div className="font-mono text-ink">{formatCurrency(resultado.precoFinal)}</div>
            <div className="font-mono text-[11px] text-ink-muted">c/ IPI+ST {formatCurrency(resultado.precoComImpostos)}</div>
        </div>
    );
}