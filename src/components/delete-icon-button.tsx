"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

export function DeleteIconButton({
    action,
    title,
    description,
}: {
    action: () => Promise<void>;
    title: string;
    description: string;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={<Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Excluir" />}
            >
                <Trash2 className="h-4 w-4 text-ink-muted" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <form action={action}>
                        <AlertDialogAction type="submit" className="bg-danger hover:bg-danger/90">
                            Excluir
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}