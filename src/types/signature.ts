export type SocialProvider =
  | "linkedin"
  | "x"
  | "github"
  | "facebook"
  | "instagram"
  | "website"
  | "custom";

export interface SignatureLink {
  id: string;
  label: string;
  url: string;
  provider: SocialProvider;
  showIcon: boolean;
  useUtm: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export type SignatureStyle = "classic" | "modern" | "minimal";

export type FontFamily = "system" | "serif" | "mono" | "georgia" | "times";

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
  fontFamily: FontFamily;
}

export type DeviceType = "desktop" | "tablet" | "mobile";

export type PreviewTheme = "light" | "dark";
