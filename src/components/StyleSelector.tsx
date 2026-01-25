import { cn } from "@/lib/utils";
import type { SignatureStyle } from "@/types/signature";

interface StyleSelectorProps {
  value: SignatureStyle;
  onChange: (style: SignatureStyle) => void;
}

const styles: { value: SignatureStyle; label: string; description: string }[] =
  [
    {
      value: "modern",
      label: "Modern",
      description: "Clean horizontal divider style",
    },
    {
      value: "classic",
      label: "Classic",
      description: "Traditional layout with logo on left",
    },
    {
      value: "minimal",
      label: "Minimal",
      description: "Simple text-only design",
    },
  ];

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="flex gap-2">
      {styles.map((style) => (
        <button
          key={style.value}
          onClick={() => onChange(style.value)}
          className={cn(
            "flex-1 px-3 py-2 rounded-lg border text-xs font-medium transition-all",
            value === style.value
              ? "border-accent bg-accent/10 text-accent"
              : "border-border bg-surface text-muted-foreground hover:border-muted-foreground/50",
          )}
        >
          {style.label}
        </button>
      ))}
    </div>
  );
}
