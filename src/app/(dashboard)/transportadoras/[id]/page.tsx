import { notFound } from "next/navigation";
import { getTransportadoraById } from "@/lib/data/transportadoras";
import { TransportadoraForm } from "../transportadora-form";

export default async function TransportadoraPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const transportadoraId = Number(id);
    if (!Number.isInteger(transportadoraId)) notFound();

    const transportadora = await getTransportadoraById(transportadoraId);
    if (!transportadora) notFound();

    return (
        <div className="space-y-6">
            <div>
                <p className="text-xs text-ink-muted">Transportadora</p>
                <h1 className="text-lg font-semibold text-ink">{transportadora.name}</h1>
            </div>
            <TransportadoraForm transportadora={transportadora} />
        </div>
    );
}