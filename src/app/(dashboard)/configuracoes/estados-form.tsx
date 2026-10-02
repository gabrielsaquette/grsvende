"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateEstados } from "./actions";

type Estado = { uf: string; nome: string; mva: string };

export function EstadosForm({ estados }: { estados: Estado[] }) {
    const [state, formAction, pending] = useActionState(updateEstados, undefined);

    return (
        <form action={formAction} className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-border bg-surface">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border text-left text-xs text-ink-muted">
                            <th className="px-6 py-3 font-normal">UF</th>
                            <th className="px-6 py-3 font-normal">Estado</th>
                            <th className="px-6 py-3 font-normal">MVA / ICMS-ST (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estados.map((e) => (
                            <tr key={e.uf} className="border-b border-border last:border-0">
                                <td className="px-6 py-2.5 font-mono text-ink">{e.uf}</td>
                                <td className="px-6 py-2.5 text-ink">{e.nome}</td>
                                <td className="px-6 py-2.5">
                                    <Label htmlFor={`mva_${e.uf}`} className="sr-only">MVA {e.nome}</Label>
                                    <Input id={`mva_${e.uf}`} name={`mva_${e.uf}`} type="number" min={0} step="0.01" defaultValue={e.mva} className="w-28 font-mono" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-end gap-3">
                {state?.error && <span className="text-xs text-danger">{state.error}</span>}
                {state?.success && <span className="text-xs text-success">Estados salvos.</span>}
                <Button type="submit" disabled={pending} className="bg-accent text-accent-foreground hover:bg-accent-hover">
                    {pending ? "Salvando..." : "Salvar estados"}
                </Button>
            </div>
        </form>
    );
}