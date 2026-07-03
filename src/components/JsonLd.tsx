// src/components/JsonLd.tsx
// Renders a Schema.org JSON-LD <script> block. Works in both server and client
// components. The data is serialised at render time so crawlers see it in the
// initial HTML.

export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is trusted (built from our own data), and we escape
      // the closing-tag sequence to keep the script block from breaking early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
