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
          <DialogTitle>How to use</DialogTitle>
        </DialogHeader>
        <ol className="text-sm text-muted-foreground space-y-3 list-decimal list-inside mt-4">
          <li>
            <span className="text-foreground font-medium">
              Fill in your details
            </span>
            <p className="text-xs mt-1 ml-5">
              Add your name, title, company, email, and optionally upload a
              logo.
            </p>
          </li>
          <li>
            <span className="text-foreground font-medium">
              Add and reorder links
            </span>
            <p className="text-xs mt-1 ml-5">
              Add relevant links (LinkedIn, website, etc.) and drag to reorder
              them.
            </p>
          </li>
          <li>
            <span className="text-foreground font-medium">
              Pick an accent color
            </span>
            <p className="text-xs mt-1 ml-5">
              Choose a color for email and links, or enter a custom hex/rgb
              value.
            </p>
          </li>
          <li>
            <span className="text-foreground font-medium">
              Preview on different devices
            </span>
            <p className="text-xs mt-1 ml-5">
              Toggle between desktop, tablet, and mobile views to see how it
              looks.
            </p>
          </li>
          <li>
            <span className="text-foreground font-medium">Copy and paste</span>
            <p className="text-xs mt-1 ml-5">
              Click "Copy Signature" and paste it into your email client's
              signature settings.
            </p>
          </li>
        </ol>
      </DialogContent>
    </Dialog>
  );
}
