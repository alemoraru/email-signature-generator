import type { SignatureStyleProps } from "../types.ts";
import { getLinkUrl, renderLinkContent } from "../utils.tsx";

export function CompactSignature({
  data,
  primaryColor,
  textColor,
  mutedColor,
  fontFamily,
}: SignatureStyleProps) {
  const validLinks = data.links.filter((l) => l.url);

  // Spacing multiplier based on spacing setting
  const spacingMultiplier =
    data.spacing === "compact" ? 0.6 : data.spacing === "relaxed" ? 1.4 : 1;
  const space = (base: number) => `${base * spacingMultiplier}px`;

  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      border={0}
      style={{
        fontFamily,
        fontSize: "13px",
        lineHeight: "1.4",
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        <tr>
          <td>
            <p
              style={{
                margin: `0 0 ${data.cta?.enabled ? space(8) : 0} 0`,
                color: textColor,
              }}
            >
              {data.name && (
                <span style={{ fontWeight: 600 }}>{data.name}</span>
              )}
              {data.name &&
                (data.title || data.company || data.email || data.phone) && (
                  <span style={{ color: mutedColor, margin: "0 4px" }}>·</span>
                )}
              {data.title && (
                <span style={{ color: mutedColor }}>{data.title}</span>
              )}
              {data.title && data.company && (
                <span style={{ color: mutedColor }}> at </span>
              )}
              {data.company && (
                <span style={{ fontWeight: 500 }}>{data.company}</span>
              )}
              {(data.title || data.company) && (data.email || data.phone) && (
                <span style={{ color: mutedColor, margin: "0 4px" }}>·</span>
              )}
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  style={{ color: primaryColor, textDecoration: "none" }}
                >
                  {data.email}
                </a>
              )}
              {data.email && data.phone && (
                <span style={{ color: mutedColor, margin: "0 4px" }}>·</span>
              )}
              {data.phone && (
                <a
                  href={`tel:${data.phone.replace(/\s/g, "")}`}
                  style={{ color: primaryColor, textDecoration: "none" }}
                >
                  {data.phone}
                </a>
              )}
              {(data.email || data.phone) && validLinks.length > 0 && (
                <span style={{ color: mutedColor, margin: "0 4px" }}>·</span>
              )}
              {validLinks.map((link, index) => (
                <span key={link.id}>
                  <a
                    href={getLinkUrl(link)}
                    style={{ color: primaryColor, textDecoration: "none" }}
                  >
                    {renderLinkContent(link, primaryColor)}
                  </a>
                  {index < validLinks.length - 1 && (
                    <span style={{ color: mutedColor, margin: "0 4px" }}>
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
            {data.cta?.enabled && data.cta.url && (
              <p style={{ margin: "0" }}>
                <a
                  href={data.cta.url}
                  style={{
                    display: "inline-block",
                    backgroundColor: primaryColor,
                    color: "#ffffff",
                    padding: `${space(6)} ${space(12)}`,
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                >
                  {data.cta.text || "Learn More"}
                </a>
              </p>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
