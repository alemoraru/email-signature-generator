import type { SignatureData } from "@/types/signature";

interface SignaturePreviewProps {
  data: SignatureData;
  forCopy?: boolean;
}

export function SignaturePreview({
  data,
  forCopy = false,
}: SignaturePreviewProps) {
  // When copying, use neutral colors for better email client compatibility
  const primaryColor = forCopy ? "#1e40af" : data.colors.primary;
  const textColor = "#1a1a1a";
  const mutedColor = "#6b7280";

  const fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

  // Classic style - Logo on left, info on right
  if (data.style === "classic") {
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
                  width="60"
                  height="60"
                  style={{
                    width: "60px",
                    height: "60px",
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
                <p
                  style={{ margin: data.links.length > 0 ? "0 0 6px 0" : "0" }}
                >
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
              {data.links.length > 0 && (
                <p style={{ margin: "0" }}>
                  {data.links.map((link, index) => (
                    <span key={link.id}>
                      {link.label && link.url && (
                        <>
                          <a
                            href={link.url}
                            style={{
                              color: primaryColor,
                              textDecoration: "none",
                            }}
                          >
                            {link.label}
                          </a>
                          {index <
                            data.links.filter((l) => l.label && l.url).length -
                              1 && (
                            <span style={{ color: "#d1d5db", margin: "0 6px" }}>
                              •
                            </span>
                          )}
                        </>
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

  // Modern style - Horizontal divider with logo on top
  if (data.style === "modern") {
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
            <td style={{ paddingBottom: "12px" }}>
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
                          width="48"
                          height="48"
                          style={{
                            width: "48px",
                            height: "48px",
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
                        <p style={{ margin: "2px 0 0 0", fontSize: "13px" }}>
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
                paddingTop: "12px",
                borderTop: `2px solid ${primaryColor}`,
              }}
            >
              <table cellPadding="0" cellSpacing="0" border={0}>
                <tbody>
                  <tr>
                    {data.email && (
                      <td style={{ paddingRight: "16px" }}>
                        <a
                          href={`mailto:${data.email}`}
                          style={{
                            color: textColor,
                            textDecoration: "none",
                            fontSize: "13px",
                          }}
                        >
                          ✉ {data.email}
                        </a>
                      </td>
                    )}
                    {data.links.map(
                      (link) =>
                        link.label &&
                        link.url && (
                          <td key={link.id} style={{ paddingRight: "16px" }}>
                            <a
                              href={link.url}
                              style={{
                                color: primaryColor,
                                textDecoration: "none",
                                fontSize: "13px",
                              }}
                            >
                              {link.label}
                            </a>
                          </td>
                        ),
                    )}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  // Minimal style - Simple text only
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
            <p style={{ margin: "0" }}>
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  style={{
                    color: primaryColor,
                    textDecoration: "none",
                  }}
                >
                  {data.email}
                </a>
              )}
              {data.email &&
                data.links.filter((l) => l.label && l.url).length > 0 && (
                  <span style={{ color: mutedColor }}> | </span>
                )}
              {data.links.map((link, index) => (
                <span key={link.id}>
                  {link.label && link.url && (
                    <>
                      <a
                        href={link.url}
                        style={{
                          color: primaryColor,
                          textDecoration: "none",
                        }}
                      >
                        {link.label}
                      </a>
                      {index <
                        data.links.filter((l) => l.label && l.url).length -
                          1 && <span style={{ color: mutedColor }}> | </span>}
                    </>
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
