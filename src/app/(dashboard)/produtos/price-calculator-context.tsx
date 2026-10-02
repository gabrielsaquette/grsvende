"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { calcularCoeficiente, calcularPrecoProduto, type Tributo } from "@/lib/pricing";

type Estado = { uf: string; nome: string; mva: string };
type RegiaoFrete = { id: number; nome: string; valorM3: string };
type ProdutoPreco = { valorUnitario: string; cubagemM3: string; qtdEmbalagem: number };

export const ESCALA_OPTIONS = [70, 80, 90, 100] as const;
export const COMISSAO_OPTIONS = [1, 2, 3, 4, 5] as const;
const PRAZO_CAMPOS = 12;
const REGIAO_PARA_UF: Record<string, string> = {
    "Acre": "AC", "Alagoas": "AL", "Amapá": "AP", "Amazonas": "AM", "Bahia": "BA",
    "Ceará": "CE", "Distrito Federal": "DF", "Espírito Santo": "ES", "Goiás": "GO",
    "Maranhão": "MA", "Mato Grosso": "MT", "Mato Grosso do Sul": "MS", "Minas Gerais": "MG",
    "Pará": "PA", "Paraíba": "PB", "Paraná": "PR", "Pernambuco": "PE", "Piauí": "PI",
    "Rio de Janeiro": "RJ", "Rio Grande do Norte": "RN", "Rio Grande do Sul": "RS",
    "Rondônia": "RO", "Roraima": "RR", "Santa Catarina": "SC", "São Paulo": "SP",
    "Sergipe": "SE", "Tocantins": "TO", "Interior São Paulo": "SP", "Retira": "SP",
};

type PriceCalculatorState = {
    icms: number; setIcms: (v: number) => void;
    estadoUf: string;
    condicao: number; setCondicao: (v: number) => void;
    regiaoFreteId: number | null; setRegiaoFreteId: (v: number) => void;
    prazos: string[]; setPrazo: (index: number, v: string) => void;
    prazoMedio: number;
    comissao: number; setComissao: (v: number) => void;
    mc: number; setMc: (v: number) => void;
    estados: Estado[];
    regioesFrete: RegiaoFrete[];
    mvaAtual: number;
    coeficienteFinal: number;
    calcular: (produto: ProdutoPreco) => ReturnType<typeof calcularPrecoProduto>;
};

const PriceCalculatorContext = createContext<PriceCalculatorState | null>(null);

export function PriceCalculatorProvider({
    estados,
    regioesFrete,
    tributos,
    mcPadrao,
    multiplicadorMc,
    children,
}: {
    estados: Estado[];
    regioesFrete: RegiaoFrete[];
    tributos: Tributo[];
    mcPadrao: number;
    multiplicadorMc: number;
    children: ReactNode;
}) {
    const [icms, setIcms] = useState(12);
    const [condicao, setCondicao] = useState<number>(100);
    const [regiaoFreteId, setRegiaoFreteId] = useState<number | null>(regioesFrete[0]?.id ?? null);
    const [prazos, setPrazos] = useState<string[]>(Array(PRAZO_CAMPOS).fill(""));
    const [comissao, setComissao] = useState<number>(1);
    const [mc, setMc] = useState(mcPadrao);

    const setPrazo = (index: number, v: string) =>
        setPrazos((prev) => prev.map((p, i) => (i === index ? v : p)));

    const prazoMedio = useMemo(() => {
        const dias = prazos.map(Number).filter((d) => !Number.isNaN(d) && d > 0);
        return dias.length > 0 ? dias.reduce((s, v) => s + v, 0) / dias.length : 0;
    }, [prazos]);

    const regiaoSelecionada = useMemo(() => regioesFrete.find((r) => r.id === regiaoFreteId), [regioesFrete, regiaoFreteId]);
    const estadoUf = regiaoSelecionada ? REGIAO_PARA_UF[regiaoSelecionada.nome] ?? "" : "";
    const freteM3 = Number(regiaoSelecionada?.valorM3 ?? 0);
    const mvaAtual = useMemo(() => Number(estados.find((e) => e.uf === estadoUf)?.mva ?? 0), [estados, estadoUf]);

    const coeficienteFinal = useMemo(
        () =>
            calcularCoeficiente({
                icmsAliquota: icms,
                condicaoPercentual: condicao,
                prazoDias: [prazoMedio],
                comissaoPercentual: comissao,
                mcValor: mc,
                multiplicadorMc,
                tributos,
            }),
        [icms, condicao, prazoMedio, comissao, mc, multiplicadorMc, tributos]
    );

    const ipiAliquota = useMemo(() => tributos.find((t) => t.codigo === "IPI")?.aliquota ?? 0, [tributos]);

    const value = useMemo<PriceCalculatorState>(
        () => ({
            icms, setIcms,
            estadoUf,
            condicao, setCondicao,
            regiaoFreteId, setRegiaoFreteId,
            prazos, setPrazo,
            prazoMedio,
            comissao, setComissao,
            mc, setMc,
            estados,
            regioesFrete,
            mvaAtual,
            coeficienteFinal,
            calcular: (produto) =>
                calcularPrecoProduto({
                    custoBase: Number(produto.valorUnitario),
                    cubagemM3: Number(produto.cubagemM3),
                    pecasPorEmbalagem: produto.qtdEmbalagem,
                    freteReaisPorM3: freteM3,
                    condicaoPercentual: condicao,
                    mvaEstado: mvaAtual,
                    coeficienteFinal,
                    ipiAliquota,
                }),
        }),
        [icms, estadoUf, condicao, regiaoFreteId, prazos, prazoMedio, comissao, mc, estados, regioesFrete, mvaAtual, coeficienteFinal, freteM3, ipiAliquota]
    );

    return <PriceCalculatorContext.Provider value={value}>{children}</PriceCalculatorContext.Provider>;
}

export function usePriceCalculator() {
    const ctx = useContext(PriceCalculatorContext);
    if (!ctx) throw new Error("usePriceCalculator precisa estar dentro de PriceCalculatorProvider");
    return ctx;
}