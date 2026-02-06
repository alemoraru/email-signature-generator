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
                  margin: "0 0 4px 0",
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
                margin: "0",
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
          </td>
        </tr>
      </tbody>
    </table>
  );
}
