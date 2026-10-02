import { getEstados } from "@/lib/data/estados";
import { getTributos } from "@/lib/data/tributos";
import { getConfiguracoesPrecificacao } from "@/lib/data/configuracoes-precificacao";
import { EstadosForm } from "./estados-form";
import { TributosForm } from "./tributos-form";
import { MargemForm } from "./margem-form";

export default async function ConfiguracoesPage() {
    const [estadosList, tributosList, config] = await Promise.all([
        getEstados(),
        getTributos(),
        getConfiguracoesPrecificacao(),
    ]);

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-lg font-semibold text-ink">Configurações</h1>
                <p className="text-sm text-ink-muted">Variáveis usadas no cálculo de preço em Produtos.</p>
            </div>

            <section className="space-y-3">
                <div>
                    <h2 className="text-sm font-medium text-ink">Margem de contribuição</h2>
                    <p className="text-xs text-ink-muted">Valor padrão de MC e o peso de cada ponto de MC no preço final.</p>
                </div>
                <MargemForm mcPadrao={config.mcPadrao} multiplicadorMc={config.multiplicadorMc} />
            </section>

            <section className="space-y-3">
                <div>
                    <h2 className="text-sm font-medium text-ink">Tributos</h2>
                    <p className="text-xs text-ink-muted">
                        &quot;Escala pela condição&quot; aplica o percentual da condição especial sobre o tributo, como no sistema antigo.
                    </p>
                </div>
                <TributosForm tributos={tributosList} />
            </section>

            <section className="space-y-3">
                <div>
                    <h2 className="text-sm font-medium text-ink">Estados</h2>
                    <p className="text-xs text-ink-muted">MVA (ICMS-ST) por estado do cliente.</p>
                </div>
                <EstadosForm estados={estadosList} />
            </section>
        </div>
    );
}