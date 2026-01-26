import { GripVertical, Trash2, CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EditLinkDialog, isValidUrl } from "@/components/EditLinkDialog";
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
  onUpdateBulk: (
    id: string,
    updates: Partial<Omit<SignatureLink, "id">>,
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
  { value: "website", label: "Website" },
  { value: "custom", label: "Custom" },
];

export function SocialLinkEditor({
  link,
  index,
  draggedIndex,
  onUpdate,
  onUpdateBulk,
  onRemove,
  onDragStart,
  onDragOver,
  onDragEnd,
}: SocialLinkEditorProps) {
  const hasInvalidUrl = !isValidUrl(link.url);

  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      className={`flex items-center gap-2 p-2 rounded-lg border border-border bg-surface transition-all hover:border-border/60 relative overflow-visible ${
        draggedIndex === index ? "opacity-50" : ""
      }`}
    >
      {hasInvalidUrl && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center shadow-sm">
                <CircleAlert className="w-3 h-3 text-white" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="text-xs">
                URL should start with http:// or https:// to work properly
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
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
        <EditLinkDialog link={link} onUpdateBulk={onUpdateBulk} />

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
