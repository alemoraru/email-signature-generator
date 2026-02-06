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
            <td style={{ paddingRight: "16px", verticalAlign: "top" }}>
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
                  margin: "0 0 2px 0",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: textColor,
                }}
              >
                {data.name}
              </p>
            )}
            {(data.title || data.company) && (
              <p style={{ margin: "0 0 8px 0" }}>
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
              <p style={{ margin: validLinks.length > 0 ? "0 0 6px 0" : "0" }}>
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
            {validLinks.length > 0 && (
              <p style={{ margin: "0" }}>
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
          </td>
        </tr>
      </tbody>
    </table>
  );
}
