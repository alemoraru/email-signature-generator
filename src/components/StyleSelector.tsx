import type { SignatureStyle } from "@/types/signature";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

interface StyleSelectorProps {
  value: SignatureStyle;
  onChange: (style: SignatureStyle) => void;
}

const styles: { value: SignatureStyle; label: string; description: string }[] =
  [
    {
      value: "classic",
      label: "Classic",
      description: "Traditional layout with logo on left",
    },
    {
      value: "modern",
      label: "Modern",
      description: "Clean horizontal divider style",
    },
    {
      value: "minimal",
      label: "Minimal",
      description: "Simple text-only design",
    },
    {
      value: "compact",
      label: "Compact",
      description: "Everything in one concise line",
    },
    {
      value: "professional",
      label: "Professional",
      description: "Formal layout with dividers",
    },
    {
      value: "bold",
      label: "Bold",
      description: "Prominent bold name and logo",
    },
  ];

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  const selectedStyle = styles.find((style) => style.value === value);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-background px-2.5 focus:ring-muted-foreground/30">
        <SelectValue>
          {selectedStyle?.label}: {selectedStyle?.description}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {styles.map((style) => (
          <SelectItem
            key={style.value}
            value={style.value}
            className="focus:bg-accent/10 focus:text-accent cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-medium">{style.label}</span>
              <span className="text-xs text-muted-foreground">
                {style.description}
              </span>
            </div>
          </SelectItem>
        ))}
        <Separator className="my-2" />
        <a
          href="https://github.com/alemoraru/email-signature-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-sm transition-colors cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <Plus className="h-4 w-4" />
          <div className="flex flex-col">
            <span className="font-medium">Want to add a new style?</span>
            <span className="text-xs">Contribute on GitHub</span>
          </div>
        </a>
      </SelectContent>
    </Select>
  );
}
