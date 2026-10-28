export const business = {
  name: 'BUILDYARD MATERIALS',
  phoneDisplay: '+91 98765 43210',
  phoneDigits: '919876543210',
  email: 'hello@buildyard.example',
  address: 'Plot 18, Builders Market, Industrial Estate, Pune, Maharashtra 411019',
  hours: 'Mon–Sat, 8:30 AM–7:00 PM · Sunday by appointment',
  mapUrl: 'https://maps.google.com/?q=Builders+Market+Pune',
  demoNotice: 'Sample business details — replace before publishing',
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.phoneDigits}?text=${encodeURIComponent(message)}`;
}
