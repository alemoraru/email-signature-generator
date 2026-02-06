import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SignatureData } from "@/types/signature";
import { getShareUrl } from "@/lib/shareUtils";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
  data: SignatureData;
}

/**
 * ShareButton component allows users to generate a shareable link for their email signature configuration.
 * @param data - The current signature data to be shared.
 */
export function ShareButton({ data }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      const shareUrl = await getShareUrl(data);

      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);

      // Show success feedback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Show toast notification
      toast({
        title: "Share link copied!",
        description: data.logo
          ? "Note: Logo is not included in the share link. Recipients can upload their own."
          : "Anyone with this link can load your signature configuration.",
      });
    } catch (error) {
      console.error("Share failed:", error);

      // Show error toast
      toast({
        title: "Failed to create share link",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleShare}
      className={`gap-2 transition-all ${
        copied
          ? "bg-success hover:bg-success text-success-foreground"
          : "bg-primary hover:bg-primary/90 text-primary-foreground"
      }`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span className="hidden sm:inline">Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </>
      )}
    </Button>
  );
}
