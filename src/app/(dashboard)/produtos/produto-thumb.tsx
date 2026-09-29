import Image from "next/image";
import { ImageIcon } from "lucide-react";

export function ProdutoThumb({ src, alt }: { src: string | null; alt: string }) {
    return (
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border border-border bg-background">
            {src ? (
                <Image src={src} alt={alt} fill sizes="48px" className="object-cover" />
            ) : (
                <ImageIcon className="h-5 w-5 text-ink-muted" strokeWidth={1.5} />
            )}
        </div>
    );
}