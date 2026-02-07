import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function HowToUseDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 h-8 gap-2"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden sm:inline">How to use</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How to use Email Signature Generator?</DialogTitle>
        </DialogHeader>
        <ol className="text-sm text-muted-foreground space-y-2.5 list-decimal list-inside mt-4">
          <li>
            <span className="text-foreground font-medium">
              Choose a signature style
            </span>
            <p className="text-xs mt-0.5 ml-4">
              Select from 6 styles: Classic, Modern, Minimal, Compact,
              Professional, or Bold.
            </p>
          </li>
          <li>
            <span className="text-foreground font-medium">
              Fill in your details
            </span>
            <p className="text-xs mt-0.5 ml-4">
              Add name, title, company, email, and phone (optional). Upload a
              logo and adjust its size. Real-time validation helps catch errors.
            </p>
          </li>
          <li>
            <span className="text-foreground font-medium">
              Add links & call-to-action
            </span>
            <p className="text-xs mt-0.5 ml-4">
              Add social links (LinkedIn, X, etc.) with UTM tracking. Enable a
              CTA button for meetings or portfolio links. Drag to reorder.
            </p>
          </li>
          <li>
            <span className="text-foreground font-medium">
              Customize appearance
            </span>
            <p className="text-xs mt-0.5 ml-4">
              Pick font style, accent color (preset or custom hex/rgb), and
              spacing (Compact, Normal, or Relaxed).
            </p>
          </li>
          <li>
            <span className="text-foreground font-medium">Preview & test</span>
            <p className="text-xs mt-0.5 ml-4">
              Toggle between desktop/tablet/mobile views and light/dark themes
              to ensure readability across devices.
            </p>
          </li>
          <li>
            <span className="text-foreground font-medium">Share & copy</span>
            <p className="text-xs mt-0.5 ml-4">
              Generate a shareable link for teams or copy the signature to paste
              into your email client (Gmail, Outlook, etc.).
            </p>
          </li>
        </ol>
      </DialogContent>
    </Dialog>
  );
}
