"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ProdutosSearch({ initialQuery }: { initialQuery: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const [value, setValue] = useState(initialQuery);
    const [, startTransition] = useTransition();
    const lastApplied = useRef(initialQuery);

    useEffect(() => {
        const term = value.trim();
        if (term === lastApplied.current) return;

        const timer = setTimeout(() => {
            lastApplied.current = term;
            const params = new URLSearchParams();
            if (term) params.set("q", term);
            const qs = params.toString();
            startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname));
        }, 300);

        return () => clearTimeout(timer);
    }, [value, pathname, router]);

    return (
        <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Buscar por nome, código ou GTIN"
                aria-label="Buscar produtos"
                className="pl-9"
            />
        </div>
    );
}