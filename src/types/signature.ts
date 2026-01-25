export interface SignatureLink {
  id: string;
  label: string;
  url: string;
}

export type SignatureStyle = "classic" | "modern" | "minimal";

export interface SignatureColors {
  primary: string;
}

export interface SignatureData {
  logo: string | null;
  name: string;
  title: string;
  company: string;
  email: string;
  links: SignatureLink[];
  colors: SignatureColors;
  style: SignatureStyle;
}

export type DeviceType = "desktop" | "tablet" | "mobile";
