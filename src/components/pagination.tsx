import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/link-button";

export function Pagination({
    page,
    totalPages,
    total,
    pageSize,
    hrefFor,
}: {
    page: number;
    totalPages: number;
    total: number;
    pageSize: number;
    hrefFor: (page: number) => string;
}) {
    const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, total);

    return (
        <div className="flex items-center justify-between">
            <p className="text-sm text-ink-muted">
                <span className="font-mono">
                    {from}-{to}
                </span>{" "}
                de <span className="font-mono">{total}</span>
            </p>

            <div className="flex items-center gap-2">
                {page > 1 ? (
                    <LinkButton href={hrefFor(page - 1)} variant="outline" size="sm" className="gap-1">
                        <ChevronLeft className="h-4 w-4" />
                        <span>Anterior</span>
                    </LinkButton>
                ) : (
                    <Button variant="outline" size="sm" disabled className="gap-1">
                        <ChevronLeft className="h-4 w-4" />
                        <span>Anterior</span>
                    </Button>
                )}

                <span className="text-sm text-ink-muted">
                    Página <span className="font-mono">{page}</span> de <span className="font-mono">{totalPages}</span>
                </span>

                {page < totalPages ? (
                    <LinkButton href={hrefFor(page + 1)} variant="outline" size="sm" className="gap-1">
                        <span>Próxima</span>
                        <ChevronRight className="h-4 w-4" />
                    </LinkButton>
                ) : (
                    <Button variant="outline" size="sm" disabled className="gap-1">
                        <span>Próxima</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}