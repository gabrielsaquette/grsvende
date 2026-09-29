import type { ReactNode } from "react";

type Column<T> = {
    header: string;
    cell: (row: T) => ReactNode;
    className?: string;
};

export function DataTable<T extends { id: number }>({
    columns,
    rows,
    actions,
}: {
    columns: Column<T>[];
    rows: T[];
    actions?: (row: T) => ReactNode;
}) {
    return (
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border text-left text-xs text-ink-muted">
                        {columns.map((col) => (
                            <th key={col.header} className={`px-6 py-3 font-normal ${col.className ?? ""}`}>
                                {col.header}
                            </th>
                        ))}
                        {actions && <th className="w-20 px-6 py-3" />}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id} className="border-b border-border last:border-0">
                            {columns.map((col) => (
                                <td key={col.header} className={`px-6 py-3 ${col.className ?? ""}`}>
                                    {col.cell(row)}
                                </td>
                            ))}
                            {actions && (
                                <td className="px-6 py-3">
                                    <div className="flex justify-end gap-1">{actions(row)}</div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}