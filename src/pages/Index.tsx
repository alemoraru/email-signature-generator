import { useState } from "react";
import { SignatureForm } from "@/components/SignatureForm";
import { EmailTemplate } from "@/components/EmailTemplate";
import { DeviceToggle } from "@/components/DeviceToggle";
import { PreviewThemeToggle } from "@/components/PreviewThemeToggle";
import { CopyButton } from "@/components/CopyButton";
import { HowToUseDialog } from "@/components/HowToUseDialog";
import { StyleSelector } from "@/components/StyleSelector";
import type {
  SignatureData,
  DeviceType,
  PreviewTheme,
} from "@/types/signature";
import { Mail } from "lucide-react";
import { Footer } from "@/components/Footer.tsx";

const defaultData: SignatureData = {
  logo: null,
  name: "John Doe",
  title: "Product Designer",
  company: "Acme Inc.",
  email: "john@acme.com",
  links: [
    {
      id: "1",
      label: "Connect with me",
      url: "https://linkedin.com/in/johndoe",
      provider: "linkedin",
      showIcon: true,
    },
    {
      id: "2",
      label: "Follow me",
      url: "https://x.com/johndoe",
      provider: "x",
      showIcon: true,
    },
  ],
  colors: {
    primary: "#1e40af",
  },
  style: "classic",
};

const Index = () => {
  const [data, setData] = useState<SignatureData>(defaultData);
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>("light");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Mail className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground">
                Signature
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <HowToUseDialog />
            <CopyButton data={data} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 py-4 lg:py-5">
        <div className="grid lg:grid-cols-[400px_1fr] gap-5 lg:items-stretch">
          {/* Left Panel - Form */}
          <aside className="flex flex-col">
            <div className="bg-card rounded-xl border border-border p-5 shadow-subtle flex-1 flex flex-col">
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Style
              </h2>
              <StyleSelector
                value={data.style}
                onChange={(style) => setData({ ...data, style })}
              />
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-5 mb-4">
                Customize
              </h2>
              <div className="flex-1">
                <SignatureForm data={data} onChange={setData} />
              </div>
            </div>
          </aside>

          {/* Right Panel - Preview */}
          <section className="flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Preview
              </h2>
              <div className="flex items-center gap-2">
                <PreviewThemeToggle
                  theme={previewTheme}
                  onChange={setPreviewTheme}
                />
                <DeviceToggle device={device} onChange={setDevice} />
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-border p-4 sm:p-6 flex-1 flex items-start justify-center overflow-x-auto">
              <EmailTemplate
                data={data}
                device={device}
                previewTheme={previewTheme}
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
