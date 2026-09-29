"use client";

import { LinkButton } from "@/components/link-button";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTransportadora, updateTransportadora } from "./actions";

type Transportadora = {
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

export function TransportadoraForm({ transportadora }: { transportadora?: Transportadora }) {
    const action = transportadora
        ? updateTransportadora.bind(null, transportadora.id)
        : createTransportadora;
    const [state, formAction, pending] = useActionState(action, undefined);

    return (
        <form action={formAction} className="space-y-6 rounded-lg border border-border bg-surface p-6">
            <div>
                <h2 className="text-sm font-medium text-ink">Dados gerais</h2>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" name="name" defaultValue={transportadora?.name} required />
                        {state?.fieldErrors?.name && <p className="text-xs text-danger">{state.fieldErrors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="company">Empresa</Label>
                        <Input id="company" name="company" defaultValue={transportadora?.company ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="document">CPF/CNPJ</Label>
                        <Input id="document" name="document" defaultValue={transportadora?.document ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="segment">Segmento</Label>
                        <Input id="segment" name="segment" defaultValue={transportadora?.segment ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" name="email" type="email" defaultValue={transportadora?.email ?? ""} />
                        {state?.fieldErrors?.email && <p className="text-xs text-danger">{state.fieldErrors.email}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" name="phone" defaultValue={transportadora?.phone ?? ""} />
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-sm font-medium text-ink">Endereço</h2>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5 sm:col-span-2">
                        <Label htmlFor="addressStreet">Rua</Label>
                        <Input id="addressStreet" name="addressStreet" defaultValue={transportadora?.addressStreet ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="addressNumber">Número</Label>
                        <Input id="addressNumber" name="addressNumber" defaultValue={transportadora?.addressNumber ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="addressComplement">Complemento</Label>
                        <Input id="addressComplement" name="addressComplement" defaultValue={transportadora?.addressComplement ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="addressCity">Cidade</Label>
                        <Input id="addressCity" name="addressCity" defaultValue={transportadora?.addressCity ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="addressState">UF</Label>
                        <Input id="addressState" name="addressState" maxLength={2} defaultValue={transportadora?.addressState ?? ""} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="addressZip">CEP</Label>
                        <Input id="addressZip" name="addressZip" defaultValue={transportadora?.addressZip ?? ""} />
                    </div>
                </div>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="notes">Notas</Label>
                <Textarea id="notes" name="notes" rows={4} defaultValue={transportadora?.notes ?? ""} />
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
                {state?.success && <span className="text-xs text-success">Alterações salvas.</span>}
                <div className="ml-auto flex gap-3">
                    <LinkButton
                        href={transportadora ? `/transportadoras/${transportadora.id}` : "/transportadoras"}
                        variant="outline"
                    >
                        Cancelar
                    </LinkButton>
                    <Button type="submit" disabled={pending} className="bg-accent text-accent-foreground hover:bg-accent-hover">
                        {pending ? "Salvando..." : transportadora ? "Salvar alterações" : "Cadastrar transportadora"}
                    </Button>
                </div>
            </div>
        </form>
    );
}