export interface SignatureLink {
  id: string;
  label: string;
  url: string;
}

export interface SignatureData {
  logo: string | null;
  name: string;
  title: string;
  company: string;
  email: string;
  links: SignatureLink[];
  colors: SignatureColors;
}

export interface SignatureColors {
  primary: string;
}

export type DeviceType = 'desktop' | 'tablet' | 'mobile';
