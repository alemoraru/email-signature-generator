import type { SignatureStyleProps } from "../types.ts";
import { getLinkUrl, renderLinkContent } from "../utils.tsx";

export function ClassicSignature({
  data,
  primaryColor,
  textColor,
  mutedColor,
  isDark,
  fontFamily,
  logoSize,
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
        fontSize: "14px",
        lineHeight: "1.4",
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        <tr>
          {data.logo && (
            <td style={{ paddingRight: space(16), verticalAlign: "top" }}>
              <img
                src={data.logo}
                alt="Logo"
                width={logoSize}
                height={logoSize}
                style={{
                  width: `${logoSize}px`,
                  height: `${logoSize}px`,
                  objectFit: "contain",
                  borderRadius: "8px",
                  display: "block",
                }}
              />
            </td>
          )}
          <td style={{ verticalAlign: "top" }}>
            {data.name && (
              <p
                style={{
                  margin: `0 0 ${space(2)} 0`,
                  fontWeight: 600,
                  fontSize: "16px",
                  color: textColor,
                }}
              >
                {data.name}
              </p>
            )}
            {(data.title || data.company) && (
              <p style={{ margin: `0 0 ${space(8)} 0` }}>
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
              </p>
            )}
            {data.email && (
              <p style={{ margin: `0 0 ${space(4)} 0` }}>
                <a
                  href={`mailto:${data.email}`}
                  style={{
                    color: primaryColor,
                    textDecoration: "none",
                  }}
                >
                  {data.email}
                </a>
              </p>
            )}
            {data.phone && (
              <p
                style={{
                  margin: `0 0 ${space(validLinks.length > 0 ? 6 : 0)} 0`,
                }}
              >
                <a
                  href={`tel:${data.phone.replace(/\s/g, "")}`}
                  style={{
                    color: primaryColor,
                    textDecoration: "none",
                  }}
                >
                  {data.phone}
                </a>
              </p>
            )}
            {validLinks.length > 0 && (
              <p
                style={{ margin: `0 0 ${data.cta?.enabled ? space(8) : 0} 0` }}
              >
                {validLinks.map((link, index) => (
                  <span key={link.id}>
                    <a
                      href={getLinkUrl(link)}
                      style={{
                        color: primaryColor,
                        textDecoration: "none",
                      }}
                    >
                      {renderLinkContent(link, primaryColor)}
                    </a>
                    {index < validLinks.length - 1 && (
                      <span
                        style={{
                          color: isDark ? "#4b5563" : "#d1d5db",
                          margin: "0 6px",
                        }}
                      >
                        •
                      </span>
                    )}
                  </span>
                ))}
              </p>
            )}
            {data.cta?.enabled && data.cta.url && (
              <p style={{ margin: "0" }}>
                <a
                  href={data.cta.url}
                  style={{
                    display: "inline-block",
                    backgroundColor: primaryColor,
                    color: "#ffffff",
                    padding: `${space(8)} ${space(16)}`,
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "13px",
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
