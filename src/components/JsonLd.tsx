/**
 * Structured data for search engines (schema.org JSON-LD). Build the data with the helpers in src/seo.ts.
 * `<` is escaped so no string in the data can close the script tag early.
 */
export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
