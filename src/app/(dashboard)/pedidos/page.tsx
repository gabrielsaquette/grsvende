import { ShoppingCart } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

export default function PedidosPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-lg font-semibold text-ink">Pedidos</h1>
            <EmptyState
                icon={ShoppingCart}
                title="Nenhum pedido registrado"
                description="Pedidos vinculados aos clientes aparecerão aqui."
            />
        </div>
    );
}