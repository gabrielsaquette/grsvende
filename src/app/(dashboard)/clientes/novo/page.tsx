import { ClienteForm } from "../cliente-form";

export default function NovoClientePage() {
    return (
        <div className="space-y-6">
            <div>
                <p className="text-xs text-ink-muted">Cliente</p>
                <h1 className="text-lg font-semibold text-ink">Novo cliente</h1>
            </div>
            <ClienteForm />
        </div>
    );
}