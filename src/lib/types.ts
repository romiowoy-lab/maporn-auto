export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "EV";
export type BodyType = "SUV" | "Sedan" | "Hatchback" | "Pickup" | "MPV" | "Van" | "EV";
export type Transmission = "Automatic" | "Manual" | "CVT" | "Single-speed";

export interface Brand {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  story: string;
  colorHex: string;
  founded: string;
  origin: string;
  heroImage?: string;
  /** Optional short motion clip shown instead of heroImage (used as poster) on the brand detail hero. */
  heroVideo?: string;
  logo?: string;
}

export interface Variant {
  name: string;
  price: number;
  engine: string;
  power: string;
  torque: string;
  transmission: Transmission;
  seats: number;
}

export interface VehicleModel {
  slug: string;
  brandSlug: string;
  name: string;
  bodyType: BodyType;
  fuelType: FuelType;
  startPrice: number;
  isNew: boolean;
  isFeatured: boolean;
  colors: string[];
  dimensions: { length: number; width: number; height: number; wheelbase: number };
  battery?: string;
  range?: string;
  warranty: string;
  safety: string[];
  technology: string[];
  features: string[];
  variants: Variant[];
  description: string;
  image?: string;
}

export interface Promotion {
  slug: string;
  title: string;
  category: "New Car" | "EV" | "Financing" | "Campaign" | "Discount" | "Gift" | "Interest Rate";
  brandSlug?: string;
  modelSlug?: string;
  description: string;
  detail: string;
  startDate: string;
  endDate: string;
}

export interface Branch {
  slug: string;
  name: string;
  province: string;
  address: string;
  phone: string;
  line: string;
  hours: string;
  brands: string[];
  isShowroom: boolean;
  isServiceCenter: boolean;
  salesContact: string;
  mapQuery: string;
  lineUrl?: string;
  googleMapsUrl?: string;
  branchCode?: string;
}

export interface ServiceOffering {
  title: string;
  description: string;
}

export interface NewsArticle {
  slug: string;
  title: string;
  category: "Company" | "Vehicle" | "Technology" | "EV" | "Lifestyle" | "Event" | "CSR";
  excerpt: string;
  content: string[];
  author: string;
  publishDate: string;
  tags: string[];
}

export type LeadType = "contact" | "test-drive" | "quotation" | "service" | "inquiry";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Interested"
  | "Negotiating"
  | "Booked"
  | "Sold"
  | "Lost";

export interface Lead {
  id: string;
  type: LeadType;
  status: LeadStatus;
  name: string;
  phone: string;
  email?: string;
  lineId?: string;
  brand?: string;
  model?: string;
  variant?: string;
  branch?: string;
  preferredDate?: string;
  preferredTime?: string;
  contactChannel?: string;
  budget?: string;
  purchaseType?: string;
  needsFinancing?: boolean;
  plateNumber?: string;
  serviceType?: string;
  issueDetail?: string;
  remark?: string;
  consentAccepted: boolean;
  createdAt: string;
}
