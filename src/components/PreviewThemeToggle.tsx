import { Sun, Moon } from "lucide-react";
import type { PreviewTheme } from "@/types/signature";

interface PreviewThemeToggleProps {
  theme: PreviewTheme;
  onChange: (theme: PreviewTheme) => void;
}

export function PreviewThemeToggle({
  theme,
  onChange,
}: PreviewThemeToggleProps) {
  return (
    <div
      className="inline-flex items-center gap-1 p-1 bg-surface rounded-lg border border-border"
      role="group"
      aria-label="Preview theme options"
    >
      <button
        onClick={() => onChange("light")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          theme === "light"
            ? "bg-background text-foreground shadow-subtle"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Light theme"
        aria-pressed={theme === "light"}
        type="button"
      >
        <Sun className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">Light</span>
      </button>
      <button
        onClick={() => onChange("dark")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          theme === "dark"
            ? "bg-background text-foreground shadow-subtle"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Dark theme"
        aria-pressed={theme === "dark"}
        type="button"
      >
        <Moon className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">Dark</span>
      </button>
    </div>
  );
}
