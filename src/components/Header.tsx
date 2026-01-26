import { Mail } from "lucide-react";
import { HowToUseDialog } from "@/components/HowToUseDialog";
import { CopyButton } from "@/components/CopyButton";
import type { SignatureData } from "@/types/signature";

interface HeaderProps {
  data: SignatureData;
}

export const Header = ({ data }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 flex-shrink-0">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Mail className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">
              Signature Generator
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <HowToUseDialog />
          <CopyButton data={data} />
        </div>
      </div>
    </header>
  );
};
