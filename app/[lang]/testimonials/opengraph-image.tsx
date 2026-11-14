import { ogImage, ogStaticParams, OG_SIZE } from "@/src/og";

// Share card for this page (see src/og.tsx)
export const alt = "cilicom";
export const size = OG_SIZE;
export const contentType = "image/png";
export const generateStaticParams = ogStaticParams;

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return ogImage(lang, (t) => ({ label: t.testimonialsPage.label, title: t.testimonialsPage.title }));
}
