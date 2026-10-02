"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateConfiguracoesPrecificacao } from "./actions";

export function MargemForm({ mcPadrao, multiplicadorMc }: { mcPadrao: string; multiplicadorMc: string }) {
    const [state, formAction, pending] = useActionState(updateConfiguracoesPrecificacao, undefined);

    return (
        <form action={formAction} className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4 sm:flex-row sm:items-end">
            <div className="space-y-1.5">
                <Label htmlFor="mcPadrao">MC padrão</Label>
                <Input id="mcPadrao" name="mcPadrao" type="number" step="0.01" min={0} defaultValue={mcPadrao} className="w-28 font-mono" />
            </div>
            <div className="space-y-1.5">
                <Label htmlFor="multiplicadorMc">Multiplicador de MC</Label>
                <Input id="multiplicadorMc" name="multiplicadorMc" type="number" step="0.01" min={0} defaultValue={multiplicadorMc} className="w-28 font-mono" />
            </div>
            <div className="flex items-center gap-3 sm:ml-auto">
                {state?.error && <span className="text-xs text-danger">{state.error}</span>}
                {state?.success && <span className="text-xs text-success">Salvo.</span>}
                <Button type="submit" disabled={pending} className="bg-accent text-accent-foreground hover:bg-accent-hover">
                    {pending ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    );
}