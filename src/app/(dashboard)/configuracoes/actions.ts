"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { estados, tributos, configuracoesPrecificacao } from "@/db/schema";
import { getCurrentUserId } from "@/lib/auth/dal";
import type { ActionState } from "@/lib/action-state";

export async function updateEstados(_prev: ActionState, formData: FormData): Promise<ActionState> {
    await getCurrentUserId();

    const updates: { uf: string; mva: number }[] = [];
    for (const [key, value] of formData.entries()) {
        if (!key.startsWith("mva_")) continue;
        const uf = key.replace("mva_", "");
        const mva = Number(String(value).replace(",", "."));
        if (Number.isNaN(mva) || mva < 0 || mva > 999) {
            return { error: `MVA inválido para ${uf}.` };
        }
        updates.push({ uf, mva });
    }

    await Promise.all(updates.map((u) => db.update(estados).set({ mva: u.mva.toFixed(2) }).where(eq(estados.uf, u.uf))));

    revalidatePath("/configuracoes");
    revalidatePath("/produtos");
    return { success: true };
}

export async function updateTributos(_prev: ActionState, formData: FormData): Promise<ActionState> {
    await getCurrentUserId();

    const codigos = new Set<string>();
    for (const key of formData.keys()) {
        if (key.startsWith("aliquota_")) codigos.add(key.replace("aliquota_", ""));
    }

    const updates: { codigo: string; aliquota: number; escalaPelaCondicao: boolean }[] = [];
    for (const codigo of codigos) {
        const raw = String(formData.get(`aliquota_${codigo}`) ?? "0").replace(",", ".");
        const aliquota = Number(raw);
        if (Number.isNaN(aliquota) || aliquota < 0 || aliquota > 100) {
            return { error: `Alíquota inválida para ${codigo}.` };
        }
        updates.push({ codigo, aliquota, escalaPelaCondicao: formData.get(`escala_${codigo}`) === "on" });
    }

    await Promise.all(
        updates.map((u) =>
            db
                .update(tributos)
                .set({ aliquota: u.aliquota.toFixed(3), escalaPelaCondicao: u.escalaPelaCondicao })
                .where(eq(tributos.codigo, u.codigo))
        )
    );

    revalidatePath("/configuracoes");
    revalidatePath("/produtos");
    return { success: true };
}

export async function updateConfiguracoesPrecificacao(_prev: ActionState, formData: FormData): Promise<ActionState> {
    await getCurrentUserId();

    const mcPadrao = Number(String(formData.get("mcPadrao") ?? "0").replace(",", "."));
    const multiplicadorMc = Number(String(formData.get("multiplicadorMc") ?? "0").replace(",", "."));

    if (Number.isNaN(mcPadrao) || mcPadrao < 0) return { error: "MC padrão inválida." };
    if (Number.isNaN(multiplicadorMc) || multiplicadorMc < 0) return { error: "Multiplicador de MC inválido." };

    await db
        .update(configuracoesPrecificacao)
        .set({ mcPadrao: mcPadrao.toFixed(2), multiplicadorMc: multiplicadorMc.toFixed(2) })
        .where(eq(configuracoesPrecificacao.id, 1));

    revalidatePath("/configuracoes");
    revalidatePath("/produtos");
    return { success: true };
}