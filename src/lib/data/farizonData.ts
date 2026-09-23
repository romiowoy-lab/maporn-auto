// Farizon showcase data — the single place to fill in specs and image paths.
//
// Numbers below are intentionally null: the brief's figures were labelled "placeholder",
// and the site catalog (models.ts) does not confirm them (it even lists the SV as diesel).
// The page shows "รอข้อมูลจริง" for each null and fills in automatically once a real value
// is entered here. Image fields take a path under /public (e.g. "/images/farizon/sv-side.png");
// null renders a clear "waiting for image" placeholder. UI components never hold URLs.

export type ConfigKey = "swb" | "lwbLow" | "lwbHigh";

export interface CargoConfig {
  volumeM3: number | null;
  lengthMm: number | null;
  widthMm: number | null;
  heightMm: number | null;
  payloadKg: number | null;
}

export interface FarizonSpecs {
  rangeKm: number | null;
  /** Test standard for the range figure (NEDC / WLTP / CLTC) — never mix standards. */
  rangeStandard: string | null;
  seats: number | null;
  maxPowerKw: number | null;
  maxTorqueNm: number | null;
  batteryKwh: number | null;
  dcChargingKw: number | null;
  chargeMinutes: number | null;
}

export interface FarizonModel {
  id: string;
  /** Short label for the selector tab */
  tab: string;
  name: string;
  bodyType: string;
  tagline: string | null;
  image: string | null;
  sideProfileImage: string | null;
  specs: FarizonSpecs;
  configurations: Record<ConfigKey, CargoConfig>;
}

const emptyConfig = (): CargoConfig => ({ volumeM3: null, lengthMm: null, widthMm: null, heightMm: null, payloadKg: null });
const emptySpecs = (): FarizonSpecs => ({
  rangeKm: null,
  rangeStandard: null,
  seats: null,
  maxPowerKw: null,
  maxTorqueNm: null,
  batteryKwh: null,
  dcChargingKw: null,
  chargeMinutes: null,
});
const emptyConfigs = (): Record<ConfigKey, CargoConfig> => ({ swb: emptyConfig(), lwbLow: emptyConfig(), lwbHigh: emptyConfig() });

export const FARIZON_MODELS: FarizonModel[] = [
  {
    id: "farizon-sv",
    tab: "FARIZON SV",
    name: "FARIZON SUPERVAN",
    bodyType: "Commercial EV Van",
    tagline: "Electric mobility engineered for the next generation of business.",
    // Real Farizon SV photo already used on the site's home hero.
    image: "/brand/studio/farizon-sv-hero.jpg",
    sideProfileImage: null,
    specs: emptySpecs(),
    configurations: emptyConfigs(),
  },
  // The catalog's P5M photo carries another company's "KING GEN" livery, so it is not reused here.
  { id: "farizon-p5m", tab: "P5M", name: "FARIZON P5M", bodyType: "Commercial EV Van", tagline: null, image: null, sideProfileImage: null, specs: emptySpecs(), configurations: emptyConfigs() },
  { id: "farizon-p6m", tab: "P6M", name: "FARIZON P6M", bodyType: "Commercial EV Van", tagline: null, image: null, sideProfileImage: null, specs: emptySpecs(), configurations: emptyConfigs() },
  { id: "farizon-p6h", tab: "P6H", name: "FARIZON P6H", bodyType: "Commercial EV Van", tagline: null, image: null, sideProfileImage: null, specs: emptySpecs(), configurations: emptyConfigs() },
  { id: "farizon-c6m", tab: "C6M", name: "FARIZON C6M", bodyType: "Commercial EV Van", tagline: null, image: null, sideProfileImage: null, specs: emptySpecs(), configurations: emptyConfigs() },
  { id: "farizon-c6h", tab: "C6H", name: "FARIZON C6H", bodyType: "Commercial EV Van", tagline: null, image: null, sideProfileImage: null, specs: emptySpecs(), configurations: emptyConfigs() },
];

export const CONFIG_LABELS: { key: ConfigKey; label: string }[] = [
  { key: "swb", label: "SWB" },
  { key: "lwbLow", label: "LWB LOW ROOF" },
  { key: "lwbHigh", label: "LWB HIGH ROOF" },
];

export interface Scenario {
  key: string;
  label: string;
  image: string | null;
  benefits: string[];
}

export const SCENARIOS: Scenario[] = [
  { key: "logistics", label: "LOGISTICS", image: null, benefits: [] },
  { key: "delivery", label: "DELIVERY", image: null, benefits: [] },
  { key: "passenger", label: "PASSENGER", image: null, benefits: [] },
  { key: "mobile", label: "MOBILE BUSINESS", image: null, benefits: [] },
  { key: "custom", label: "CUSTOM BUILD", image: null, benefits: [] },
];

export interface InteriorMode {
  key: string;
  label: string;
  image: string | null;
}

export const INTERIOR_MODES: InteriorMode[] = [
  { key: "passenger", label: "PASSENGER", image: null },
  { key: "cargo", label: "CARGO", image: null },
  { key: "business", label: "BUSINESS", image: null },
  { key: "custom", label: "CUSTOM", image: null },
];

/** Feature names come from the project brief; a description is added once confirmed. */
export interface Feature {
  name: string;
  description: string | null;
}

export const TECH_FEATURES: Feature[] = [
  { name: "DRIVE-BY-WIRE", description: null },
  { name: "GXA-M ARCHITECTURE", description: null },
  { name: "OTA UPDATES", description: null },
  { name: "ADAS L2+", description: null },
  { name: "ACC", description: null },
  { name: "LCC", description: null },
];

export const SAFETY_FEATURES: Feature[] = [
  { name: "ADAS Suite", description: null },
  { name: "360° Surround Camera", description: null },
  { name: "Blind Spot Monitoring", description: null },
  { name: "TPMS", description: null },
  { name: "Driver Monitoring System", description: null },
];

/** External Farizon sales site — null until the official URL is confirmed. */
export const SALES_SITE_URL: string | null = null;

export const PENDING = "รอข้อมูลจริง";
