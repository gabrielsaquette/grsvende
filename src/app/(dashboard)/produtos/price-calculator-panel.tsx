"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePriceCalculator, ESCALA_OPTIONS, COMISSAO_OPTIONS } from "./price-calculator-context";

const ICMS_OPTIONS = [7, 12, 18];

export function PriceCalculatorPanel() {
    const {
        icms, setIcms,
        estadoUf,
        condicao, setCondicao,
        regiaoFreteId, setRegiaoFreteId,
        prazos, setPrazo, prazoMedio,
        comissao, setComissao,
        mc, setMc,
        regioesFrete, mvaAtual, coeficienteFinal,
    } = usePriceCalculator();

    const configuracaoInvalida = coeficienteFinal <= 0;

    return (
        <div className="space-y-4 rounded-lg border border-border bg-surface p-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
                <div className="space-y-1.5">
                    <Label htmlFor="icms">ICMS</Label>
                    <Select value={String(icms)} onValueChange={(v) => setIcms(Number(v))}>
                        <SelectTrigger id="icms" className="min-w-[160px] max-w-[180px]"><SelectValue /></SelectTrigger>
                        <SelectContent className="w-[300px] bg-white text-black border shadow-md dark:bg-neutral-900 dark:text-neutral-100">{ICMS_OPTIONS.map((v) => <SelectItem key={v} value={String(v)}>{v}%</SelectItem>)}</SelectContent>
                    </Select>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="frete">Frete</Label>
                    <Select
                        value={regiaoFreteId != null ? String(regiaoFreteId) : ""}
                        onValueChange={(v) => setRegiaoFreteId(Number(v))}
                    >
                        <SelectTrigger id="frete" className="min-w-[160px] max-w-[180px]"><SelectValue placeholder="Região" /></SelectTrigger>
                        <SelectContent className="w-[300px] bg-white text-black border shadow-md dark:bg-neutral-900 dark:text-neutral-100">
                            {regioesFrete.map((r) => (
                                <SelectItem key={r.id} value={String(r.id)}>{r.nome} — R$ {Number(r.valorM3).toFixed(2)}/m³</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="condicao">Condição (% nota)</Label>
                    <Select value={String(condicao)} onValueChange={(v) => setCondicao(Number(v))}>
                        <SelectTrigger id="condicao" className="min-w-[160px] max-w-[180px]"><SelectValue /></SelectTrigger>
                        <SelectContent className="w-[300px] bg-white text-black border shadow-md dark:bg-neutral-900 dark:text-neutral-100">{ESCALA_OPTIONS.map((v) => <SelectItem key={v} value={String(v)}>{v}%</SelectItem>)}</SelectContent>
                    </Select>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="comissao">Comissão</Label>
                    <Select value={String(comissao)} onValueChange={(v) => setComissao(Number(v))}>
                        <SelectTrigger id="comissao" className="min-w-[160px] max-w-[180px]"><SelectValue /></SelectTrigger>
                        <SelectContent className="w-[300px] bg-white text-black border shadow-md dark:bg-neutral-900 dark:text-neutral-100">{COMISSAO_OPTIONS.map((v) => <SelectItem key={v} value={String(v)}>{v}%</SelectItem>)}</SelectContent>
                    </Select>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="mc">MC</Label>
                    <Input id="mc" type="number" step="0.01" value={mc} onChange={(e) => setMc(Number(e.target.value) || 0)} />
                </div>
            </div>

            <div className="space-y-1.5">
                <Label>Prazo (dias) — média: <span className="font-mono text-ink">{prazoMedio.toFixed(1)}</span></Label>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
                    {prazos.map((p, i) => (
                        <Input
                            key={i}
                            type="number"
                            min={0}
                            value={p}
                            onChange={(e) => setPrazo(i, e.target.value)}
                            placeholder="—"
                            className="text-center font-mono"
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-xs">
                <span className="text-ink-muted">Estado: {estadoUf || "—"} · MVA {mvaAtual.toFixed(2)}%</span>
                {configuracaoInvalida ? (
                    <span className="font-medium text-danger">Custos somam mais que 100% do preço — ajuste tributos, comissão ou MC.</span>
                ) : (
                    <span className="font-mono text-ink-muted">coeficiente {coeficienteFinal.toFixed(4)}</span>
                )}
            </div>
        </div>
    );
}