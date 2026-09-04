import fs from "fs";
import path from "path";
import { Lead } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(LEADS_FILE)) fs.writeFileSync(LEADS_FILE, "[]", "utf-8");
}

export function readLeads(): Lead[] {
  ensureStore();
  const raw = fs.readFileSync(LEADS_FILE, "utf-8");
  try {
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

export function appendLead(lead: Lead): void {
  ensureStore();
  const leads = readLeads();
  leads.unshift(lead);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}
