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
            <p style={{ margin: "0", color: textColor }}>
              {data.name && (
                <span style={{ fontWeight: 600 }}>{data.name}</span>
              )}
              {data.name && (data.title || data.company || data.email) && (
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
              {(data.title || data.company) && data.email && (
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
              {data.email && validLinks.length > 0 && (
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
          </td>
        </tr>
      </tbody>
    </table>
  );
}
