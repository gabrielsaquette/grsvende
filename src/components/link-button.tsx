import Link from "next/link";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";

type LinkButtonProps = Omit<ComponentProps<typeof Button>, "render" | "nativeButton"> & {
  href: string;
};

export function LinkButton({ href, ...props }: LinkButtonProps) {
  return <Button render={<Link href={href} />} nativeButton={false} {...props} />;
}
