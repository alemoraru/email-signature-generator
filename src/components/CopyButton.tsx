import { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SignatureData } from "@/types/signature";
import { SignaturePreview } from "./SignaturePreview";
import { createRoot } from "react-dom/client";

interface CopyButtonProps {
  data: SignatureData;
}

export function CopyButton({ data }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    // Create a temporary container to render the signature
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    document.body.appendChild(tempContainer);

    // Render the signature component
    const root = createRoot(tempContainer);
    root.render(<SignaturePreview data={data} forCopy={true} />);

    // Wait for render
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      // Get the HTML content
      const htmlContent = tempContainer.innerHTML;

      // Create a blob with HTML content
      const blob = new Blob([htmlContent], { type: "text/html" });
      const textBlob = new Blob([tempContainer.innerText], { type: "text/plain" });

      // Copy to clipboard with both formats
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blob,
          "text/plain": textBlob,
        }),
      ]);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback: copy as plain text
      try {
        await navigator.clipboard.writeText(tempContainer.innerText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error("Failed to copy:", fallbackErr);
      }
    } finally {
      // Cleanup
      root.unmount();
      document.body.removeChild(tempContainer);
    }
  };

  return (
    <>
      <div ref={containerRef} style={{ display: "none" }}>
        <SignaturePreview data={data} />
      </div>
      <Button
        onClick={handleCopy}
        className={`gap-2 transition-all h-8 ${
          copied
            ? "bg-success hover:bg-success text-success-foreground"
            : "bg-neutral-800 hover:bg-neutral-700 text-white dark:bg-neutral-700 dark:hover:bg-neutral-600"
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
    </>
  );
}
