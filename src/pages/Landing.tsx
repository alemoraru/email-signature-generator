import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EmailTemplate } from "@/components/EmailTemplate";
import { ArrowRight } from "lucide-react";
import type { SignatureData } from "@/types/signature";
import { SiGmail, SiApple, SiThunderbird, SiProtonmail } from "react-icons/si";
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

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Starry background effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(30, 58, 95, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(30, 64, 100, 0.15) 0%, transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(30, 58, 95, 0.2) 0%, transparent 30%)
          `,
        }}
      />

      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
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
      <main className="relative container max-w-7xl mx-auto px-4 sm:px-6 min-h-screen py-12 sm:py-16 lg:py-8 flex items-center">
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
            <div>
              <Link to="/editor">
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90 w-full sm:w-auto"
                >
                  Create Your Signature
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Email Clients */}
            <div className="space-y-3 pt-2">
              <p className="text-xs sm:text-sm text-white/50 font-medium">
                Works with all major email clients
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {emailClients.map((client) => (
                  <div
                    key={client.name}
                    className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <client.icon />
                    <span className="text-xs sm:text-sm">{client.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Mock Email Previews */}
          <div className="relative hidden lg:block h-[420px]">
            <div className="absolute inset-0">
              {/* First Email Mock - Light Theme */}
              <div className="absolute bottom-10 left-15 transform rotate-[-2deg] w-[500px]">
                <EmailTemplate
                  data={sampleSignature1}
                  device="desktop"
                  previewTheme="light"
                  compact
                />
              </div>

              {/* Second Email Mock - Dark Theme */}
              <div className="absolute top-24 left-48 transform rotate-[2deg] w-[500px]">
                <EmailTemplate
                  data={sampleSignature2}
                  device="desktop"
                  previewTheme="dark"
                  compact
                />
              </div>
            </div>
          </div>

          {/* Mobile Preview - Single Email */}
          <div className="lg:hidden max-w-md mx-auto">
            <EmailTemplate
              data={sampleSignature1}
              device="mobile"
              previewTheme="light"
              compact
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
