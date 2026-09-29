import { LoginForm } from "./login-form";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen">
            <div className="hidden w-1/2 flex-col justify-between bg-ink p-12 text-white lg:flex">
                <span className="text-sm font-semibold tracking-tight">GRSVende</span>
                <div>
                    <p className="max-w-xs text-lg leading-relaxed text-white/85">
                        Organize clientes, negócios e atividades da sua equipe de vendas em um só lugar.
                    </p>
                </div>
                <span className="text-xs text-white/40">© 2026 GRSVende</span>
            </div>

            <div className="flex w-full items-center justify-center bg-surface px-6 lg:w-1/2">
                <LoginForm />
            </div>
        </div>
    );
}