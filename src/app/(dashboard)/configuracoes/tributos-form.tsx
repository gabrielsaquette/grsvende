"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateTributos } from "./actions";

type Tributo = { codigo: string; nome: string; aliquota: string; escalaPelaCondicao: boolean };

export function TributosForm({ tributos }: { tributos: Tributo[] }) {
    const [state, formAction, pending] = useActionState(updateTributos, undefined);

    return (
        <form action={formAction} className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-border bg-surface">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border text-left text-xs text-ink-muted">
                            <th className="px-6 py-3 font-normal">Tributo</th>
                            <th className="px-6 py-3 font-normal">Alíquota (%)</th>
                            <th className="px-6 py-3 font-normal">Escala pela condição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tributos.map((t) => (
                            <tr key={t.codigo} className="border-b border-border last:border-0">
                                <td className="px-6 py-2.5 text-ink">{t.nome}</td>
                                <td className="px-6 py-2.5">
                                    <Label htmlFor={`aliquota_${t.codigo}`} className="sr-only">Alíquota {t.nome}</Label>
                                    <Input
                                        id={`aliquota_${t.codigo}`}
                                        name={`aliquota_${t.codigo}`}
                                        type="number"
                                        min={0}
                                        max={100}
                                        step="0.001"
                                        defaultValue={t.aliquota}
                                        className="w-28 font-mono"
                                    />
                                </td>
                                <td className="px-6 py-2.5">
                                    {t.codigo === "IPI" ? (
                                        <span className="text-xs text-ink-muted">aplicado à parte, sobre o preço final</span>
                                    ) : (
                                        <input type="checkbox" name={`escala_${t.codigo}`} defaultChecked={t.escalaPelaCondicao} className="h-4 w-4 accent-accent" />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-end gap-3">
                {state?.error && <span className="text-xs text-danger">{state.error}</span>}
                {state?.success && <span className="text-xs text-success">Tributos salvos.</span>}
                <Button type="submit" disabled={pending} className="bg-accent text-accent-foreground hover:bg-accent-hover">
                    {pending ? "Salvando..." : "Salvar tributos"}
                </Button>
            </div>
        </form>
    );
}