export interface BusinessCardInfo {
  name: string;
  tagline: string;
  professionalAreas: string[];
  skills: string[];
  contactInfo: {
    line?: string;
    linkedin?: string;
    telegram?: string;
    whatsapp?: string;
    email?: string;
  };
  status: {
    isActive: boolean;
    label: string;
  };
  ctaButtons: {
    label: string;
    action: string;
    url: string;
  }[];
  qrCode?: string;
  recommendations?: {
    author: string;
    content: string;
    date: string;
  }[];
}
