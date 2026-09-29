import "dotenv/config";
import argon2 from "argon2";
import { db } from "./index";
import { users } from "./schema";

function getArg(flag: string) {
    const i = process.argv.indexOf(flag);
    return i !== -1 ? process.argv[i + 1] : undefined;
}

async function main() {
    const name = getArg("--name");
    const email = getArg("--email")?.toLowerCase();
    const senha = getArg("--senha");

    if (!name || !email || !senha) {
        console.error('Uso: npm run db:seed -- --name "Nome" --email "email@dominio.com" --senha "SenhaForte123!"');
        process.exit(1);
    }
    if (senha.length < 8) {
        console.error("A senha precisa ter pelo menos 8 caracteres.");
        process.exit(1);
    }

    const passwordHash = await argon2.hash(senha, {
        type: argon2.argon2id,
        memoryCost: 19456,
        timeCost: 2,
        parallelism: 1,
    });

    const [user] = await db
        .insert(users)
        .values({ name, email, passwordHash })
        .returning({ id: users.id, email: users.email });

    console.log("Usuário criado:", user);
    process.exit(0);
}

main().catch((err) => {
    console.error("Erro ao criar usuário:", err);
    process.exit(1);
});