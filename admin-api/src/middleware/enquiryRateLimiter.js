/**
 * Public Enquiry Rate Limiter & Anti-Spam Middleware
 * - Limits public enquiry submissions to 5 attempts per 10 minutes per client IP.
 * - Protects against bot flooding and storage exhaustion.
 * - Checks for automated honeypot spam fields.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ENQUIRIES = 5;
const MAX_TRACKED_IPS = 10000;

const ipStore = new Map();

function evictOldEntries() {
  const now = Date.now();
  for (const [ip, data] of ipStore.entries()) {
    if (now - data.firstAttempt > WINDOW_MS) {
      ipStore.delete(ip);
    }
  }

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

const cleanupInterval = setInterval(evictOldEntries, 3 * 60 * 1000);
if (cleanupInterval.unref) {
  cleanupInterval.unref();
}

const enquiryRateLimiter = (req, res, next) => {
  // 1. Honeypot check (hidden field that bots autofill, but humans never see)
  if (req.body && (req.body.website_url || req.body.hp_field)) {
    // Return fake success to bots so they don't retry or adapt
    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been received successfully!',
    });
  }

  // 2. IP Rate Limiting
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry) {
    if (ipStore.size >= MAX_TRACKED_IPS) {
      evictOldEntries();
    }
    ipStore.set(ip, { count: 1, firstAttempt: now });
    return next();
  }

  if (now - entry.firstAttempt > WINDOW_MS) {
    entry.count = 1;
    entry.firstAttempt = now;
    return next();
  }

  entry.count += 1;

  if (entry.count > MAX_ENQUIRIES) {
    const remainingMs = WINDOW_MS - (now - entry.firstAttempt);
    const remainingMin = Math.ceil(remainingMs / (60 * 1000));

    return res.status(429).json({
      success: false,
      message: `Too many submissions from this connection. Please try again in ${remainingMin} minute(s) or call us directly at +91 95390 00640.`,
    });
  }

  next();
};

module.exports = {
  enquiryRateLimiter,
};

