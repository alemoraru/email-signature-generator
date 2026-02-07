/**
 * Validation utilities for email signature fields
 */

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Validates email format
 * @param email The email string to validate
 * @returns ValidationResult indicating if the email is valid and an optional message
 */
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: true }; // Empty is valid (optional)
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  return {
    isValid,
    message: isValid ? undefined : "Please enter a valid email address",
  };
}

/**
 * Validates URL format
 * @param url The URL string to validate
 * @returns ValidationResult indicating if the URL is valid and an optional message
 */
export function validateUrl(url: string): ValidationResult {
  if (!url) {
    return { isValid: true }; // Empty is valid (optional)
  }

  try {
    const urlObj = new URL(url);
    const isValid = urlObj.protocol === "http:" || urlObj.protocol === "https:";

    return {
      isValid,
      message: isValid ? undefined : "URL must start with http:// or https://",
    };
  } catch {
    return {
      isValid: false,
      message: "Please enter a valid URL (e.g., https://example.com)",
    };
  }
}

/**
 * Validates phone number format (permissive)
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone) {
    return { isValid: true }; // Empty is valid (optional)
  }

  // Very permissive phone validation - just check it has some digits
  const hasDigits = /\d/.test(phone);
  const hasEnoughDigits = (phone.match(/\d/g) || []).length >= 7;

  const isValid = hasDigits && hasEnoughDigits;

  return {
    isValid,
    message: isValid
      ? undefined
      : "Phone number should contain at least 7 digits",
  };
}

/**
 * Formats phone number with common patterns
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // US format: (XXX) XXX-XXXX
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  // International format: +X XXX XXX XXXX
  if (digits.length === 11) {
    return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  // Return original if it doesn't match common patterns
  return phone;
}
