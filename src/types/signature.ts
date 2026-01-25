export type SocialProvider =
  | "linkedin"
  | "x"
  | "github"
  | "facebook"
  | "instagram"
  | "custom";

export interface SignatureLink {
  id: string;
  label: string;
  url: string;
  provider: SocialProvider;
  showIcon: boolean;
}

export type SignatureStyle = "classic" | "modern" | "minimal";

export interface SignatureColors {
  primary: string;
}

export interface SignatureData {
  logo: string | null;
  logoSize: number;
  name: string;
  title: string;
  company: string;
  email: string;
  links: SignatureLink[];
  colors: SignatureColors;
  style: SignatureStyle;
}

export type DeviceType = "desktop" | "tablet" | "mobile";

export type PreviewTheme = "light" | "dark";
