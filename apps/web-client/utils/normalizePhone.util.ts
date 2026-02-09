export const normalizePhone = (phone: string) => {
  let normalized = phone.trim();

  if (normalized.startsWith("+98")) {
    normalized = normalized.slice(3);
  }

  if (normalized.startsWith("98")) {
    normalized = normalized.slice(2);
  }

  if (normalized.startsWith("0")) {
    normalized = normalized.slice(1);
  }

  return `98${normalized}`;
};
