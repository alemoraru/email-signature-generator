import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SignatureData } from "@/types/signature";
import { renderToStaticMarkup } from "react-dom/server";
import { SignaturePreview } from "./SignaturePreview";

interface CopyButtonProps {
  data: SignatureData;
}

export function CopyButton({ data }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Render the signature to static HTML
      const htmlContent = renderToStaticMarkup(
        <SignaturePreview data={data} forCopy={true} />,
      );

      // Wrap in a div for proper HTML structure
      const fullHtml = `<div>${htmlContent}</div>`;

      // Create blobs for clipboard
      const htmlBlob = new Blob([fullHtml], { type: "text/html" });

      // Create plain text version
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;
      const plainText = tempDiv.innerText || tempDiv.textContent || "";
      const textBlob = new Blob([plainText], { type: "text/plain" });

      // Copy to clipboard with both formats
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": htmlBlob,
          "text/plain": textBlob,
        }),
      ]);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: try copying just HTML
      try {
        const htmlContent = renderToStaticMarkup(
          <SignaturePreview data={data} forCopy={true} />,
        );

        // Use execCommand fallback
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        tempDiv.style.position = "fixed";
        tempDiv.style.left = "-9999px";
        document.body.appendChild(tempDiv);

        const range = document.createRange();
        range.selectNodeContents(tempDiv);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);

        document.execCommand("copy");

        selection?.removeAllRanges();
        document.body.removeChild(tempDiv);

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error("Failed to copy:", fallbackErr);
      }
    }
  };

  return (
    <Button
      onClick={handleCopy}
      className={`gap-2 transition-all ${
        copied
          ? "bg-success hover:bg-success text-success-foreground"
          : "bg-primary hover:bg-primary/90 text-primary-foreground"
      }`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          Copy Signature
        </>
      )}
    </Button>
  );
}
