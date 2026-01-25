import type { SignatureData, DeviceType } from "@/types/signature";
import { SignaturePreview } from "./SignaturePreview";

interface EmailTemplateProps {
  data: SignatureData;
  device: DeviceType;
}

const deviceWidths: Record<DeviceType, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export function EmailTemplate({ data, device }: EmailTemplateProps) {
  return (
    <div
      className="bg-card rounded-lg shadow-soft overflow-hidden transition-all duration-300 mx-auto"
      style={{ maxWidth: deviceWidths[device], width: "100%" }}
    >
      {/* Email Header */}
      <div className="bg-surface border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-success/60" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-muted-foreground">New Message</span>
          </div>
        </div>
      </div>

      {/* Email Meta */}
      <div className="border-b border-border px-4 py-3 space-y-2 text-sm">
        <div className="flex">
          <span className="text-muted-foreground w-16">To:</span>
          <span className="text-foreground">recipient@example.com</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground w-16">Subject:</span>
          <span className="text-foreground">
            Following up on our conversation
          </span>
        </div>
      </div>

      {/* Email Body */}
      <div className="p-4 sm:p-6 bg-card">
        <div className="space-y-4 text-sm text-foreground leading-relaxed">
          <p>Hi there,</p>
          <p>
            Thank you for taking the time to meet with me today. I really
            enjoyed our conversation about the upcoming project and I'm excited
            about the potential collaboration.
          </p>
          <p>
            I've attached the documents we discussed. Please let me know if you
            have any questions or if there's anything else you need from my end.
          </p>
          <p>Looking forward to hearing from you soon.</p>
          <p>Best regards,</p>
        </div>

        {/* Signature */}
        <div className="mt-6 pt-4 border-t border-border">
          <SignaturePreview data={data} />
        </div>
      </div>
    </div>
  );
}
