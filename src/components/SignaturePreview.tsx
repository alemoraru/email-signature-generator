import type { SignatureData } from "@/types/signature";

interface SignaturePreviewProps {
  data: SignatureData;
  forCopy?: boolean;
}

export function SignaturePreview({ data, forCopy = false }: SignaturePreviewProps) {
  // When copying, use neutral colors for better email client compatibility
  const primaryColor = forCopy ? "#1e40af" : data.colors.primary;
  const textColor = "#1a1a1a";
  const mutedColor = "#6b7280";

  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        fontSize: "14px",
        lineHeight: "1.4",
      }}
    >
      <tbody>
        <tr>
          {data.logo && (
            <td style={{ paddingRight: "16px", verticalAlign: "top" }}>
              <img
                src={data.logo}
                alt="Logo"
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </td>
          )}
          <td style={{ verticalAlign: "top" }}>
            {data.name && (
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: textColor,
                  marginBottom: "2px",
                }}
              >
                {data.name}
              </div>
            )}
            {(data.title || data.company) && (
              <div style={{ marginBottom: "8px" }}>
                {data.title && (
                  <span style={{ color: mutedColor }}>{data.title}</span>
                )}
                {data.title && data.company && (
                  <span style={{ color: mutedColor }}> · </span>
                )}
                {data.company && (
                  <span style={{ color: textColor, fontWeight: 500 }}>
                    {data.company}
                  </span>
                )}
              </div>
            )}
            {data.email && (
              <div style={{ marginBottom: data.links.length > 0 ? "6px" : "0" }}>
                <a
                  href={`mailto:${data.email}`}
                  style={{
                    color: primaryColor,
                    textDecoration: "none",
                  }}
                >
                  {data.email}
                </a>
              </div>
            )}
            {data.links.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {data.links.map((link, index) => (
                  <span key={link.id}>
                    {link.label && link.url && (
                      <>
                        <a
                          href={link.url}
                          style={{
                            color: primaryColor,
                            textDecoration: "none",
                          }}
                        >
                          {link.label}
                        </a>
                        {index < data.links.filter(l => l.label && l.url).length - 1 && (
                          <span style={{ color: "#d1d5db", margin: "0 6px" }}>•</span>
                        )}
                      </>
                    )}
                  </span>
                ))}
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
