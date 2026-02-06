import { ArrowLeft, Mail } from "lucide-react";
import { HowToUseDialog } from "@/components/HowToUseDialog";
import { ShareButton } from "@/components/ShareButton";
import { CopyButton } from "@/components/CopyButton";
import type { SignatureData } from "@/types/signature";
import { Link } from "react-router-dom";

interface HeaderProps {
  data: SignatureData;
  onReset: () => void;
}

export const Header = ({ data, onReset }: HeaderProps) => {
  const handleLogoClick = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the signature? All changes that you made will be lost if you proceed.",
      )
    ) {
      onReset();
    }
  };

  return (
    <header
      className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 flex-shrink-0"
      role="banner"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
        {/* LEFT PART */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Back</span>
          </Link>

          <div className="w-px h-5 bg-border" />

          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer group"
            aria-label="Reset signature to default values"
            type="button"
          >
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail
                className="w-3.5 h-3.5 text-primary-foreground"
                aria-hidden="true"
              />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground">
                Signature Generator
              </h1>
            </div>
          </button>
        </div>

        {/* RIGHT PART */}
        <nav
          className="flex items-center gap-2"
          role="navigation"
          aria-label="Header actions"
        >
          <HowToUseDialog />
          <ShareButton data={data} />
          <CopyButton data={data} />
        </nav>
      </div>
    </header>
  );
};
