export type PropertyType = "Retail" | "Office" | "Warehouse" | "Land";
export type PropertyStatus = "Sale" | "Lease" | "Pre-Lease";
export type RequirementType = "Shops" | "Office" | "Warehouse" | "Land";
export type ContactType = "Developer" | "Channel Partner" | "Brand" | "Investor";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  source: string; // CP or Direct
  location: string;
  locationLink?: string;
  size: string; // e.g. "2000 sqft"
  price: string;
  images: string[];
  documents: PropertyDocument[];
  createdAt: string;
}

export interface PropertyDocument {
  id: string;
  name: string;
  type: "PDF" | "DWG" | "SKP" | "RVT" | "PSD" | "Excel" | "Word" | "Image" | "Other";
  url: string;
  extension: string; // .dwg, .skp, etc.
}

export interface Requirement {
  id: string;
  clientName: string;
  type: RequirementType;
  status: PropertyStatus;
  source: string; // CP, Direct, Investor
  budgetMin: string;
  budgetMax: string;
  sizeMin: string;
  sizeMax: string;
  locationPreference: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  companyName: string;
  phone: string;
  type: ContactType;
  location: string;
  remark?: string;
}

export interface FollowUp {
  id: string;
  contactId: string;
  contactName: string; // Denormalized for display
  date: string;
  status: "Pending" | "Completed" | "Missed";
  notes: string;
  type: "Call" | "Site Visit" | "Meeting";
}

export interface SiteVisit {
  id: string;
  propertyId: string;
  propertyTitle: string;
  visitorName: string;
  date: string;
  feedback: string;
}
