import type {
  SignatureData,
  SignatureLink,
  SocialProvider,
  PreviewTheme,
} from "@/types/signature";

interface SignaturePreviewProps {
  data: SignatureData;
  forCopy?: boolean;
  previewTheme?: PreviewTheme;
}

// Social icons as inline SVG for email compatibility
const socialIcons: Record<Exclude<SocialProvider, "custom">, string> = {
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
};

// Email icon (Lucide Mail icon as SVG)
const emailIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;

const providerLabels: Record<Exclude<SocialProvider, "custom">, string> = {
  linkedin: "LinkedIn",
  x: "X",
  github: "GitHub",
  facebook: "Facebook",
  instagram: "Instagram",
};

function renderLinkContent(link: SignatureLink, primaryColor: string) {
  // Use custom label if provided, otherwise fall back to default
  const displayLabel =
    link.label ||
    (link.provider === "custom" ? link.url : providerLabels[link.provider]);

  if (link.provider === "custom") {
    return displayLabel;
  }

  if (link.showIcon) {
    return (
      <span
        style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
      >
        <span
          style={{ display: "inline-flex", color: primaryColor }}
          dangerouslySetInnerHTML={{ __html: socialIcons[link.provider] }}
        />
        <span>{displayLabel}</span>
      </span>
    );
  }

  return displayLabel;
}

export function SignaturePreview({
  data,
  forCopy = false,
  previewTheme = "light",
}: SignaturePreviewProps) {
  const isDark = !forCopy && previewTheme === "dark";
  const primaryColor = forCopy ? "#1e40af" : data.colors.primary;
  const textColor = isDark ? "#f3f4f6" : "#1a1a1a";
  const mutedColor = isDark ? "#9ca3af" : "#6b7280";

  const fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

  const validLinks = data.links.filter((l) => l.url);

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
                  style={{ margin: validLinks.length > 0 ? "0 0 6px 0" : "0" }}
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
              {validLinks.length > 0 && (
                <p style={{ margin: "0" }}>
                  {validLinks.map((link, index) => (
                    <span key={link.id}>
                      <a
                        href={link.url}
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
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span
                            style={{ display: "inline-flex", color: textColor }}
                            dangerouslySetInnerHTML={{ __html: emailIcon }}
                          />
                          <span>{data.email}</span>
                        </a>
                      </td>
                    )}
                    {validLinks.map((link) => (
                      <td key={link.id} style={{ paddingRight: "16px" }}>
                        <a
                          href={link.url}
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
              {data.email && validLinks.length > 0 && (
                <span style={{ color: mutedColor }}> | </span>
              )}
              {validLinks.map((link, index) => (
                <span key={link.id}>
                  <a
                    href={link.url}
                    style={{
                      color: primaryColor,
                      textDecoration: "none",
                    }}
                  >
                    {renderLinkContent(link, primaryColor)}
                  </a>
                  {index < validLinks.length - 1 && (
                    <span style={{ color: mutedColor }}> | </span>
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
