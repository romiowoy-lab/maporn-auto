import { getModelsByBrand } from "@/lib/data/models";
import type { VehicleModel } from "@/lib/types";

/**
 * GWM showroom vehicle list — derived from the real, verified catalog in `models.ts`
 * (not a separate/duplicated data source, per the "one source of truth" rule used
 * elsewhere in this project). Adding a new GWM model to `models.ts` automatically
 * shows up here; nothing in this file needs to change.
 *
 * Sub-brand label and the filter category are both *derived* from the real model
 * name/bodyType/fuelType already in the catalog — not new fabricated fields.
 *
 * NOTE: GWM Thailand's current showroom lineup also includes TANK 500 HEV/PHEV variants,
 * the HAVAL H6, WEY, and POER pickup ranges — none of those are in this project's
 * verified catalog yet (only Haval Jolion, Ora Good Cat, Tank 300, Tank 500 are).
 * Real photography only exists for Tank 300 and Tank 500; Haval Jolion and Ora Good Cat
 * fall back to the site's standard placeholder treatment rather than a fabricated photo.
 */
export interface GwmVehicle {
  model: VehicleModel;
  subBrand: string;
  /** A vehicle can carry more than one real tag (e.g. Tank 300 is both an SUV and a Hybrid). */
  tags: string[];
  powertrainLabel: string;
}

function subBrandFromName(name: string): string {
  const first = name.split(" ")[0].toUpperCase();
  return first; // "Tank 300" -> "TANK", "Ora Good Cat" -> "ORA", "Haval Jolion" -> "HAVAL"
}

export function getGwmVehicles(): GwmVehicle[] {
  return getModelsByBrand("gwm").map((model) => {
    const tags = [model.bodyType, model.fuelType].filter((t, i, arr) => arr.indexOf(t) === i);
    return {
      model,
      subBrand: subBrandFromName(model.name),
      tags,
      powertrainLabel:
        model.fuelType === "EV"
          ? `Electric${model.range ? ` · ${model.range.replace("ระยะทางวิ่งสูงสุด ", "")}` : ""}`
          : `${model.variants[0]?.engine ?? ""} · ${model.bodyType === "SUV" ? "4WD" : model.bodyType}`,
    };
  });
}

export function getGwmCategories(): { key: string; label: string }[] {
  const vehicles = getGwmVehicles();
  const present = new Set(vehicles.flatMap((v) => v.tags));
  const ORDER = ["SUV", "Hatchback", "EV", "Hybrid", "Pickup", "Diesel"];
  return [{ key: "all", label: "ALL" }, ...ORDER.filter((t) => present.has(t)).map((t) => ({ key: t, label: t.toUpperCase() }))];
}
