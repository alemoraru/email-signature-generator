import type { SignatureData, PreviewTheme } from "@/types/signature";

export interface SignatureStyleProps {
  data: SignatureData;
  primaryColor: string;
  textColor: string;
  mutedColor: string;
  isDark: boolean;
  fontFamily: string;
  logoSize: number;
}
