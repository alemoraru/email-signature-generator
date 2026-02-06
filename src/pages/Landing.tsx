import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EmailTemplate } from "@/components/EmailTemplate";
import { EmailClientBadge } from "@/components/EmailClientBadge";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { SignatureData, SignatureStyle } from "@/types/signature";
import {
  SiGmail,
  SiApple,
  SiThunderbird,
  SiProtonmail,
  SiGithub,
} from "react-icons/si";
import { FaYahoo } from "react-icons/fa6";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";

const sampleSignature1: SignatureData = {
  logo: null,
  logoSize: 100,
  name: "John Doe",
  title: "Product Designer",
  company: "Acme Design Co.",
  email: "johndoe@acmedesign.co",
  links: [
    {
      id: "1",
      label: "LinkedIn",
      url: "https://linkedin.com/in/johndoe",
      provider: "linkedin",
      showIcon: true,
      useUtm: false,
    },
    {
      id: "2",
      label: "Portfolio",
      url: "https://johndoe.design",
      provider: "website",
      showIcon: true,
      useUtm: false,
    },
  ],
  colors: { primary: "#2563eb" },
  style: "modern",
  fontFamily: "system",
};

const sampleSignature2: SignatureData = {
  logo: null,
  logoSize: 100,
  name: "Joanna Doe",
  title: "Software Engineer",
  company: "TechFlow Inc.",
  email: "joanna.doe@techflow.io",
  links: [
    {
      id: "1",
      label: "GitHub",
      url: "https://github.com/joannadoe",
      provider: "github",
      showIcon: true,
      useUtm: false,
    },
    {
      id: "2",
      label: "joanna on X",
      url: "https://x.com/joannadoe",
      provider: "x",
      showIcon: true,
      useUtm: false,
    },
  ],
  colors: { primary: "#059669" },
  style: "classic",
  fontFamily: "system",
};

// Email client icons using react-icons with brand colors
const GmailIcon = () => <SiGmail className="w-4 h-4" color="#EA4335" />;
const OutlookIcon = () => (
  <PiMicrosoftOutlookLogoFill className="w-4 h-4" color="#0078D4" />
);
const AppleMailIcon = () => <SiApple className="w-4 h-4" color="#555555" />;
const YahooIcon = () => <FaYahoo className="w-4 h-4" color="#5F01D1" />;
const ThunderbirdIcon = () => (
  <SiThunderbird className="w-4 h-4" color="#0A84FF" />
);
const ProtonMailIcon = () => (
  <SiProtonmail className="w-4 h-4" color="#6D4AFF" />
);

const emailClients = [
  { name: "Gmail", icon: GmailIcon },
  { name: "Outlook", icon: OutlookIcon },
  { name: "ProtonMail", icon: ProtonMailIcon },
  { name: "Apple Mail", icon: AppleMailIcon },
  { name: "Yahoo Mail", icon: YahooIcon },
  { name: "Thunderbird", icon: ThunderbirdIcon },
];

const availableStyles: SignatureStyle[] = [
  "classic",
  "modern",
  "minimal",
  "compact",
  "professional",
  "bold",
];

const Landing = () => {
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);

  useEffect(() => {
    // Set body background to match landing page
    document.body.style.backgroundColor = "#0a1628";

    // Cleanup: reset to default when component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  // Auto-cycle through styles every 8 seconds (desktop only)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStyleIndex((prev) => (prev + 1) % availableStyles.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Handle manual style cycling
  const handleNextStyle = () => {
    setCurrentStyleIndex((prev) => (prev + 1) % availableStyles.length);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] relative flex flex-col">
      {/* Starry background effect */}
      <div
        className="fixed inset-0 pointer-events-none bg-[#0a1628]"
        style={{
          background: `
            #0a1628,
            radial-gradient(ellipse at 50% 0%, rgba(30, 58, 95, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(30, 64, 100, 0.15) 0%, transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(30, 58, 95, 0.2) 0%, transparent 30%)
          `,
        }}
      />

      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden bg-[#0a1628]">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 sm:px-6 flex-1 py-12 sm:py-16 lg:py-8 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center w-full">
          {/* Left Column - Marketing Copy */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Create Professional Email Signatures in{" "}
                <span className="text-blue-400">Seconds</span>
              </h1>

              <p className="text-base sm:text-lg text-white/70 max-w-lg leading-relaxed">
                Design beautiful, responsive email signatures that work with
                every email client. No signup required. Just create, copy, and
                paste. Free forever.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link to="/editor">
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90 w-full sm:w-auto"
                >
                  Create Your Signature
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              {/* Rolling Style Indicator - Clickable */}
              <button
                onClick={handleNextStyle}
                className="hidden sm:flex items-center gap-2 px-4 h-11 bg-white/8 border border-white/15 rounded-lg hover:bg-white/12 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-400/10 transition-all cursor-pointer group"
              >
                <span className="text-xs text-white/50 font-medium">
                  Signature Style:
                </span>
                <div className="relative h-5 overflow-hidden min-w-[80px]">
                  <div
                    key={currentStyleIndex}
                    className="animate-roll-up text-sm font-semibold text-blue-400 capitalize"
                  >
                    {availableStyles[currentStyleIndex]}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-blue-400/70 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>

            {/* Email Clients */}
            <div className="space-y-3 pt-2">
              <p className="text-xs sm:text-sm text-white/50 font-medium">
                Works with all major email clients
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {emailClients.map((client) => (
                  <EmailClientBadge
                    key={client.name}
                    name={client.name}
                    icon={client.icon}
                  />
                ))}
              </div>
            </div>

            {/* GitHub Link */}
            <div className="pt-2 space-y-1">
              <p className="text-sm text-white/50">
                Want to customize this even more?
              </p>
              <a
                href="https://github.com/alemoraru/email-signature-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white/90 transition-colors group"
              >
                <SiGithub className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>
                  Check the source code on GitHub{" "}
                  <span className="text-white/50">@alemoraru</span>
                </span>
              </a>
            </div>
          </div>

          {/* Right Column - Mock Email Previews */}
          <div className="relative hidden lg:block h-[420px]">
            <div className="absolute inset-0">
              {/* First Email Mock - Light Theme */}
              <div className="absolute bottom-10 left-15 transform rotate-[-2deg] w-[500px] transition-opacity duration-500">
                <EmailTemplate
                  data={{
                    ...sampleSignature1,
                    style: availableStyles[currentStyleIndex],
                  }}
                  device="desktop"
                  previewTheme="light"
                  compact
                />
              </div>

              {/* Second Email Mock - Dark Theme */}
              <div className="absolute top-24 left-48 transform rotate-[2deg] w-[500px] transition-opacity duration-500">
                <EmailTemplate
                  data={{
                    ...sampleSignature2,
                    style: availableStyles[currentStyleIndex],
                  }}
                  device="desktop"
                  previewTheme="dark"
                  compact
                />
              </div>
            </div>
          </div>

          {/* Mobile Preview - Two Emails */}
          <div className="lg:hidden max-w-md mx-auto space-y-6">
            <EmailTemplate
              data={sampleSignature1}
              device="mobile"
              previewTheme="light"
              compact
            />
            <EmailTemplate
              data={sampleSignature2}
              device="mobile"
              previewTheme="dark"
              compact
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
