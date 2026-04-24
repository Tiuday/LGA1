export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function buildAllAssetsText(
  sequences: { asset_type: string; content: string }[]
): string {
  return sequences
    .map((s) => `--- ${s.asset_type.toUpperCase().replace(/_/g, " ")} ---\n${s.content}`)
    .join("\n\n");
}
