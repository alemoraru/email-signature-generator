import type { SignatureStyleProps } from "../types.ts";
import { getLinkUrl, renderLinkContent } from "../utils.tsx";

export function MinimalSignature({
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

  const hasPhoneOrLinks = data.phone || validLinks.length > 0;

  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      border={0}
      style={{
        fontFamily,
        fontSize: "14px",
        lineHeight: "1.6",
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        <tr>
          <td>
            {data.name && (
              <p
                style={{
                  margin: `0 0 ${space(4)} 0`,
                  fontWeight: 600,
                  fontSize: "14px",
                  color: textColor,
                }}
              >
                {data.name}
                {(data.title || data.company) && (
                  <span style={{ fontWeight: 400, color: mutedColor }}>
                    {" — "}
                    {data.title}
                    {data.title && data.company && ", "}
                    {data.company}
                  </span>
                )}
              </p>
            )}
            <p
              style={{
                margin: `0 0 ${data.cta?.enabled ? space(8) : 0} 0`,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0",
              }}
            >
              {data.email && (
                <>
                  <a
                    href={`mailto:${data.email}`}
                    style={{
                      color: primaryColor,
                      textDecoration: "none",
                    }}
                  >
                    {data.email}
                  </a>
                  {hasPhoneOrLinks && (
                    <span style={{ color: mutedColor, margin: "0 6px" }}>
                      |
                    </span>
                  )}
                </>
              )}
              {data.phone && (
                <>
                  <a
                    href={`tel:${data.phone.replace(/\s/g, "")}`}
                    style={{
                      color: primaryColor,
                      textDecoration: "none",
                    }}
                  >
                    {data.phone}
                  </a>
                  {validLinks.length > 0 && (
                    <span style={{ color: mutedColor, margin: "0 6px" }}>
                      |
                    </span>
                  )}
                </>
              )}
              {validLinks.map((link, index) => (
                <span
                  key={link.id}
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
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
                    <span style={{ color: mutedColor, margin: "0 6px" }}>
                      |
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
