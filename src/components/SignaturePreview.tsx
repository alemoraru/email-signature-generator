import type { SignatureData, PreviewTheme } from "@/types/signature";
import {
  ClassicSignature,
  ModernSignature,
  MinimalSignature,
  CompactSignature,
  ProfessionalSignature,
  BoldSignature,
  fontFamilyMap,
} from "./signature";

interface SignaturePreviewProps {
  data: SignatureData;
  forCopy?: boolean;
  previewTheme?: PreviewTheme;
}

export function SignaturePreview({
  data,
  forCopy = false,
  previewTheme = "light",
}: SignaturePreviewProps) {
  const isDark = !forCopy && previewTheme === "dark";
  const primaryColor = data.colors.primary;
  const textColor = isDark ? "#f3f4f6" : "#1a1a1a";
  const mutedColor = isDark ? "#9ca3af" : "#6b7280";
  const fontFamily = fontFamilyMap[data.fontFamily] || fontFamilyMap.system;
  const logoSize = data.logoSize || 48;

  const signatureProps = {
    data,
    primaryColor,
    textColor,
    mutedColor,
    isDark,
    fontFamily,
    logoSize,
  };

  // Render the appropriate signature style
  switch (data.style) {
    case "classic":
      return <ClassicSignature {...signatureProps} />;
    case "modern":
      return <ModernSignature {...signatureProps} />;
    case "minimal":
      return <MinimalSignature {...signatureProps} />;
    case "compact":
      return <CompactSignature {...signatureProps} />;
    case "professional":
      return <ProfessionalSignature {...signatureProps} />;
    case "bold":
      return <BoldSignature {...signatureProps} />;
    default:
      return <ClassicSignature {...signatureProps} />;
  }
}
