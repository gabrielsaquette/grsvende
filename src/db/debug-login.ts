import "dotenv/config";
import argon2 from "argon2";
import { eq } from "drizzle-orm";
import { db } from "./index";
import { users } from "./schema";

async function main() {
  const [, , email, senha] = process.argv;
  if (!email || !senha) {
    console.error("Uso: npx tsx src/db/debug-login.ts email senha");
    process.exit(1);
  }

  const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);

  if (!user) {
    console.log("Nenhum usuário encontrado com esse e-mail.");
    process.exit(0);
  }

  console.log("Usuário encontrado:", { id: user.id, email: user.email });
  const valid = await argon2.verify(user.passwordHash, senha);
  console.log("Senha confere?", valid);
  process.exit(0);
}

main();
