import type { SignatureData } from "@/types/signature";

const VERSION_PREFIX = "v1_";

/**
 * Converts a string to a URL-safe base64 format
 */
function toUrlSafeBase64(base64: string): string {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "~");
}

/**
 * Converts a URL-safe base64 string back to standard base64
 */
function fromUrlSafeBase64(urlSafe: string): string {
  return urlSafe.replace(/-/g, "+").replace(/_/g, "/").replace(/~/g, "=");
}

/**
 * Compresses data using browser's native compression API
 */
async function compressData(data: string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(data));
      controller.close();
    },
  });

  const compressedStream = stream.pipeThrough(new CompressionStream("gzip"));
  const reader = compressedStream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  // Combine all chunks into a single Uint8Array
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

/**
 * Decompresses data using browser's native decompression API
 */
async function decompressData(compressed: Uint8Array): Promise<string> {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(compressed);
      controller.close();
    },
  });

  const decompressedStream = stream.pipeThrough(
    new DecompressionStream("gzip"),
  );
  const reader = decompressedStream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  // Combine all chunks
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  const decoder = new TextDecoder();
  return decoder.decode(result);
}

/**
 * Converts Uint8Array to base64 string
 */
function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Converts base64 string to Uint8Array
 */
function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Encodes signature data to a URL parameter string (without logo)
 */
export async function encodeSignatureToUrl(
  data: SignatureData,
): Promise<string> {
  try {
    // Strip logo from data
    const { logo, ...dataWithoutLogo } = data;

    // Convert to JSON
    const json = JSON.stringify(dataWithoutLogo);

    // Compress
    const compressed = await compressData(json);

    // Convert to base64
    const base64 = uint8ArrayToBase64(compressed);

    // Make URL-safe and add version prefix
    const urlSafe = toUrlSafeBase64(base64);

    return `${VERSION_PREFIX}${urlSafe}`;
  } catch (error) {
    console.error("Failed to encode signature:", error);
    throw new Error("Failed to encode signature data");
  }
}

/**
 * Decodes signature data from URL parameter (without logo)
 */
export async function decodeSignatureFromUrl(
  encoded: string,
): Promise<Partial<SignatureData>> {
  try {
    // Validate version prefix
    if (!encoded.startsWith(VERSION_PREFIX)) {
      throw new Error("Invalid or unsupported share link version");
    }

    // Remove version prefix
    const urlSafe = encoded.slice(VERSION_PREFIX.length);

    // Convert from URL-safe base64
    const base64 = fromUrlSafeBase64(urlSafe);

    // Convert to Uint8Array
    const compressed = base64ToUint8Array(base64);

    // Decompress
    const json = await decompressData(compressed);

    // Parse JSON
    const data = JSON.parse(json) as Partial<SignatureData>;

    // Basic validation
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid signature data format");
    }

    return data;
  } catch (error) {
    console.error("Failed to decode signature:", error);
    throw new Error("Invalid or corrupted share link");
  }
}

/**
 * Generates a full share URL with encoded signature data
 */
export async function getShareUrl(data: SignatureData): Promise<string> {
  const encoded = await encodeSignatureToUrl(data);
  const origin = window.location.origin;
  const shareUrl = `${origin}/editor?s=${encoded}`;

  // Check URL length
  if (shareUrl.length > 2000) {
    throw new Error(
      "Signature is too complex to share via URL. Try removing some links or simplifying the data.",
    );
  }

  return shareUrl;
}
