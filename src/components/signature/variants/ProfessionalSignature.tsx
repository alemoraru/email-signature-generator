import type { SignatureStyleProps } from "../types.ts";
import { getLinkUrl, renderLinkContent } from "../utils.tsx";

export function ProfessionalSignature({
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
        lineHeight: "1.5",
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        <tr>
          {data.logo && (
            <>
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
                    borderRadius: "4px",
                    display: "block",
                  }}
                />
              </td>
              <td
                style={{
                  paddingRight: "16px",
                  borderRight: `2px solid ${isDark ? "#4b5563" : "#e5e7eb"}`,
                }}
              />
            </>
          )}
          <td style={{ paddingLeft: data.logo ? "16px" : "0" }}>
            {data.name && (
              <p
                style={{
                  margin: "0 0 4px 0",
                  fontWeight: 700,
                  fontSize: "17px",
                  color: textColor,
                  letterSpacing: "-0.02em",
                }}
              >
                {data.name}
              </p>
            )}
            {data.title && (
              <p
                style={{
                  margin: "0 0 2px 0",
                  fontSize: "14px",
                  color: primaryColor,
                  fontWeight: 500,
                }}
              >
                {data.title}
              </p>
            )}
            {data.company && (
              <p
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "13px",
                  color: mutedColor,
                }}
              >
                {data.company}
              </p>
            )}
            {data.email && (
              <p style={{ margin: "0 0 4px 0", fontSize: "13px" }}>
                <a
                  href={`mailto:${data.email}`}
                  style={{ color: textColor, textDecoration: "none" }}
                >
                  {data.email}
                </a>
              </p>
            )}
            {validLinks.length > 0 && (
              <p style={{ margin: "0", fontSize: "13px" }}>
                {validLinks.map((link, index) => (
                  <span key={link.id}>
                    <a
                      href={getLinkUrl(link)}
                      style={{ color: primaryColor, textDecoration: "none" }}
                    >
                      {renderLinkContent(link, primaryColor)}
                    </a>
                    {index < validLinks.length - 1 && (
                      <span style={{ color: mutedColor, margin: "0 6px" }}>
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
