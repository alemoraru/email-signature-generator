import { useState } from "react";
import type { SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload, X, AlertCircle } from "lucide-react";
import { SocialLinkEditor } from "@/components/SocialLinkEditor";
import type {
  SignatureData,
  SignatureLink,
  FontFamily,
} from "@/types/signature";
import { cn } from "@/lib/utils.ts";
import { validateEmail, validatePhone, validateUrl } from "@/lib/validation";

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SetStateAction<SignatureData>) => void;
}

const colorOptions = [
  { value: "#1a1a1a", label: "Black" },
  { value: "#374151", label: "Gray" },
  { value: "#1e40af", label: "Blue" },
  { value: "#047857", label: "Green" },
  { value: "#7c3aed", label: "Purple" },
  { value: "#dc2626", label: "Red" },
  { value: "#ea580c", label: "Orange" },
  { value: "#eba937", label: "Yellow" },
  { value: "#ffffff", label: "White" },
  { value: "#db2777", label: "Pink" },
  { value: "#a0522d", label: "Brown" },
  { value: "#c026d3", label: "Fuchsia" },
  { value: "#14b8a6", label: "Teal" },
];

const fontOptions: { value: FontFamily; label: string }[] = [
  { value: "system", label: "System Default" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Monospace" },
  { value: "georgia", label: "Georgia" },
  { value: "times", label: "Times New Roman" },
];

export function SignatureForm({ data, onChange }: SignatureFormProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [customColor, setCustomColor] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [ctaUrlError, setCtaUrlError] = useState<string | undefined>();

  const updateField = <K extends keyof SignatureData>(
    field: K,
    value: SignatureData[K],
  ) => {
    onChange({ ...data, [field]: value });
  };

  const handleEmailChange = (value: string) => {
    updateField("email", value);
    const validation = validateEmail(value);
    setEmailError(validation.message);
  };

  const handlePhoneChange = (value: string) => {
    updateField("phone", value);
    const validation = validatePhone(value);
    setPhoneError(validation.message);
  };

  const handleCtaUrlChange = (value: string) => {
    if (data.cta) {
      updateField("cta", { ...data.cta, url: value });
      const validation = validateUrl(value);
      setCtaUrlError(validation.message);
    }
  };

  const updatePrimaryColor = (value: string) => {
    onChange({ ...data, colors: { primary: value } });
  };

  const handleCustomColorChange = (value: string) => {
    setCustomColor(value);
    // Validate hex or rgb format
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const rgbRegex = /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/;
    if (hexRegex.test(value) || rgbRegex.test(value)) {
      updatePrimaryColor(value);
    }
  };

  const addLink = () => {
    const newLink: SignatureLink = {
      id: crypto.randomUUID(),
      label: "",
      url: "",
      provider: "custom",
      showIcon: false,
      useUtm: false,
    };
    updateField("links", [...data.links, newLink]);
  };

  const updateLink = (
    id: string,
    field: keyof Omit<SignatureLink, "id">,
    value: string | boolean,
  ) => {
    onChange((prevData) => ({
      ...prevData,
      links: prevData.links.map((link) =>
        link.id === id ? { ...link, [field]: value } : link,
      ),
    }));
  };

  const updateLinkBulk = (
    id: string,
    updates: Partial<Omit<SignatureLink, "id">>,
  ) => {
    onChange((prevData) => ({
      ...prevData,
      links: prevData.links.map((link) =>
        link.id === id ? { ...link, ...updates } : link,
      ),
    }));
  };

  const removeLink = (id: string) => {
    updateField(
      "links",
      data.links.filter((link) => link.id !== id),
    );
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newLinks = [...data.links];
    const draggedItem = newLinks[draggedIndex];
    newLinks.splice(draggedIndex, 1);
    newLinks.splice(index, 0, draggedItem);
    updateField("links", newLinks);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateField("logo", event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    updateField("logo", null);
  };

  return (
    <div className="space-y-4">
      {/* Logo Upload - Compact */}
      <section className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Logo</h3>
        {data.logo ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg border border-border overflow-hidden bg-surface">
                <img
                  src={data.logo}
                  alt="Company logo preview"
                  className="w-full h-full object-contain"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeLogo}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 text-xs"
                aria-label="Remove logo"
              >
                <X className="w-3 h-3 mr-1" aria-hidden="true" />
                Remove
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="logo-size"
                  className="text-xs text-muted-foreground"
                >
                  Logo Size
                </Label>
                <span
                  className="text-xs text-muted-foreground font-mono"
                  aria-live="polite"
                >
                  {data.logoSize}px
                </span>
              </div>
              <Slider
                id="logo-size"
                value={[data.logoSize]}
                onValueChange={(value) => updateField("logoSize", value[0])}
                min={32}
                max={80}
                step={2}
                className="w-full"
                aria-label="Logo size in pixels"
              />
            </div>
          </div>
        ) : (
          <label
            className={cn(
              "flex items-center gap-3 px-3 py-2 border border-dashed border-border",
              "rounded-lg cursor-pointer hover:border-accent/50 transition-colors bg-surface/50",
              "focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2",
            )}
            tabIndex={0}
            role="button"
            aria-label="Upload company logo"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.currentTarget.querySelector("input")?.click();
              }
            }}
          >
            <Upload
              className="w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-sm text-muted-foreground">Upload logo</span>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleLogoUpload}
              aria-label="Logo file input"
            />
          </label>
        )}
      </section>

      {/* Basic Info - Compact grid */}
      <section className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Information</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-xs text-muted-foreground">
              Name *
            </Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="John Doe"
              className="bg-surface border-border focus:border-accent h-9"
              aria-required="true"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="title" className="text-xs text-muted-foreground">
              Title
            </Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Designer"
              className="bg-surface border-border focus:border-accent h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="company" className="text-xs text-muted-foreground">
              Company
            </Label>
            <Input
              id="company"
              value={data.company}
              onChange={(e) => updateField("company", e.target.value)}
              placeholder="Acme Inc."
              className="bg-surface border-border focus:border-accent h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="text-xs text-muted-foreground">
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="john@acme.com"
                className={cn(
                  "bg-surface border-border focus:border-accent h-9",
                  emailError &&
                    "border-destructive focus:border-destructive pr-8",
                )}
                aria-label="Email address"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
              />
              {emailError && (
                <AlertCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
              )}
            </div>
            {emailError && (
              <p
                id="email-error"
                className="text-xs text-destructive flex items-center gap-1 mt-1"
              >
                {emailError}
              </p>
            )}
          </div>
          <div className="space-y-1 col-span-2">
            <Label htmlFor="phone" className="text-xs text-muted-foreground">
              Phone (optional)
            </Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                value={data.phone || ""}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className={cn(
                  "bg-surface border-border focus:border-accent h-9",
                  phoneError &&
                    "border-destructive focus:border-destructive pr-8",
                )}
                aria-label="Phone number"
                aria-invalid={!!phoneError}
                aria-describedby={phoneError ? "phone-error" : undefined}
              />
              {phoneError && (
                <AlertCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
              )}
            </div>
            {phoneError && (
              <p
                id="phone-error"
                className="text-xs text-destructive flex items-center gap-1 mt-1"
              >
                {phoneError}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Links - Compact */}
      <section className="space-y-2 overflow-visible">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Links</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={addLink}
            className="text-accent hover:text-accent hover:bg-accent/10 h-7 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Link
          </Button>
        </div>
        <div className="space-y-2 overflow-visible">
          {data.links.map((link, index) => (
            <SocialLinkEditor
              key={link.id}
              link={link}
              index={index}
              draggedIndex={draggedIndex}
              onUpdate={updateLink}
              onUpdateBulk={updateLinkBulk}
              onRemove={removeLink}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            />
          ))}
          {data.links.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-3">
              No links added yet
            </p>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">
            Call-to-Action Button
          </h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.cta?.enabled || false}
              onChange={(e) =>
                updateField("cta", {
                  enabled: e.target.checked,
                  text: data.cta?.text || "Book a Meeting",
                  url: data.cta?.url || "",
                })
              }
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent focus:ring-offset-0"
              aria-label="Enable call-to-action button"
            />
            <span className="text-xs text-muted-foreground">Enable</span>
          </label>
        </div>
        <div
          className={cn(
            "space-y-2 p-3 rounded-lg border border-border/30 bg-surface/50 transition-opacity",
            !data.cta?.enabled && "opacity-50",
          )}
        >
          <div className="space-y-1">
            <Label htmlFor="cta-text" className="text-xs text-muted-foreground">
              Button Text
            </Label>
            <Input
              id="cta-text"
              value={data.cta?.text || ""}
              onChange={(e) =>
                updateField("cta", {
                  enabled: data.cta?.enabled || false,
                  text: e.target.value,
                  url: data.cta?.url || "",
                })
              }
              placeholder="Book a Meeting"
              className="bg-surface border-border focus:border-accent h-9"
              aria-label="Call-to-action button text"
              disabled={!data.cta?.enabled}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="cta-url" className="text-xs text-muted-foreground">
              Button URL
            </Label>
            <div className="relative">
              <Input
                id="cta-url"
                type="url"
                value={data.cta?.url || ""}
                onChange={(e) => handleCtaUrlChange(e.target.value)}
                placeholder="https://calendly.com/your-link"
                className={cn(
                  "bg-surface border-border focus:border-accent h-9",
                  ctaUrlError &&
                    data.cta?.enabled &&
                    "border-destructive focus:border-destructive pr-8",
                )}
                aria-label="Call-to-action button URL"
                aria-invalid={!!(ctaUrlError && data.cta?.enabled)}
                aria-describedby={
                  ctaUrlError && data.cta?.enabled ? "cta-url-error" : undefined
                }
                disabled={!data.cta?.enabled}
              />
              {ctaUrlError && data.cta?.enabled && (
                <AlertCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
              )}
            </div>
            {ctaUrlError && data.cta?.enabled && (
              <p
                id="cta-url-error"
                className="text-xs text-destructive flex items-center gap-1 mt-1"
              >
                {ctaUrlError}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Font Family Selector */}
      <section className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Font</h3>
        <Select
          value={data.fontFamily}
          onValueChange={(value: FontFamily) =>
            updateField("fontFamily", value)
          }
        >
          <SelectTrigger className="bg-surface border-border h-9 hover:border-accent/50 hover:bg-accent/5 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map((font) => (
              <SelectItem
                key={font.value}
                value={font.value}
                className="cursor-pointer focus:bg-accent/10 focus:text-accent"
              >
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Single Color Picker */}
      <section className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Accent Color</h3>
        <div className="p-2 rounded-lg border border-border/30">
          <TooltipProvider>
            <div className="flex items-center gap-2 flex-wrap">
              {colorOptions.map((color) => (
                <Tooltip key={color.value}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        updatePrimaryColor(color.value);
                        setCustomColor("");
                      }}
                      className={`w-7 h-7 rounded-full transition-all ${
                        data.colors.primary === color.value
                          ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110"
                          : "border border-border/40 hover:scale-105 hover:border-border"
                      }`}
                      style={{ backgroundColor: color.value }}
                      aria-label={`Select ${color.label} color`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{color.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
              <Tooltip>
                <TooltipTrigger asChild>
                  <input
                    type="color"
                    value={
                      data.colors.primary.startsWith("#")
                        ? data.colors.primary
                        : "#1e40af"
                    }
                    onChange={(e) => {
                      updatePrimaryColor(e.target.value);
                      setCustomColor(e.target.value);
                    }}
                    className="w-7 h-7 rounded cursor-pointer border border-border"
                    aria-label="Custom color picker"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Custom color</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={customColor}
            onChange={(e) => handleCustomColorChange(e.target.value)}
            placeholder="#hex or rgb(r,g,b)"
            className="h-8 text-xs bg-surface border-border flex-1"
            aria-label="Custom color value"
          />
          <div
            className="w-8 h-8 rounded border border-border flex-shrink-0"
            style={{ backgroundColor: data.colors.primary }}
            aria-label="Color preview"
            role="img"
          />
        </div>
      </section>

      {/* Spacing Controls */}
      <section className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Spacing</h3>
        <Select
          value={data.spacing}
          onValueChange={(value: "compact" | "normal" | "relaxed") =>
            updateField("spacing", value)
          }
        >
          <SelectTrigger className="bg-surface border-border h-9 hover:border-accent/50 hover:bg-accent/5 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="compact"
              className="cursor-pointer focus:bg-accent/10 focus:text-accent"
            >
              Compact
            </SelectItem>
            <SelectItem
              value="normal"
              className="cursor-pointer focus:bg-accent/10 focus:text-accent"
            >
              Normal
            </SelectItem>
            <SelectItem
              value="relaxed"
              className="cursor-pointer focus:bg-accent/10 focus:text-accent"
            >
              Relaxed
            </SelectItem>
          </SelectContent>
        </Select>
      </section>
    </div>
  );
}
