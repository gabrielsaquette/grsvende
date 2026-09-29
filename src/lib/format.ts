export function formatDate(date: Date | string) {
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(date));
}

export function formatCurrency(value: string | number) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value));
}

export function formatWeight(value: string | number) {
    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    }).format(Number(value));
}

export function formatNcm(ncm: string) {
    return ncm.length === 8 ? `${ncm.slice(0, 4)}.${ncm.slice(4, 6)}.${ncm.slice(6)}` : ncm;
}