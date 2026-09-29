import { notFound } from "next/navigation";
import { getClienteById } from "@/lib/data/clientes";
import { formatDate } from "@/lib/format";
import { ClienteForm } from "../cliente-form";

export default async function ClientePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const clienteId = Number(id);
    if (!Number.isInteger(clienteId)) notFound();

    const cliente = await getClienteById(clienteId);
    if (!cliente) notFound();

    return (
        <div className="space-y-6">
            <div>
                <p className="text-xs text-ink-muted">Cliente</p>
                <h1 className="text-lg font-semibold text-ink">{cliente.name}</h1>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <ClienteForm cliente={cliente} />
                </div>

                <div className="rounded-lg border border-border bg-surface p-4">
                    <p className="text-xs font-medium text-ink-muted">Resumo</p>
                    <dl className="mt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <dt className="text-ink-muted">Cliente desde</dt>
                            <dd className="font-mono text-xs text-ink">{formatDate(cliente.createdAt)}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}