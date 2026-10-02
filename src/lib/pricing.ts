export type Tributo = {
    codigo: string;
    aliquota: number;
    escalaPelaCondicao: boolean;
};

export type CoeficienteInput = {
    icmsAliquota: number;
    condicaoPercentual: number;
    prazoDias: number[];
    comissaoPercentual: number;
    mcValor: number;
    multiplicadorMc: number;
    tributos: Tributo[];
};

/**
 * Coeficiente que representa a fração do preço de venda que sobra depois de
 * descontar tributos, comissão, custo do prazo e margem de contribuição.
 * Não depende de um produto específico — é o mesmo para todo o catálogo
 * dadas as variáveis do painel.
 */
export function calcularCoeficiente(input: CoeficienteInput): number {
    const condicaoFrac = input.condicaoPercentual / 100;

    const dias = input.prazoDias
    .filter((d) => Number.isFinite(d) && d > 0);
    const mediaPrazo = dias.length > 0 ? dias.reduce((s, v) => s + v, 0) / dias.length : 0;
    const mediaPrazoFinal = (3 / 45) * mediaPrazo;

    // IPI é tratado à parte (somado depois do preço, não descontado do divisor)
    const tributosNoDivisor = input.tributos.filter((t) => t.codigo !== "IPI");

    let coeficiente = 100;
    for (const tributo of tributosNoDivisor) {
        coeficiente -= tributo.escalaPelaCondicao ? tributo.aliquota * condicaoFrac : tributo.aliquota;
    }
    coeficiente -= input.icmsAliquota * condicaoFrac;
    coeficiente -= mediaPrazoFinal;
    coeficiente -= input.comissaoPercentual;
    coeficiente -= input.mcValor * input.multiplicadorMc;

    return coeficiente / 100;
}

export type PrecoProdutoInput = {
    custoBase: number;
    cubagemM3: number;
    pecasPorEmbalagem: number;
    freteReaisPorM3: number;
    condicaoPercentual: number;
    mvaEstado: number;
    coeficienteFinal: number;
    ipiAliquota: number;
};

export type PrecoProdutoResult = {
    custoComFrete: number;
    precoFinal: number;
    ipiValor: number;
    mvaValor: number;
    precoComImpostos: number;
};

export function calcularPrecoProduto(input: PrecoProdutoInput): PrecoProdutoResult {
    const freteEfetivo = input.freteReaisPorM3 !== 0 ? input.freteReaisPorM3 : 1;
    const cubagemPeca = input.pecasPorEmbalagem > 0 ? input.cubagemM3 / input.pecasPorEmbalagem : 0;
    const custoComFrete = freteEfetivo * cubagemPeca + input.custoBase;

    const condicaoFrac = input.condicaoPercentual / 100;
    const precoFinal = input.coeficienteFinal > 0 ? custoComFrete / input.coeficienteFinal : 0;

    const ipiValor = (input.ipiAliquota / 100) * (precoFinal * condicaoFrac);
    const mvaValor = (input.mvaEstado / 100) * (precoFinal * condicaoFrac);
    const precoComImpostos = precoFinal + ipiValor + mvaValor;

    return { custoComFrete, precoFinal, ipiValor, mvaValor, precoComImpostos };
}