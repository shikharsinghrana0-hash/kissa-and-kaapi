/**
 * Owner Portal credential verification using Web Crypto SHA-256 hashing
 * so plaintext passcodes are never embedded directly in component code.
 */
const OWNER_EMAIL = 'owner@kissaandkaapi.in';
const OWNER_PASSCODE_HASH =
  'a38b9369daf03be4549ff75ddb18bb74703ec25990c4122ce157d8fdd81d3487';

export async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifyOwnerCredentials(email, passcode) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (normalizedEmail !== OWNER_EMAIL) return false;
  const candidateHash = await sha256Hex(String(passcode || ''));
  return candidateHash === OWNER_PASSCODE_HASH;
}
