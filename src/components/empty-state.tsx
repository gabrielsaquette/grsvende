import { LucideIcon } from "lucide-react";

export function EmptyState({
    icon: Icon,
    title,
    description,
}: {
    icon: LucideIcon;
    title: string;
    description: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
            <Icon className="h-6 w-6 text-ink-muted" strokeWidth={1.5} />
            <p className="mt-3 text-sm font-medium text-ink">{title}</p>
            <p className="mt-1 max-w-xs text-sm text-ink-muted">{description}</p>
        </div>
    );
}