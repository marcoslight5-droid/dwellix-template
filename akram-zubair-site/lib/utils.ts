/** wa.me link with a prefilled message. The number must be digits only. */
export function whatsappLink(e164: string, text: string): string {
  return `https://wa.me/${e164.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

/** Western digits with thousands separators, in both languages. */
export const formatNumber = (n: number, maxFraction = 0) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: maxFraction }).format(n);

/** First word of a name, for friendly WhatsApp greetings. */
export const firstName = (name: string) => name.trim().split(/\s+/)[0];
