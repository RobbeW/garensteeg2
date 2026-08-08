import type { HTMLAttributes } from "react";
import { Info } from "lucide-react";
import { cn } from "../../lib/utils";

export function Alert({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex gap-3 rounded-lg border border-[#dec879] bg-warning-soft p-4 text-sm leading-6 text-text", className)}
      role="note"
      {...props}
    >
      <Info className="mt-0.5 h-5 w-5 flex-none text-[#7a5c00]" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
