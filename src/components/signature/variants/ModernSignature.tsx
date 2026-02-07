import type { SignatureStyleProps } from "../types.ts";
import { getLinkUrl, renderLinkContent } from "../utils.tsx";
import { Mail, Phone } from "lucide-react";

export function ModernSignature({
  data,
  primaryColor,
  textColor,
  mutedColor,
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
        lineHeight: "1.5",
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        <tr>
          <td style={{ paddingBottom: space(12) }}>
            <table cellPadding="0" cellSpacing="0" border={0}>
              <tbody>
                <tr>
                  {data.logo && (
                    <td
                      style={{
                        paddingRight: space(12),
                        verticalAlign: "middle",
                      }}
                    >
                      <img
                        src={data.logo}
                        alt="Logo"
                        width={logoSize}
                        height={logoSize}
                        style={{
                          width: `${logoSize}px`,
                          height: `${logoSize}px`,
                          objectFit: "contain",
                          borderRadius: "6px",
                          display: "block",
                        }}
                      />
                    </td>
                  )}
                  <td style={{ verticalAlign: "middle" }}>
                    {data.name && (
                      <p
                        style={{
                          margin: "0",
                          fontWeight: 700,
                          fontSize: "16px",
                          color: textColor,
                        }}
                      >
                        {data.name}
                      </p>
                    )}
                    {(data.title || data.company) && (
                      <p
                        style={{
                          margin: `${space(2)} 0 0 0`,
                          fontSize: "13px",
                        }}
                      >
                        {data.title && (
                          <span style={{ color: mutedColor }}>
                            {data.title}
                          </span>
                        )}
                        {data.title && data.company && (
                          <span style={{ color: mutedColor }}> at </span>
                        )}
                        {data.company && (
                          <span
                            style={{ color: primaryColor, fontWeight: 500 }}
                          >
                            {data.company}
                          </span>
                        )}
                      </p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td
            style={{
              paddingTop: space(12),
              paddingBottom: data.cta?.enabled ? space(12) : 0,
              borderTop: `2px solid ${primaryColor}`,
            }}
          >
            <table cellPadding="0" cellSpacing="0" border={0}>
              <tbody>
                <tr>
                  {data.email && (
                    <td style={{ paddingRight: space(16) }}>
                      <a
                        href={`mailto:${data.email}`}
                        style={{
                          color: textColor,
                          textDecoration: "none",
                          fontSize: "13px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Mail size={16} style={{ color: textColor }} />
                        <span>{data.email}</span>
                      </a>
                    </td>
                  )}
                  {data.phone && (
                    <td style={{ paddingRight: space(16) }}>
                      <a
                        href={`tel:${data.phone.replace(/\s/g, "")}`}
                        style={{
                          color: textColor,
                          textDecoration: "none",
                          fontSize: "13px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Phone size={16} style={{ color: textColor }} />
                        <span>{data.phone}</span>
                      </a>
                    </td>
                  )}
                  {validLinks.map((link) => (
                    <td key={link.id} style={{ paddingRight: space(16) }}>
                      <a
                        href={getLinkUrl(link)}
                        style={{
                          color: primaryColor,
                          textDecoration: "none",
                          fontSize: "13px",
                        }}
                      >
                        {renderLinkContent(link, primaryColor)}
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        {data.cta?.enabled && data.cta.url && (
          <tr>
            <td>
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
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
