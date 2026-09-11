const crypto = require('crypto');
const KEY_LENGTH = 64;
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) { if (typeof password !== 'string' || password.length < 8) throw new Error('Password must contain at least 8 characters.'); const hash = crypto.scryptSync(password, salt, KEY_LENGTH).toString('hex'); return { salt, hash }; }
function verifyPassword(password, salt, expectedHash) { if (!password || !salt || !expectedHash) return false; const actual = crypto.scryptSync(password, salt, KEY_LENGTH); const expected = Buffer.from(expectedHash, 'hex'); return actual.length === expected.length && crypto.timingSafeEqual(actual, expected); }
function createSessionToken() { return crypto.randomBytes(32).toString('hex'); }
function hashToken(token) { return crypto.createHash('sha256').update(token).digest('hex'); }
module.exports = { hashPassword, verifyPassword, createSessionToken, hashToken };
