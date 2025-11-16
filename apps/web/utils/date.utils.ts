export function toPersianDate(iso: string): string {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleDateString("fa-IR");
  } catch {
    return "-";
  }
}