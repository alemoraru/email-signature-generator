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

export type SignatureStyle =
  | "classic"
  | "modern"
  | "minimal"
  | "compact"
  | "professional"
  | "bold";

export type FontFamily = "system" | "serif" | "mono" | "georgia" | "times";

export interface SignatureColors {
  primary: string;
}

export type SpacingType = "compact" | "normal" | "relaxed";

export interface CallToAction {
  enabled: boolean;
  text: string;
  url: string;
}

export interface SignatureData {
  logo: string | null;
  logoSize: number;
  name: string;
  title: string;
  company: string;
  email: string;
  phone?: string;
  links: SignatureLink[];
  colors: SignatureColors;
  style: SignatureStyle;
  fontFamily: FontFamily;
  spacing?: SpacingType;
  cta?: CallToAction;
}

export type DeviceType = "desktop" | "tablet" | "mobile";

export type PreviewTheme = "light" | "dark";
