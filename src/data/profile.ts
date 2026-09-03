import logo from "@/assets/enreach-logo.png";
import heroImage from "@/assets/hero-aluminium-zorba.jpg";
import portrait from "@/assets/biraj-gajera.jpg";
import p01 from "@/assets/products/p01.jpg";
import p03 from "@/assets/products/p03.jpg";
import p09 from "@/assets/products/p09.jpg";
import p11 from "@/assets/products/p11.jpg";
import p12 from "@/assets/products/p12.jpg";
import p16 from "@/assets/products/p16.jpg";
import p19 from "@/assets/products/p19.jpg";
import p22 from "@/assets/products/p22.jpg";
import p23 from "@/assets/products/p23.jpg";
import p24 from "@/assets/products/p24.jpg";
import p25 from "@/assets/products/p25.jpg";

export const profile = {
  name: "Biraj Gajera",
  title: "Founder",
  company: "Enreach Global Inc.",
  industry: "Global Metal Trade",
  phoneDisplay: "+1 (403) 408-7454",
  phoneRaw: "+14034087454",
  whatsapp: "14034087454",
  email: "Info@Enreachglobal.com",
  website: "https://www.enreachglobal.com/",
  websiteLabel: "enreachglobal.com",
  location: "Canada",
  headquarters: "Calgary, Alberta, Canada",
  logo,
  heroImage,
  portrait,
  bio: "Biraj Gajera brings deep commercial experience in sales, operations, and business development. He leads with a practical, relationship-first approach, helping expand supplier networks, strengthen trade execution, and build trusted international partnerships.",
  about:
    "Enreach Global Inc. is a Canadian metal trading company connecting reliable aluminium, copper and brass scrap with global industrial demand. The company focuses on transparent sourcing, dependable logistics, export coordination and long-term trade partnerships.",
};

export const stats = [
  { value: "12+", label: "Trade relationships supported" },
  { value: "3", label: "Core metal categories managed" },
  { value: "Global", label: "Sourcing and buyer reach" },
  { value: "End-to-End", label: "Enquiry to shipment" },
];

export const services = [
  "Global Scrap Sourcing",
  "Export Documentation",
  "Industrial Buyer Matching",
  "Sourcing Support",
  "Export Coordination",
  "Shipment Planning",
  "Supplier Network Coordination",
  "Buyer & Supplier Trade Support",
];

export const productCategories = [
  {
    id: "aluminium",
    label: "Aluminium Scrap",
    items: [
      { name: "6063 Extrusion", note: "Straight extruded sections", image: p01 },
      { name: "6061 Structural Aluminum", note: "Heavier structural profiles", image: p11 },
      { name: "Taint/Tabor", note: "Mixed sheet aluminium", image: p03 },
      { name: "Cast Aluminum", note: "Moulded cast components", image: p09 },
      { name: "Aluminum Wheels", note: "Used alloy wheels", image: p12 },
      { name: "Used Beverage Cans (UBC)", note: "Baled or loose cans", image: p16 },
      { name: "EC Aluminum Wire", note: "Clean conductor wire", image: p19 },
      { name: "Aluminum Foil", note: "Thin foil fractions", image: p22 },
      { name: "Aluminum Turnings", note: "Machining shavings", image: p25 },
      { name: "Zorba", note: "Mixed non-ferrous shredder fraction", image: p23 },
      { name: "Zurik Scrap", note: "Non-ferrous recovery fraction", image: p24 },
    ],
  },
  {
    id: "copper",
    label: "Copper Scrap",
    items: [
      { name: "Millberry", note: "Bare bright copper wire", image: p19 },
      { name: "Birch / Cliff — No. 1 Copper", note: "Clean No. 1 grade copper", image: p01 },
      { name: "Candy — No. 2 Copper", note: "Unalloyed No. 2 grade", image: p11 },
      { name: "Berry — Copper Wire", note: "Clean copper wire", image: p03 },
      { name: "Copper Chops", note: "Granulated copper", image: p23 },
      { name: "Copper Radiators", note: "Recovered radiator units", image: p09 },
      { name: "Copper Motors", note: "Electric motor units", image: p12 },
      { name: "Copper Transformers", note: "Transformer cores and windings", image: p16 },
      { name: "Tinned Copper", note: "Tin-coated copper grades", image: p24 },
    ],
  },
];

export const whyPoints = [
  {
    title: "Disciplined Material Grading",
    body: "Clearer sorting and practical quality expectations.",
  },
  {
    title: "Export-Ready Coordination",
    body: "Documentation, shipment planning and buyer communication.",
  },
  {
    title: "Responsive Commercial Support",
    body: "Faster quoting and clearer trade communication.",
  },
  {
    title: "Global Sourcing",
    body: "Supplier relationships maintained across international scrap markets.",
  },
  {
    title: "Reliable Trade Partnerships",
    body: "Transparency, reliability and long-term relationships.",
  },
];

export const presencePoints = [
  { title: "Global Sourcing", body: "Collaboration with suppliers worldwide." },
  {
    title: "Cross-Border Documentation",
    body: "Compliance and shipment planning support.",
  },
  {
    title: "Industrial Buyer Alignment",
    body: "Supporting refineries, smelters and processors with reliable bulk material.",
  },
];

export const vCard = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  `N:Gajera;Biraj;;;`,
  `FN:${profile.name}`,
  `ORG:${profile.company}`,
  `TITLE:${profile.title}`,
  `TEL;TYPE=CELL,VOICE:${profile.phoneRaw}`,
  `EMAIL;TYPE=WORK:${profile.email}`,
  `URL:${profile.website}`,
  `ADR;TYPE=WORK:;;;;;;${profile.location}`,
  "END:VCARD",
].join("\r\n");
