import type { SignatureLink } from "@/types/signature";
import { socialIcons, providerLabels } from "./constants";

/**
 * Add UTM parameters to a given URL.
 * @param url - The original URL
 * @param utmSource - UTM source parameter
 * @param utmMedium - UTM medium parameter
 * @param utmCampaign - UTM campaign parameter
 * @returns URL with UTM parameters appended
 */
export function addUtmParameters(
  url: string,
  utmSource?: string,
  utmMedium?: string,
  utmCampaign?: string,
): string {
  try {
    const urlObj = new URL(url);
    if (utmSource) {
      urlObj.searchParams.set("utm_source", utmSource);
    }
    if (utmMedium) {
      urlObj.searchParams.set("utm_medium", utmMedium);
    }
    if (utmCampaign) {
      urlObj.searchParams.set("utm_campaign", utmCampaign);
    }
    return urlObj.toString();
  } catch {
    // If URL parsing fails, return original URL
    return url;
  }
}

/**
 * Get the final URL for a signature link, adding UTM parameters if specified.
 * @param link - The signature link object
 * @returns Final URL with UTM parameters if applicable
 */
export function getLinkUrl(link: SignatureLink): string {
  if (!link.useUtm) return link.url;

  return addUtmParameters(
    link.url,
    link.utmSource,
    link.utmMedium,
    link.utmCampaign,
  );
}

/**
 * Render the content of a signature link, including icon if specified.
 * @param link - The signature link object
 * @param primaryColor - Primary color for icon styling
 * @returns JSX element or string representing the link content
 */
export function renderLinkContent(link: SignatureLink, primaryColor: string) {
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
