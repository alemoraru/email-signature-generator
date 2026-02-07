import type { SignatureStyleProps } from "../types.ts";
import { getLinkUrl, renderLinkContent } from "../utils.tsx";

export function BoldSignature({
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
        lineHeight: "1.4",
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        {data.name && (
          <tr>
            <td style={{ paddingBottom: space(8) }}>
              <p
                style={{
                  margin: "0",
                  fontWeight: 800,
                  fontSize: "20px",
                  color: primaryColor,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase" as const,
                }}
              >
                {data.name}
              </p>
            </td>
          </tr>
        )}
        {(data.title || data.company) && (
          <tr>
            <td style={{ paddingBottom: space(12) }}>
              <p style={{ margin: "0", fontSize: "14px" }}>
                {data.title && (
                  <span style={{ color: textColor, fontWeight: 600 }}>
                    {data.title}
                  </span>
                )}
                {data.title && data.company && (
                  <span style={{ color: mutedColor, margin: "0 6px" }}>@</span>
                )}
                {data.company && (
                  <span style={{ color: textColor, fontWeight: 600 }}>
                    {data.company}
                  </span>
                )}
              </p>
            </td>
          </tr>
        )}
        <tr>
          <td
            style={{
              paddingTop: space(12),
              paddingBottom: data.cta?.enabled ? space(12) : 0,
              borderTop: `3px solid ${primaryColor}`,
            }}
          >
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
                          borderRadius: "50%",
                          display: "block",
                          border: `2px solid ${primaryColor}`,
                        }}
                      />
                    </td>
                  )}
                  <td style={{ verticalAlign: "middle" }}>
                    {data.email && (
                      <p
                        style={{
                          margin: `0 0 ${space(4)} 0`,
                          fontSize: "14px",
                        }}
                      >
                        <a
                          href={`mailto:${data.email}`}
                          style={{
                            color: textColor,
                            textDecoration: "none",
                            fontWeight: 500,
                          }}
                        >
                          {data.email}
                        </a>
                      </p>
                    )}
                    {data.phone && (
                      <p
                        style={{
                          margin: `0 0 ${space(validLinks.length > 0 ? 4 : 0)} 0`,
                          fontSize: "14px",
                        }}
                      >
                        <a
                          href={`tel:${data.phone.replace(/\s/g, "")}`}
                          style={{
                            color: textColor,
                            textDecoration: "none",
                            fontWeight: 500,
                          }}
                        >
                          {data.phone}
                        </a>
                      </p>
                    )}
                    {validLinks.length > 0 && (
                      <p style={{ margin: "0", fontSize: "13px" }}>
                        {validLinks.map((link, index) => (
                          <span key={link.id}>
                            <a
                              href={getLinkUrl(link)}
                              style={{
                                color: primaryColor,
                                textDecoration: "none",
                                fontWeight: 500,
                              }}
                            >
                              {renderLinkContent(link, primaryColor)}
                            </a>
                            {index < validLinks.length - 1 && (
                              <span
                                style={{ color: mutedColor, margin: "0 6px" }}
                              >
                                •
                              </span>
                            )}
                          </span>
                        ))}
                      </p>
                    )}
                  </td>
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
                  fontWeight: 600,
                  fontSize: "13px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.05em",
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
