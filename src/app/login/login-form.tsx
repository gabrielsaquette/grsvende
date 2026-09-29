"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./actions";

export function LoginForm() {
    const [state, formAction, pending] = useActionState(login, undefined);

    return (
        <form action={formAction} className="w-full max-w-sm space-y-5">
            <div className="space-y-1.5">
                <h1 className="text-xl font-semibold text-ink">Entrar</h1>
                <p className="text-sm text-ink-muted">Acesse sua conta para continuar.</p>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" placeholder="voce@empresa.com" required />
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" name="senha" type="password" placeholder="••••••••" required />
            </div>

            {state?.error && <p className="text-sm text-danger">{state.error}</p>}

            <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent-hover">
                {pending ? "Entrando..." : "Entrar"}
            </Button>
        </form>
    );
}