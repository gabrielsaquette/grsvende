"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { transportadoras } from "@/db/schema";
import { getCurrentUserId } from "@/lib/auth/dal";
import type { ActionState } from "@/lib/action-state";

const transportadoraSchema = z.object({
    name: z.string().trim().min(1, "Nome é obrigatório").max(255),
    email: z.string().trim().max(255).email("E-mail inválido").optional(),
    phone: z.string().trim().max(30).optional(),
    company: z.string().trim().max(255).optional(),
    document: z.string().trim().max(20).optional(),
    segment: z.string().trim().max(100).optional(),
    addressStreet: z.string().trim().max(255).optional(),
    addressNumber: z.string().trim().max(20).optional(),
    addressComplement: z.string().trim().max(100).optional(),
    addressCity: z.string().trim().max(100).optional(),
    addressState: z.string().trim().max(2).optional(),
    addressZip: z.string().trim().max(10).optional(),
    notes: z.string().trim().max(2000).optional(),
});

function emptyToUndefined(v: FormDataEntryValue | null) {
    const s = String(v ?? "").trim();
    return s === "" ? undefined : s;
}

function parseTransportadoraForm(formData: FormData) {
    const raw = {
        name: String(formData.get("name") ?? ""),
        email: emptyToUndefined(formData.get("email")),
        phone: emptyToUndefined(formData.get("phone")),
        company: emptyToUndefined(formData.get("company")),
        document: emptyToUndefined(formData.get("document")),
        segment: emptyToUndefined(formData.get("segment")),
        addressStreet: emptyToUndefined(formData.get("addressStreet")),
        addressNumber: emptyToUndefined(formData.get("addressNumber")),
        addressComplement: emptyToUndefined(formData.get("addressComplement")),
        addressCity: emptyToUndefined(formData.get("addressCity")),
        addressState: emptyToUndefined(formData.get("addressState")),
        addressZip: emptyToUndefined(formData.get("addressZip")),
        notes: emptyToUndefined(formData.get("notes")),
    };

    const result = transportadoraSchema.safeParse(raw);
    if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of result.error.issues) fieldErrors[issue.path[0] as string] = issue.message;
        return { success: false as const, fieldErrors };
    }
    return { success: true as const, data: result.data };
}

export async function createTransportadora(_prev: ActionState, formData: FormData): Promise<ActionState> {
    const userId = await getCurrentUserId();
    const parsed = parseTransportadoraForm(formData);
    if (!parsed.success) return { fieldErrors: parsed.fieldErrors };

    const [transportadora] = await db
        .insert(transportadoras)
        .values({ userId, ...parsed.data })
        .returning({ id: transportadoras.id });

    revalidatePath("/transportadoras");
    redirect(`/transportadoras/${transportadora.id}`);
}

export async function updateTransportadora(id: number, _prev: ActionState, formData: FormData): Promise<ActionState> {
    const userId = await getCurrentUserId();
    const parsed = parseTransportadoraForm(formData);
    if (!parsed.success) return { fieldErrors: parsed.fieldErrors };

    await db
        .update(transportadoras)
        .set({ ...parsed.data, updatedAt: new Date() })
        .where(and(eq(transportadoras.id, id), eq(transportadoras.userId, userId)));

    revalidatePath("/transportadoras");
    revalidatePath(`/transportadoras/${id}`);
    return { success: true };
}

export async function deleteTransportadora(id: number) {
    const userId = await getCurrentUserId();
    await db.delete(transportadoras).where(and(eq(transportadoras.id, id), eq(transportadoras.userId, userId)));
    revalidatePath("/transportadoras");
}