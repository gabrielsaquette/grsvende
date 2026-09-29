"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import argon2 from "argon2";
import { db } from "@/db";
import { users } from "@/db/schema";
import { createSession } from "@/lib/auth/session";

// Hash "morto" só para igualar o tempo de resposta quando o e-mail não existe,
// evitando que alguém descubra e-mails válidos medindo o tempo da requisição.
const DUMMY_HASH =
    "$argon2id$v=19$m=19456,p=1,t=2$+D/jxdBc++nyURWJcrs9cg$ZuK7y2dbnxA5PyvDheF39jU+bOlsu8HdRKhLRTyT7LQ";

export type LoginState = { error?: string } | undefined;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const senha = String(formData.get("senha") ?? "");

    console.log("DEBUG email:", JSON.stringify(email));
    console.log("DEBUG senha:", senha ? `preenchida (${senha.length} caracteres)` : "VAZIA");

    if (!email || !senha) {
        return { error: "Informe e-mail e senha." };
    }

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    const senhaValida = await argon2.verify(user ? user.passwordHash : DUMMY_HASH, senha);

    if (!user || !senhaValida) {
        return { error: "E-mail ou senha inválidos." };
    }

    await createSession(user.id);
    redirect("/(dashboard)/page.tsx");
}