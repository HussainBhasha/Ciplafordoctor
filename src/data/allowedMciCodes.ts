/**
 * ============================================================================
 * CIPLOSTEM - ALLOWED MCI / MEDICAL COUNCIL CODES REGISTRY
 * ============================================================================
 * 
 * HOW TO UPLOAD / ADD MCI CODES:
 * ----------------------------------------------------------------------------
 * 1. Paste your approved MCI / State Medical Council registration numbers into
 *    the `ALLOWED_MCI_CODES` array below.
 * 2. You can paste them in any common format (e.g., "MCI-12345", "12345", "DMC-98765").
 * 3. Matching is CASE-INSENSITIVE and ignores spaces, hyphens, and slashes.
 * 
 * ENFORCEMENT MODE:
 * ----------------------------------------------------------------------------
 * - ENFORCE_CODE_LIST = false (Default for testing):
 *   Allows any properly formatted Medical Council code (3 to 25 alphanumeric chars).
 * 
 * - ENFORCE_CODE_LIST = true (Strict mode):
 *   Only allows doctors whose MCI code exists in the `ALLOWED_MCI_CODES` list.
 */

export const ENFORCE_CODE_LIST: boolean = false;

export const ALLOWED_MCI_CODES: string[] = [
  // --- Sample MCI / State Medical Council Codes for testing ---
  "MCI-12345",
  "MCI-67890",
  "MCI-11223",
  "MCI-99887",
  "DMC-45678",
  "KMC-87654",
  "MMC-34567",
  "12345",
  "123456",
  // ------------------------------------------------------------
  // UPLOAD YOUR CODES HERE:
  // You can paste your codes below as comma-separated quoted strings:
  // "CODE1", "CODE2", "CODE3", ...
];

/**
 * Normalizes an MCI code by removing spaces, hyphens, and slashes,
 * and converting to uppercase for flexible comparison.
 * e.g., "mci-12345" -> "MCI12345"
 */
export function normalizeMci(code: string): string {
  return code.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

// Pre-compute normalized set for fast O(1) lookup
const NORMALIZED_ALLOWED_SET = new Set(ALLOWED_MCI_CODES.map(normalizeMci));

/**
 * Validates whether an entered MCI code is acceptable.
 * @param input The raw MCI code entered by the doctor
 * @returns { valid: boolean; error?: string; normalized?: string }
 */
export function validateMciCode(input: string): { valid: boolean; error?: string; normalized?: string } {
  const trimmed = input.trim();

  if (!trimmed) {
    return { valid: false, error: "Please enter your MCI / Medical Council Registration Number." };
  }

  // Format validation: 3 to 25 characters, alphanumeric with optional hyphens, slashes, or spaces
  const formatRegex = /^[A-Za-z0-9\-\/\s]{3,25}$/;
  if (!formatRegex.test(trimmed)) {
    return {
      valid: false,
      error: "Please enter a valid format (3-25 alphanumeric characters, hyphens or slashes allowed)."
    };
  }

  const normalized = normalizeMci(trimmed);

  // Must have at least 3 alphanumeric characters
  if (normalized.length < 3) {
    return {
      valid: false,
      error: "MCI code must contain at least 3 alphanumeric characters."
    };
  }

  // If strict enforcement is turned on, check against the uploaded list
  if (ENFORCE_CODE_LIST) {
    if (!NORMALIZED_ALLOWED_SET.has(normalized)) {
      return {
        valid: false,
        error: "This MCI code was not found in the verified registry. Please check and try again."
      };
    }
  }

  return { valid: true, normalized };
}
