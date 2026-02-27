import { Label } from "../ui/label";

/* ---------- reusable field ---------- */
interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function Field({ label, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-[10px] text-red-500 text-end">{error}</p>}
    </div>
  );
}
