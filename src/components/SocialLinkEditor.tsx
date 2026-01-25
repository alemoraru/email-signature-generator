import { GripVertical, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SignatureLink, SocialProvider } from "@/types/signature";

interface SocialLinkEditorProps {
  link: SignatureLink;
  index: number;
  draggedIndex: number | null;
  onUpdate: (
    id: string,
    field: keyof Omit<SignatureLink, "id">,
    value: string | boolean,
  ) => void;
  onRemove: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
}

const socialProviders: { value: SocialProvider; label: string }[] = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "x", label: "X (Twitter)" },
  { value: "github", label: "GitHub" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "custom", label: "Custom" },
];

export function SocialLinkEditor({
  link,
  index,
  draggedIndex,
  onUpdate,
  onRemove,
  onDragStart,
  onDragOver,
  onDragEnd,
}: SocialLinkEditorProps) {
  const hasIconSupport = link.provider !== "custom";

  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      className={`flex flex-col gap-2 p-2 rounded-lg border border-border bg-surface transition-all ${
        draggedIndex === index ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <GripVertical className="w-3 h-3 text-muted-foreground cursor-grab flex-shrink-0" />

        <Select
          value={link.provider}
          onValueChange={(value: SocialProvider) =>
            onUpdate(link.id, "provider", value)
          }
        >
          <SelectTrigger className="w-28 h-7 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {socialProviders.map((provider) => (
              <SelectItem
                key={provider.value}
                value={provider.value}
                className="text-xs"
              >
                {provider.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          value={link.url}
          onChange={(e) => onUpdate(link.id, "url", e.target.value)}
          placeholder="https://..."
          className="flex-1 h-7 text-xs bg-background border-border"
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(link.id)}
          className="text-muted-foreground hover:text-destructive h-7 w-7"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      <div className="flex items-center gap-3 pl-5">
        {link.provider === "custom" && (
          <Input
            value={link.label}
            onChange={(e) => onUpdate(link.id, "label", e.target.value)}
            placeholder="Label (e.g. Website)"
            className="flex-1 h-7 text-xs bg-background border-border"
          />
        )}

        {hasIconSupport && (
          <div className="flex items-center gap-2">
            <Checkbox
              id={`icon-${link.id}`}
              checked={link.showIcon}
              onCheckedChange={(checked) =>
                onUpdate(link.id, "showIcon", !!checked)
              }
            />
            <label
              htmlFor={`icon-${link.id}`}
              className="text-xs text-muted-foreground cursor-pointer"
            >
              Show icon
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
