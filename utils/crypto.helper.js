const crypto = require('crypto');

/**
 * Hashes a value using SHA-256 and returns it as a hex string.
 * @param {string} value - The value to hash.
 * @returns {string} - SHA-256 hash in hex.
 */
const hashSha256 = (value) =>
  crypto.createHash('sha256').update(value).digest('hex');

/**
 * Creates a standard random token and its hashed version.
 * @param {number} [byteLength=32] - Number of random bytes (default 32).
 * @returns {Object} - { token: plaintext token, hashedToken: hashed version }
 */
const generateStandardToken = (byteLength = 32) => {
  const token = crypto.randomBytes(byteLength).toString('hex'); // e.g., 64 chars for 32 bytes
  const hashedToken = hashSha256(token);
  return { token, hashedToken };
};

module.exports = { hashSha256, generateStandardToken };
