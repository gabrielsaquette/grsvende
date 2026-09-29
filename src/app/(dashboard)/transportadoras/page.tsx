import Link from "next/link";
import { ArrowRight, Plus, Truck } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { DataTable } from "@/components/data-table";
import { DeleteIconButton } from "@/components/delete-icon-button";
import { LinkButton } from "@/components/link-button";
import { getTransportadoras } from "@/lib/data/transportadoras";
import { deleteTransportadora } from "./actions";

export default async function TransportadorasPage() {
    const transportadorasList = await getTransportadoras();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-ink">Transportadoras</h1>
                    <p className="text-sm text-ink-muted">{transportadorasList.length} cadastradas</p>
                </div>
                <LinkButton
                    href="/transportadoras/novo"
                    className="gap-2 bg-accent text-accent-foreground hover:bg-accent-hover"
                >
                    <Plus className="h-4 w-4 shrink-0" />
                    <span>Nova transportadora</span>
                </LinkButton>
            </div>

            {transportadorasList.length === 0 ? (
                <EmptyState
                    icon={Truck}
                    title="Nenhuma transportadora cadastrada"
                    description="Cadastre a primeira transportadora para usar nos pedidos."
                />
            ) : (
                <DataTable
                    rows={transportadorasList}
                    columns={[
                        {
                            header: "Nome",
                            cell: (t) => (
                                <Link href={`/transportadoras/${t.id}`} className="font-medium text-ink hover:text-accent">
                                    {t.name}
                                </Link>
                            ),
                        },
                        { header: "Empresa", cell: (t) => t.company ?? "—", className: "text-ink-muted" },
                        { header: "E-mail", cell: (t) => t.email ?? "—", className: "text-ink-muted" },
                        {
                            header: "Cidade/UF",
                            cell: (t) => (t.addressCity ? `${t.addressCity}${t.addressState ? "/" + t.addressState : ""}` : "—"),
                            className: "text-ink-muted",
                        },
                    ]}
                    actions={(t) => (
                        <>
                            <LinkButton
                                href={`/transportadoras/${t.id}`}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                aria-label="Abrir transportadora"
                            >
                                <ArrowRight className="h-4 w-4 text-ink-muted" />
                            </LinkButton>
                            <DeleteIconButton
                                action={deleteTransportadora.bind(null, t.id)}
                                title="Excluir transportadora"
                                description={`Tem certeza que deseja excluir "${t.name}"? Essa ação não pode ser desfeita.`}
                            />
                        </>
                    )}
                />
            )}
        </div>
    );
}