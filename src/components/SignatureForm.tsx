import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical, Upload, X } from "lucide-react";
import type { SignatureData, SignatureLink } from "@/types/signature";

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

const colorOptions = [
  { value: "#1a1a1a", label: "Black" },
  { value: "#374151", label: "Gray" },
  { value: "#1e40af", label: "Blue" },
  { value: "#047857", label: "Green" },
  { value: "#7c3aed", label: "Purple" },
  { value: "#dc2626", label: "Red" },
  { value: "#ea580c", label: "Orange" },
];

export function SignatureForm({ data, onChange }: SignatureFormProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [customColor, setCustomColor] = useState("");

  const updateField = <K extends keyof SignatureData>(field: K, value: SignatureData[K]) => {
    onChange({ ...data, [field]: value });
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
    };
    updateField("links", [...data.links, newLink]);
  };

  const updateLink = (id: string, field: keyof Omit<SignatureLink, "id">, value: string) => {
    const updatedLinks = data.links.map((link) =>
      link.id === id ? { ...link, [field]: value } : link
    );
    updateField("links", updatedLinks);
  };

  const removeLink = (id: string) => {
    updateField("links", data.links.filter((link) => link.id !== id));
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
    <div className="space-y-6">
      {/* Logo Upload - Compact */}
      <section className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Logo</h3>
        {data.logo ? (
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg border border-border overflow-hidden bg-surface">
              <img src={data.logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <Button variant="ghost" size="sm" onClick={removeLogo} className="text-muted-foreground hover:text-destructive hover:bg-red-50 dark:hover:bg-red-950/20 h-8 text-xs">
              <X className="w-3 h-3 mr-1" />
              Remove
            </Button>
          </div>
        ) : (
          <label className="flex items-center gap-3 px-3 py-2 border border-dashed border-border rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors bg-surface/50">
            <Upload className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Upload logo</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
          </label>
        )}
      </section>

      {/* Basic Info - Compact grid */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Information</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-xs text-muted-foreground">Name *</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="John Doe"
              className="bg-surface border-border focus:border-accent h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="title" className="text-xs text-muted-foreground">Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Designer"
              className="bg-surface border-border focus:border-accent h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="company" className="text-xs text-muted-foreground">Company</Label>
            <Input
              id="company"
              value={data.company}
              onChange={(e) => updateField("company", e.target.value)}
              placeholder="Acme Inc."
              className="bg-surface border-border focus:border-accent h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="john@acme.com"
              className="bg-surface border-border focus:border-accent h-9"
            />
          </div>
        </div>
      </section>

      {/* Links - Compact */}
      <section className="space-y-3">
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
        <div className="space-y-2">
          {data.links.map((link, index) => (
            <div
              key={link.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-2 p-2 rounded-lg border border-border bg-surface transition-all ${
                draggedIndex === index ? "opacity-50" : ""
              }`}
            >
              <GripVertical className="w-3 h-3 text-muted-foreground cursor-grab flex-shrink-0" />
              <Input
                value={link.label}
                onChange={(e) => updateLink(link.id, "label", e.target.value)}
                placeholder="Label"
                className="flex-1 h-7 text-xs bg-background border-border"
              />
              <Input
                value={link.url}
                onChange={(e) => updateLink(link.id, "url", e.target.value)}
                placeholder="https://..."
                className="flex-[2] h-7 text-xs bg-background border-border"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeLink(link.id)}
                className="text-muted-foreground hover:text-destructive hover:bg-red-50 dark:hover:bg-red-950/20 h-7 w-7"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
          {data.links.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-3">
              No links added yet
            </p>
          )}
        </div>
      </section>

      {/* Single Color Picker */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Accent Color</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              onClick={() => {
                updatePrimaryColor(color.value);
                setCustomColor("");
              }}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                data.colors.primary === color.value
                  ? "border-foreground scale-110"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.label}
            />
          ))}
          <input
            type="color"
            value={data.colors.primary.startsWith("#") ? data.colors.primary : "#1e40af"}
            onChange={(e) => {
              updatePrimaryColor(e.target.value);
              setCustomColor(e.target.value);
            }}
            className="w-7 h-7 rounded cursor-pointer border border-border"
          />
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={customColor}
            onChange={(e) => handleCustomColorChange(e.target.value)}
            placeholder="#hex or rgb(r,g,b)"
            className="h-8 text-xs bg-surface border-border flex-1"
          />
          <div 
            className="w-8 h-8 rounded border border-border flex-shrink-0"
            style={{ backgroundColor: data.colors.primary }}
          />
        </div>
      </section>
    </div>
  );
}
