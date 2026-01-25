import { useState } from "react";
import { Pencil, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { SignatureLink } from "@/types/signature";

interface EditLinkDialogProps {
  link: SignatureLink;
  onUpdate: (
    id: string,
    field: keyof Omit<SignatureLink, "id">,
    value: string | boolean,
  ) => void;
}

const providerLabels: Record<string, string> = {
  linkedin: "LinkedIn",
  x: "X (Twitter)",
  github: "GitHub",
  facebook: "Facebook",
  instagram: "Instagram",
  custom: "Custom Link",
};

export function EditLinkDialog({ link, onUpdate }: EditLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState(link.url);
  const [tempLabel, setTempLabel] = useState(link.label);
  const [tempShowIcon, setTempShowIcon] = useState(link.showIcon);

  const hasIconSupport = link.provider !== "custom";
  const providerLabel = providerLabels[link.provider] || "Link";

  const handleSave = () => {
    onUpdate(link.id, "url", tempUrl);
    onUpdate(link.id, "label", tempLabel);
    onUpdate(link.id, "showIcon", tempShowIcon);
    setOpen(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setTempUrl(link.url);
    setTempLabel(link.label);
    setTempShowIcon(link.showIcon);
    setOpen(false);
  };

  // Update temp state when link changes externally
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setTempUrl(link.url);
      setTempLabel(link.label);
      setTempShowIcon(link.showIcon);
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground h-7 px-2 gap-1.5"
        >
          <Pencil className="w-3 h-3" />
          <span className="text-xs">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit {providerLabel}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-xs">
            <span>Configure your link details</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="space-y-2 text-xs">
                    <p>
                      <strong>URL:</strong> The web address this link should
                      point to.
                    </p>
                    <p>
                      <strong>Label:</strong> Custom text to display (optional).
                      If empty, defaults to the platform name or URL.
                    </p>
                    {hasIconSupport && (
                      <p>
                        <strong>Show Icon:</strong> Display the social platform
                        icon next to the label.
                      </p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="edit-url" className="text-sm font-medium">
              URL
            </Label>
            <Input
              id="edit-url"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="https://..."
              className="bg-surface border-border h-9"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-label" className="text-sm font-medium">
              Label <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="edit-label"
              value={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              placeholder={
                link.provider === "custom"
                  ? "e.g., Portfolio, Website"
                  : `e.g., Connect with me`
              }
              className="bg-surface border-border h-9"
            />
          </div>

          {hasIconSupport && (
            <div className="flex items-center gap-2">
              <Checkbox
                id="edit-show-icon"
                checked={tempShowIcon}
                onCheckedChange={(checked) => setTempShowIcon(!!checked)}
              />
              <Label
                htmlFor="edit-show-icon"
                className="text-sm cursor-pointer"
              >
                Show social icon
              </Label>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
