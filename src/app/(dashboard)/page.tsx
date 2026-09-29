import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
    { label: "Novos clientes (mês)", value: "128", delta: "+12%" },
    { label: "Negócios em aberto", value: "47", delta: "+3%" },
    { label: "Receita prevista", value: "R$ 482.300", delta: "+8%" },
    { label: "Taxa de conversão", value: "24%", delta: "-2%" },
];

const stages = [
    { label: "Prospecção", value: 32 },
    { label: "Qualificação", value: 21 },
    { label: "Proposta", value: 14 },
    { label: "Negociação", value: 9 },
    { label: "Fechado", value: 6 },
];

const activities = [
    { client: "Ind. Aço Forte", type: "Ligação", date: "22/09" },
    { client: "Mercado Central", type: "Reunião", date: "21/09" },
    { client: "Tech Hub Ltda", type: "E-mail", date: "21/09" },
];

export default function PainelPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-lg font-semibold text-ink">Painel</h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((s) => (
                    <Card key={s.label} className="border-border">
                        <CardHeader className="pb-1">
                            <CardTitle className="text-xs font-normal text-ink-muted">{s.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <span className="font-mono text-2xl font-medium text-ink">{s.value}</span>
                                <span className="text-xs text-ink-muted">{s.delta}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card className="border-border lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-ink">Atividades recentes</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-t border-border text-left text-xs text-ink-muted">
                                    <th className="px-6 py-2 font-normal">Cliente</th>
                                    <th className="px-6 py-2 font-normal">Tipo</th>
                                    <th className="px-6 py-2 font-normal">Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.map((a) => (
                                    <tr key={a.client} className="border-t border-border">
                                        <td className="px-6 py-2.5 text-ink">{a.client}</td>
                                        <td className="px-6 py-2.5 text-ink-muted">{a.type}</td>
                                        <td className="px-6 py-2.5 font-mono text-xs text-ink-muted">{a.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                <Card className="border-border">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-ink">Negócios por estágio</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {stages.map((s) => (
                            <div key={s.label} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-ink-muted">{s.label}</span>
                                    <span className="font-mono text-ink">{s.value}</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-background">
                                    <div
                                        className="h-1.5 rounded-full bg-accent"
                                        style={{ width: `${(s.value / 32) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}