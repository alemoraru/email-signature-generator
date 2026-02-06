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
            <td style={{ paddingBottom: "8px" }}>
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
            <td style={{ paddingBottom: "12px" }}>
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
              paddingTop: "12px",
              borderTop: `3px solid ${primaryColor}`,
            }}
          >
            <table cellPadding="0" cellSpacing="0" border={0}>
              <tbody>
                <tr>
                  {data.logo && (
                    <td
                      style={{
                        paddingRight: "12px",
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
                      <p style={{ margin: "0 0 4px 0", fontSize: "14px" }}>
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
      </tbody>
    </table>
  );
}
