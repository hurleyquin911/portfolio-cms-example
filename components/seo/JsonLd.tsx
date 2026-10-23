/** JSON-LD Person ringan untuk halaman About / Home */
export function PersonJsonLd({
  name,
  description,
  email,
  url,
}: {
  name: string;
  description: string;
  email?: string;
  url?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    description,
    email,
    url,
    jobTitle: "Designer & Creator",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
