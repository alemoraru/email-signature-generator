import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditLinkDialog } from "@/components/EditLinkDialog";
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
  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      className={`flex items-center gap-2 p-2 rounded-lg border border-border bg-surface transition-all hover:border-border/60 ${
        draggedIndex === index ? "opacity-50" : ""
      }`}
    >
      <GripVertical className="w-3.5 h-3.5 text-muted-foreground cursor-grab flex-shrink-0" />

      <Select
        value={link.provider}
        onValueChange={(value: SocialProvider) =>
          onUpdate(link.id, "provider", value)
        }
      >
        <SelectTrigger className="w-32 h-8 text-xs">
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

      <div className="flex-1" />

      <div className="flex items-center gap-1">
        <EditLinkDialog link={link} onUpdate={onUpdate} />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(link.id)}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-7 w-7 flex-shrink-0"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
