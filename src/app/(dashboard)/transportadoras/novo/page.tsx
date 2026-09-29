import { TransportadoraForm } from "../transportadora-form";

export default function NovaTransportadoraPage() {
    return (
        <div className="space-y-6">
            <div>
                <p className="text-xs text-ink-muted">Transportadora</p>
                <h1 className="text-lg font-semibold text-ink">Nova transportadora</h1>
            </div>
            <TransportadoraForm />
        </div>
    );
}