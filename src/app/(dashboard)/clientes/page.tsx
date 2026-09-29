import Link from "next/link";
import { ArrowRight, Plus, Users } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { DataTable } from "@/components/data-table";
import { DeleteIconButton } from "@/components/delete-icon-button";
import { LinkButton } from "@/components/link-button";
import { getClientes } from "@/lib/data/clientes";
import { deleteCliente } from "./actions";

export default async function ClientesPage() {
    const clientesList = await getClientes();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-ink">Clientes</h1>
                    <p className="text-sm text-ink-muted">{clientesList.length} cadastrados</p>
                </div>
                <LinkButton
                    href="/clientes/novo"
                    className="gap-2 bg-accent text-accent-foreground hover:bg-accent-hover"
                >
                    <Plus className="h-4 w-4 shrink-0" />
                    <span>Novo cliente</span>
                </LinkButton>
            </div>

            {clientesList.length === 0 ? (
                <EmptyState
                    icon={Users}
                    title="Nenhum cliente cadastrado"
                    description="Cadastre o primeiro cliente para começar a organizar sua carteira."
                />
            ) : (
                <DataTable
                    rows={clientesList}
                    columns={[
                        {
                            header: "Nome",
                            cell: (c) => (
                                <Link href={`/clientes/${c.id}`} className="font-medium text-ink hover:text-accent">
                                    {c.name}
                                </Link>
                            ),
                        },
                        { header: "Empresa", cell: (c) => c.company ?? "—", className: "text-ink-muted" },
                        { header: "E-mail", cell: (c) => c.email ?? "—", className: "text-ink-muted" },
                        {
                            header: "Cidade/UF",
                            cell: (c) => (c.addressCity ? `${c.addressCity}${c.addressState ? "/" + c.addressState : ""}` : "—"),
                            className: "text-ink-muted",
                        },
                    ]}
                    actions={(c) => (
                        <>
                            <LinkButton
                                href={`/clientes/${c.id}`}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                aria-label="Abrir cliente"
                            >
                                <ArrowRight className="h-4 w-4 text-ink-muted" />
                            </LinkButton>
                            <DeleteIconButton
                                action={deleteCliente.bind(null, c.id)}
                                title="Excluir cliente"
                                description={`Tem certeza que deseja excluir "${c.name}"? Essa ação não pode ser desfeita.`}
                            />
                        </>
                    )}
                />
            )}
        </div>
    );
}