import { Monitor, Tablet, Smartphone } from "lucide-react";
import type { DeviceType } from "@/types/signature";

interface DeviceToggleProps {
  device: DeviceType;
  onChange: (device: DeviceType) => void;
}

const devices: { type: DeviceType; icon: typeof Monitor; label: string }[] = [
  { type: "desktop", icon: Monitor, label: "Desktop" },
  { type: "tablet", icon: Tablet, label: "Tablet" },
  { type: "mobile", icon: Smartphone, label: "Mobile" },
];

export function DeviceToggle({ device, onChange }: DeviceToggleProps) {
  return (
    <div
      className="inline-flex items-center gap-1 p-1 bg-surface rounded-lg border border-border"
      role="group"
      aria-label="Device preview options"
    >
      {devices.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            device === type
              ? "bg-background text-foreground shadow-subtle"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label={`Preview as ${label}`}
          aria-pressed={device === type}
          type="button"
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
