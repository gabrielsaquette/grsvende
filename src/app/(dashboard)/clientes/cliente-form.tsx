"use client";

import { LinkButton } from "@/components/link-button";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCliente, updateCliente } from "./actions";

type Cliente = {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
    document: string | null;
    segment: string | null;
    addressStreet: string | null;
    addressNumber: string | null;
    addressComplement: string | null;
    addressCity: string | null;
    addressState: string | null;
    addressZip: string | null;
    notes: string | null;
};

export function ClienteForm({ cliente }: { cliente?: Cliente }) {
    const action = cliente ? updateCliente.bind(null, cliente.id) : createCliente;
    const [state, formAction, pending] = useActionState(action, undefined);

    return (
        <form action={formAction} className="space-y-6 rounded-lg border border-border bg-surface p-6">
            <div>
                <h2 className="text-sm font-medium text-ink">Dados gerais</h2>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" name="name" defaultValue={cliente?.name} required />
                        {state?.fieldErrors?.name && <p className="text-xs text-danger">{state.fieldErrors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="company">Empresa</Label>
                        <Input id="company" name="company" defaultValue={cliente?.company ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="document">CPF/CNPJ</Label>
                        <Input id="document" name="document" defaultValue={cliente?.document ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="segment">Segmento</Label>
                        <Input id="segment" name="segment" defaultValue={cliente?.segment ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" name="email" type="email" defaultValue={cliente?.email ?? ""} />
                        {state?.fieldErrors?.email && <p className="text-xs text-danger">{state.fieldErrors.email}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" name="phone" defaultValue={cliente?.phone ?? ""} />
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-sm font-medium text-ink">Endereço</h2>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5 sm:col-span-2">
                        <Label htmlFor="addressStreet">Rua</Label>
                        <Input id="addressStreet" name="addressStreet" defaultValue={cliente?.addressStreet ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="addressNumber">Número</Label>
                        <Input id="addressNumber" name="addressNumber" defaultValue={cliente?.addressNumber ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="addressComplement">Complemento</Label>
                        <Input id="addressComplement" name="addressComplement" defaultValue={cliente?.addressComplement ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="addressCity">Cidade</Label>
                        <Input id="addressCity" name="addressCity" defaultValue={cliente?.addressCity ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="addressState">UF</Label>
                        <Input id="addressState" name="addressState" maxLength={2} defaultValue={cliente?.addressState ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="addressZip">CEP</Label>
                        <Input id="addressZip" name="addressZip" defaultValue={cliente?.addressZip ?? ""} />
                    </div>
                </div>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="notes">Notas</Label>
                <Textarea id="notes" name="notes" rows={4} defaultValue={cliente?.notes ?? ""} />
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
                {state?.success && <span className="text-xs text-success">Alterações salvas.</span>}
                <div className="ml-auto flex gap-3">
                    <LinkButton href={cliente ? `/clientes/${cliente.id}` : "/clientes"} variant="outline">
                        Cancelar
                    </LinkButton>
                    <Button type="submit" disabled={pending} className="bg-accent text-accent-foreground hover:bg-accent-hover">
                        {pending ? "Salvando..." : cliente ? "Salvar alterações" : "Cadastrar cliente"}
                    </Button>
                </div>
            </div>
        </form>
    );
}