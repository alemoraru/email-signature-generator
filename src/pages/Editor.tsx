import { useState, useEffect } from "react";
import { SignatureForm } from "@/components/SignatureForm";
import { EmailTemplate } from "@/components/EmailTemplate";
import { DeviceToggle } from "@/components/DeviceToggle";
import { PreviewThemeToggle } from "@/components/PreviewThemeToggle";
import { StyleSelector } from "@/components/StyleSelector";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer.tsx";
import type {
  SignatureData,
  DeviceType,
  PreviewTheme,
} from "@/types/signature";

const defaultData: SignatureData = {
  logo: null,
  logoSize: 48,
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
      useUtm: false,
    },
    {
      id: "2",
      label: "Follow me",
      url: "https://x.com/johndoe",
      provider: "x",
      showIcon: true,
      useUtm: false,
    },
  ],
  colors: {
    primary: "#1e40af",
  },
  style: "modern",
  fontFamily: "system",
};

const Editor = () => {
  const [data, setData] = useState<SignatureData>(defaultData);
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>("light");

  // Warn user before leaving/refreshing if they have made changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Check if data differs from default
      const hasChanges = JSON.stringify(data) !== JSON.stringify(defaultData);

      if (hasChanges) {
        e.preventDefault();
        // Modern browsers require returnValue to be set
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [data]);

  const handleReset = () => {
    setData(defaultData);
  };

  return (
    <div className="min-h-screen lg:h-screen bg-background flex flex-col">
      <Header data={data} onReset={handleReset} />

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 py-3 lg:py-3 flex-1 lg:overflow-hidden">
        <div className="grid lg:grid-cols-[380px_1fr] gap-4 lg:h-full">
          {/* Left Panel - Form */}
          <aside className="flex flex-col lg:h-full lg:min-h-0">
            <div className="bg-card rounded-xl border border-border p-4 shadow-subtle flex flex-col lg:h-full lg:overflow-hidden lg:min-h-0">
              <div className="flex-shrink-0">
                <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Style
                </h2>
                <StyleSelector
                  value={data.style}
                  onChange={(style) => setData({ ...data, style })}
                />
                <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-4 mb-3">
                  Customize
                </h2>
              </div>
              <div className="lg:flex-1 lg:overflow-y-auto lg:scrollbar-subtle lg:pr-3 lg:pl-2 lg:min-h-0">
                <SignatureForm data={data} onChange={setData} />
              </div>
            </div>
          </aside>

          {/* Right Panel - Preview */}
          <section className="flex flex-col lg:h-full min-h-[400px] lg:min-h-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
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

            <div className="bg-surface rounded-xl border border-border p-4 sm:p-6 lg:flex-1 flex items-start justify-center overflow-auto scrollbar-subtle min-h-[300px]">
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

export default Editor;
