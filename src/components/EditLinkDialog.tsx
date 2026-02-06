import { useState, useMemo } from "react";
import { Pencil, HelpCircle, TriangleAlert } from "lucide-react";
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

// URL validation helper
export const isValidUrl = (url: string): boolean => {
  if (!url) return true; // Empty is valid (no warning for empty)
  const trimmedUrl = url.trim().toLowerCase();
  return trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://");
};

interface EditLinkDialogProps {
  link: SignatureLink;
  onUpdateBulk: (
    id: string,
    updates: Partial<Omit<SignatureLink, "id">>,
  ) => void;
}

const providerLabels: Record<string, string> = {
  linkedin: "LinkedIn",
  x: "X (Twitter)",
  github: "GitHub",
  facebook: "Facebook",
  instagram: "Instagram",
  website: "Website",
  custom: "Custom Link",
};

export function EditLinkDialog({ link, onUpdateBulk }: EditLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState(link.url);
  const [tempLabel, setTempLabel] = useState(link.label);
  const [tempShowIcon, setTempShowIcon] = useState(link.showIcon);
  const [tempUseUtm, setTempUseUtm] = useState(link.useUtm);
  const [tempUtmSource, setTempUtmSource] = useState(
    link.utmSource || "email_signature",
  );
  const [tempUtmMedium, setTempUtmMedium] = useState(link.utmMedium || "email");
  const [tempUtmCampaign, setTempUtmCampaign] = useState(
    link.utmCampaign || "email",
  );

  const hasIconSupport = link.provider !== "custom";
  const providerLabel = providerLabels[link.provider] || "Link";
  const showUrlWarning = useMemo(() => !isValidUrl(tempUrl), [tempUrl]);

  const handleSave = () => {
    onUpdateBulk(link.id, {
      url: tempUrl,
      label: tempLabel,
      showIcon: tempShowIcon,
      useUtm: tempUseUtm,
      utmSource: tempUtmSource,
      utmMedium: tempUtmMedium,
      utmCampaign: tempUtmCampaign,
    });
    setOpen(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setTempUrl(link.url);
    setTempLabel(link.label);
    setTempShowIcon(link.showIcon);
    setTempUseUtm(link.useUtm);
    setTempUtmSource(link.utmSource || "email_signature");
    setTempUtmMedium(link.utmMedium || "email");
    setTempUtmCampaign(link.utmCampaign || "email");
    setOpen(false);
  };

  // Update temp state when link changes externally
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setTempUrl(link.url);
      setTempLabel(link.label);
      setTempShowIcon(link.showIcon);
      setTempUseUtm(link.useUtm);
      setTempUtmSource(link.utmSource || "email_signature");
      setTempUtmMedium(link.utmMedium || "email");
      setTempUtmCampaign(link.utmCampaign || "email");
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-accent hover:bg-accent/10 h-7 px-2 gap-1.5"
        >
          <Pencil className="w-3 h-3" />
          <span className="text-xs">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
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
                    <p>
                      <strong>UTM Tracking:</strong> Add analytics parameters to
                      track clicks from your email signature.
                    </p>
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
              className={`bg-surface border-border h-9 ${
                showUrlWarning
                  ? "border-yellow-500 focus:border-yellow-500"
                  : ""
              }`}
            />
            {showUrlWarning && (
              <div className="flex items-start gap-2 p-2.5 pl-3 rounded-md bg-yellow-500/10 border border-yellow-500/20">
                <TriangleAlert className="w-4 h-4 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-700 dark:text-yellow-400 leading-relaxed break-words pr-1">
                  URL should start with{" "}
                  <code className="font-mono text-[11px] px-1 py-0.5 bg-yellow-500/10 rounded">
                    http://
                  </code>{" "}
                  or{" "}
                  <code className="font-mono text-[11px] px-1 py-0.5 bg-yellow-500/10 rounded">
                    https://
                  </code>{" "}
                  to work properly in emails.
                </p>
              </div>
            )}
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
            <div className="flex items-start gap-2 pt-1">
              <Checkbox
                id="edit-show-icon"
                checked={tempShowIcon}
                onCheckedChange={(checked) => setTempShowIcon(!!checked)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label
                  htmlFor="edit-show-icon"
                  className="text-sm cursor-pointer"
                >
                  Show social icon
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Display the platform icon next to the link text
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-2">
              <Checkbox
                id="edit-use-utm"
                checked={tempUseUtm}
                onCheckedChange={(checked) => setTempUseUtm(!!checked)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label
                  htmlFor="edit-use-utm"
                  className="text-sm cursor-pointer flex items-center gap-2"
                >
                  Add UTM tracking parameters
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">
                          Automatically appends UTM parameters (utm_source,
                          utm_medium, utm_campaign) to track click analytics
                          from your email signature. The tracking parameters are
                          added when the signature is generated and won't appear
                          in the URL field above.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Track link clicks from your email signature
                </p>
              </div>
            </div>

            {tempUseUtm && (
              <div className="ml-6 space-y-3 pt-1">
                <div className="space-y-1.5">
                  <Label htmlFor="utm-source" className="text-xs font-medium">
                    UTM Source
                  </Label>
                  <Input
                    id="utm-source"
                    value={tempUtmSource}
                    onChange={(e) => setTempUtmSource(e.target.value)}
                    placeholder="email_signature"
                    className="bg-surface border-border h-8 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="utm-medium" className="text-xs font-medium">
                    UTM Medium
                  </Label>
                  <Input
                    id="utm-medium"
                    value={tempUtmMedium}
                    onChange={(e) => setTempUtmMedium(e.target.value)}
                    placeholder="email"
                    className="bg-surface border-border h-8 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="utm-campaign" className="text-xs font-medium">
                    UTM Campaign
                  </Label>
                  <Input
                    id="utm-campaign"
                    value={tempUtmCampaign}
                    onChange={(e) => setTempUtmCampaign(e.target.value)}
                    placeholder="email"
                    className="bg-surface border-border h-8 text-xs"
                  />
                </div>
              </div>
            )}
          </div>
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
