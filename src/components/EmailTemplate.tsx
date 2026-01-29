import type {
  SignatureData,
  DeviceType,
  PreviewTheme,
} from "@/types/signature";
import { SignaturePreview } from "./SignaturePreview";

interface EmailTemplateProps {
  data: SignatureData;
  device: DeviceType;
  previewTheme: PreviewTheme;
  compact?: boolean;
}

const deviceWidths: Record<DeviceType, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export function EmailTemplate({
  data,
  device,
  previewTheme,
  compact = false,
}: EmailTemplateProps) {
  const isDark = previewTheme === "dark";

  return (
    <div
      className="rounded-lg shadow-soft overflow-hidden transition-all duration-300 mx-auto"
      style={{
        maxWidth: deviceWidths[device],
        width: "100%",
        backgroundColor: isDark ? "#1f2937" : "hsl(var(--card))",
      }}
    >
      {/* Email Header */}
      <div
        className="border-b px-4 py-3"
        style={{
          backgroundColor: isDark ? "#111827" : "hsl(var(--surface))",
          borderColor: isDark ? "#374151" : "hsl(var(--border))",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: isDark
                  ? "#ef4444"
                  : "hsl(var(--destructive) / 0.6)",
              }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: isDark ? "#eab308" : "rgba(250, 204, 21, 0.6)",
              }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: isDark
                  ? "#22c55e"
                  : "hsl(var(--success) / 0.6)",
              }}
            />
          </div>
          <div className="flex-1 text-center">
            <span
              className="text-xs"
              style={{
                color: isDark ? "#9ca3af" : "hsl(var(--muted-foreground))",
              }}
            >
              New Message
            </span>
          </div>
        </div>
      </div>

      {/* Email Meta */}
      <div
        className="border-b px-4 py-3 space-y-2 text-sm"
        style={{ borderColor: isDark ? "#374151" : "hsl(var(--border))" }}
      >
        <div className="flex">
          <span
            style={{
              color: isDark ? "#9ca3af" : "hsl(var(--muted-foreground))",
              width: "64px",
            }}
          >
            To:
          </span>
          <span
            style={{ color: isDark ? "#f3f4f6" : "hsl(var(--foreground))" }}
          >
            recipient@example.com
          </span>
        </div>
        <div className="flex">
          <span
            style={{
              color: isDark ? "#9ca3af" : "hsl(var(--muted-foreground))",
              width: "64px",
            }}
          >
            Subject:
          </span>
          <span
            style={{ color: isDark ? "#f3f4f6" : "hsl(var(--foreground))" }}
          >
            Following up on our conversation
          </span>
        </div>
      </div>

      {/* Email Body */}
      <div
        className="p-4 sm:p-6"
        style={{ backgroundColor: isDark ? "#1f2937" : "hsl(var(--card))" }}
      >
        {compact ? (
          <div className="space-y-3 mb-6">
            <div
              className="h-3 rounded-full w-16"
              style={{
                backgroundColor: isDark ? "#374151" : "hsl(var(--muted))",
              }}
            />
            <div
              className="h-3 rounded-full w-full"
              style={{
                backgroundColor: isDark ? "#374151" : "hsl(var(--muted))",
              }}
            />
            <div
              className="h-3 rounded-full w-5/6"
              style={{
                backgroundColor: isDark ? "#374151" : "hsl(var(--muted))",
              }}
            />
            <div
              className="h-3 rounded-full w-4/6"
              style={{
                backgroundColor: isDark ? "#374151" : "hsl(var(--muted))",
              }}
            />
            <div className="h-3" />
            <div
              className="h-3 rounded-full w-24"
              style={{
                backgroundColor: isDark ? "#374151" : "hsl(var(--muted))",
              }}
            />
          </div>
        ) : (
          <div
            className="space-y-4 text-sm leading-relaxed"
            style={{ color: isDark ? "#f3f4f6" : "hsl(var(--foreground))" }}
          >
            <p>Hi there,</p>
            <p>
              Thank you for taking the time to meet with me today. I really
              enjoyed our conversation about the upcoming project and I'm
              excited about the potential collaboration.
            </p>
            <p>
              I've attached the documents we discussed. Please let me know if
              you have any questions or if there's anything else you need from
              my end.
            </p>
            <p>Looking forward to hearing from you soon.</p>
            <p>Best regards,</p>
          </div>
        )}

        {/* Signature */}
        <div
          className="mt-6 pt-4 border-t"
          style={{ borderColor: isDark ? "#374151" : "hsl(var(--border))" }}
        >
          <SignaturePreview data={data} previewTheme={previewTheme} />
        </div>
      </div>
    </div>
  );
}
