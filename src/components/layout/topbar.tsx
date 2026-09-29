"use client";

import { Menu, Search, LogOut, Settings as SettingsIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export function Topbar() {
    return (
        <div className="flex h-14 items-center gap-4 border-b border-border bg-surface px-4">
            <Sheet>
                <SheetTrigger className="lg:hidden">
                    <Menu className="h-5 w-5 text-ink-muted" />
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <Sidebar />
                </SheetContent>
            </Sheet>

            <div className="relative max-w-sm flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <Input placeholder="Buscar clientes, negócios..." className="pl-9" />
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-accent text-xs text-accent-foreground">GR</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <SettingsIcon className="mr-2 h-4 w-4" /> Configurações
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" /> Sair
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}