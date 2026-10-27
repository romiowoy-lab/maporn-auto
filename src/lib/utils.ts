export function formatTHB(value: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateTH(dateStr: string): string {
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

// tel: link for a Thai number as written on the site. A trailing range ("02-322-3663-5" = 3663–3665)
// dials the first number; with several numbers ("…, …") the first one is used.
export function telHref(phone: string): string {
  const first = phone.split(",")[0].trim().replace(/(\d{4})-\d$/, "$1");
  return `tel:${first.replace(/[^0-9+]/g, "")}`;
}
