import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EmailTemplate } from "@/components/EmailTemplate";
import { Mail, ArrowRight, Check } from "lucide-react";
import type { SignatureData } from "@/types/signature";

const sampleSignature1: SignatureData = {
  logo: null,
  name: "Sarah Chen",
  title: "Product Designer",
  company: "Acme Design Co.",
  email: "sarah@acmedesign.co",
  links: [
    {
      id: "1",
      label: "LinkedIn",
      url: "https://linkedin.com/in/sarahchen",
      provider: "linkedin",
      showIcon: true,
      useUtm: false,
    },
    {
      id: "2",
      label: "Portfolio",
      url: "https://sarahchen.design",
      provider: "custom",
      showIcon: false,
      useUtm: false,
    },
  ],
  colors: { primary: "#2563eb" },
  style: "modern",
};

const sampleSignature2: SignatureData = {
  logo: null,
  name: "Michael Torres",
  title: "Software Engineer",
  company: "TechFlow Inc.",
  email: "m.torres@techflow.io",
  links: [
    {
      id: "1",
      label: "GitHub",
      url: "https://github.com/mtorres",
      provider: "github",
      showIcon: true,
      useUtm: false,
    },
    {
      id: "2",
      label: "X",
      url: "https://x.com/mtorres",
      provider: "x",
      showIcon: true,
      useUtm: false,
    },
  ],
  colors: { primary: "#059669" },
  style: "classic",
};

// Email client icons as inline SVGs
const GmailIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path d="M22 6L12 13L2 6V4L12 11L22 4V6Z" fill="#EA4335" />
    <path
      d="M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6L12 13L22 6Z"
      fill="#FBBC05"
    />
    <path d="M2 6L12 13V20H4C2.9 20 2 19.1 2 18V6Z" fill="#34A853" />
    <path d="M22 6V18C22 19.1 21.1 20 20 20H12V13L22 6Z" fill="#4285F4" />
  </svg>
);

const OutlookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <path
      d="M22 8.5V17C22 18.1 21.1 19 20 19H8V8L14 5L22 8.5Z"
      fill="#0078D4"
    />
    <path
      d="M8 19H4C2.9 19 2 18.1 2 17V7C2 5.9 2.9 5 4 5H14L8 8V19Z"
      fill="#0364B8"
    />
    <ellipse cx="7" cy="12" rx="3.5" ry="4" fill="#28A8EA" />
  </svg>
);

const AppleMailIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="2" fill="#007AFF" />
    <path d="M2 6L12 13L22 6" stroke="white" strokeWidth="1.5" />
  </svg>
);

const YahooIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#6001D2" />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fill="white"
      fontSize="10"
      fontWeight="bold"
    >
      Y!
    </text>
  </svg>
);

const ThunderbirdIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#0A84FF" />
    <path
      d="M7 10L12 14L17 10"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ProtonMailIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="2" fill="#6D4AFF" />
    <path d="M4 8L12 14L20 8" stroke="white" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.3" />
  </svg>
);

const emailClients = [
  { name: "Gmail", icon: GmailIcon },
  { name: "Outlook", icon: OutlookIcon },
  { name: "Apple Mail", icon: AppleMailIcon },
  { name: "Yahoo Mail", icon: YahooIcon },
  { name: "Thunderbird", icon: ThunderbirdIcon },
  { name: "ProtonMail", icon: ProtonMailIcon },
];

const features = [
  "100% Free Forever",
  "No Account Required",
  "Works Everywhere",
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
      <main className="relative container max-w-7xl mx-auto px-4 sm:px-6 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full py-8">
          {/* Left Column - Marketing Copy */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Create Professional Email Signatures in{" "}
                <span className="text-blue-400">Seconds</span>
              </h1>

              <p className="text-base text-white/60 max-w-lg">
                Design beautiful, responsive email signatures that work with
                every email client. No signup required – just create, copy, and
                paste.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-sm text-white/70">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link to="/editor">
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90"
                >
                  Create Your Signature
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Email Clients */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-white/40 uppercase tracking-wider font-medium">
                Works with all major email clients
              </p>
              <div className="flex flex-wrap gap-2">
                {emailClients.map((client) => (
                  <span
                    key={client.name}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-white/5 text-white/60 border border-white/10"
                  >
                    <client.icon />
                    {client.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Mock Email Previews */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* First Email Mock - Light Theme */}
              <div className="transform rotate-[-2deg] translate-x-4 relative z-10 shadow-2xl">
                <div className="scale-[0.8] origin-top-left">
                  <EmailTemplate
                    data={sampleSignature1}
                    device="desktop"
                    previewTheme="light"
                    compact
                  />
                </div>
              </div>

              {/* Second Email Mock - Dark Theme */}
              <div className="transform rotate-[2deg] -translate-y-24 translate-x-20 relative z-20 shadow-2xl">
                <div className="scale-[0.8] origin-top-left">
                  <EmailTemplate
                    data={sampleSignature2}
                    device="desktop"
                    previewTheme="dark"
                    compact
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Preview - Single Email */}
          <div className="lg:hidden">
            <div className="shadow-2xl rounded-lg overflow-hidden">
              <EmailTemplate
                data={sampleSignature1}
                device="mobile"
                previewTheme="light"
                compact
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
