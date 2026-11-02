/**
 * Admin Login Rate Limiter
 * Enforces a policy of 5 failed login attempts per client IP within a 15-minute window.
 * The 6th attempt is blocked with HTTP 429.
 * Successful logins reset the counter for the IP.
 */

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FAILED_ATTEMPTS = 5;
const MAX_TRACKED_IPS = 10000;

// Map: clientIp -> { count: number, firstAttempt: number, lastAttempt: number }
const ipStore = new Map();

/**
 * Evicts expired entries, and if still at capacity, evicts oldest entries.
 */
function evictOldEntries() {
  const now = Date.now();

  // Phase 1: Evict expired entries
  for (const [ip, data] of ipStore.entries()) {
    if (now - data.firstAttempt > WINDOW_MS) {
      ipStore.delete(ip);
    }
  }

  // Phase 2: If still over capacity, evict oldest entries by insertion/firstAttempt
  if (ipStore.size >= MAX_TRACKED_IPS) {
    const toRemove = ipStore.size - MAX_TRACKED_IPS + 1;
    let removed = 0;
    for (const [ip] of ipStore.entries()) {
      ipStore.delete(ip);
      removed++;
      if (removed >= toRemove) break;
    }
  }
}

// Background cleanup every 5 minutes (unref'd to not prevent process termination)
const cleanupInterval = setInterval(evictOldEntries, 5 * 60 * 1000);
if (cleanupInterval.unref) {
  cleanupInterval.unref();
}

/**
 * Express middleware for login rate limiting.
 */
const loginRateLimiter = (req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  let record = ipStore.get(ip);

  // If entry expired, reset it
  if (record && now - record.firstAttempt > WINDOW_MS) {
    ipStore.delete(ip);
    record = undefined;
  }

  // If IP has accumulated 5 or more failed attempts, block request
  if (record && record.count >= MAX_FAILED_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil((record.firstAttempt + WINDOW_MS - now) / 1000);

    res.setHeader('Retry-After', String(Math.max(1, retryAfterSeconds)));
    res.setHeader('RateLimit-Limit', String(MAX_FAILED_ATTEMPTS));
    res.setHeader('RateLimit-Remaining', '0');
    res.setHeader('RateLimit-Reset', String(Math.max(1, retryAfterSeconds)));

    return res.status(429).json({
      success: false,
      message: 'Too many login attempts. Please try again later.',
    });
  }

  // Set initial RateLimit headers for non-blocked requests
  const remaining = record ? Math.max(0, MAX_FAILED_ATTEMPTS - record.count) : MAX_FAILED_ATTEMPTS;
  const resetSec = record ? Math.ceil((record.firstAttempt + WINDOW_MS - now) / 1000) : Math.ceil(WINDOW_MS / 1000);

  res.setHeader('RateLimit-Limit', String(MAX_FAILED_ATTEMPTS));
  res.setHeader('RateLimit-Remaining', String(remaining));
  res.setHeader('RateLimit-Reset', String(Math.max(1, resetSec)));

  // Intercept response completion to track failures vs successes
  res.on('finish', () => {
    const statusCode = res.statusCode;

    // On failed authentication (401 or 400 validation failure)
    if (statusCode === 401 || statusCode === 400) {
      evictOldEntries();
      const existing = ipStore.get(ip);
      const currentTime = Date.now();

      if (!existing || currentTime - existing.firstAttempt > WINDOW_MS) {
        ipStore.set(ip, {
          count: 1,
          firstAttempt: currentTime,
          lastAttempt: currentTime,
        });
      } else {
        existing.count += 1;
        existing.lastAttempt = currentTime;
      }
    } else if (statusCode === 200) {
      // Successful login clears failure counter for this IP
      ipStore.delete(ip);
    }
  });

  next();
};

// Helper for tests to inspect store or reset
loginRateLimiter._getStore = () => ipStore;
loginRateLimiter._clearStore = () => ipStore.clear();
loginRateLimiter.evictOldEntries = evictOldEntries;

module.exports = loginRateLimiter;
