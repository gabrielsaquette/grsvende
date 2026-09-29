"use client";

import Link from "next/link";
import { LinkButton } from "@/components/link-button";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Truck,
    Package,
    ShoppingCart,
    ListChecks,
    BarChart3,
    Settings,
} from "lucide-react";

const navItems = [
    { href: "/", label: "Painel", icon: LayoutDashboard },
    { href: "/clientes", label: "Clientes", icon: Users },
    { href: "/transportadoras", label: "Transportadoras", icon: Truck },
    { href: "/produtos", label: "Produtos", icon: Package },
    { href: "/pedidos", label: "Pedidos", icon: ShoppingCart },
    { href: "/atividades", label: "Atividades", icon: ListChecks },
    { href: "/relatorios", label: "Relatórios", icon: BarChart3 },
    { href: "/configuracoes", label: "Configurações", icon: Settings },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b border-border px-5">
                <span className="text-sm font-semibold tracking-tight text-ink">GRSVende</span>
            </div>

            <nav className="flex-1 space-y-0.5 px-3 py-4">
                {navItems.map((item) => {
                    const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${active
                                    ? "bg-accent/10 font-medium text-accent"
                                    : "text-ink-muted hover:bg-background hover:text-ink"
                                }`}
                        >
                            <Icon className="h-4 w-4" strokeWidth={1.75} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}