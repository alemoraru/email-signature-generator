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
        <ol className="text-sm text-muted-foreground space-y-3 list-decimal list-inside mt-4">
          <li>
            <span className="text-foreground font-medium">
              Fill in your details
            </span>
            <p className="text-xs mt-1 ml-4">
              Add your name, title, company, email, and optionally upload a
              logo.
            </p>
          </li>
          <li>
            <span className="text-foreground font-medium">
              Add and customize links
            </span>
            <p className="text-xs mt-1 ml-4">
              Add relevant links (LinkedIn, website, etc.), then click the edit
              icon to customize the URL, label, and icon display. Drag links to
              reorder them.
            </p>
          </li>
          <li>
            <span className="text-foreground font-medium">
              Pick an accent color and font style
            </span>
            <p className="text-xs mt-1 ml-4">
              Choose a color for email and links, or enter a custom hex/rgb
              value. Select one of the available font styles, or keep the
              default.
            </p>
          </li>
          <li>
            <span className="text-foreground font-medium">
              Preview on different devices & themes
            </span>
            <p className="text-xs mt-1 ml-4">
              Toggle between desktop, tablet, and mobile views to see how it
              looks. Also switch between light and dark themes to ensure
              readability.
            </p>
          </li>
          <li>
            <span className="text-foreground font-medium">Copy and paste</span>
            <p className="text-xs mt-1 ml-4">
              Click "Copy Signature" and paste it into your email client's
              signature settings (e.g., Gmail, Outlook, etc.).
            </p>
          </li>
        </ol>
      </DialogContent>
    </Dialog>
  );
}
