// A small queue-based rate limiter.
//
// Every call to `schedule()` is placed in a queue and released only when
// BOTH of these are satisfied:
//   1. at least `minGapMs` has passed since the previous request started
//   2. no more than `maxRequestsPerInterval` requests have started in the
//      last `intervalMs` (a sliding window)
//
// This keeps us well under TheMealDB's fair-use limits and stops a fast
// typer / accidental double-click from firing a burst of requests.

class RateLimiter {
  constructor({ maxRequestsPerInterval = 5, intervalMs = 1000, minGapMs = 150 } = {}) {
    this.maxRequestsPerInterval = maxRequestsPerInterval;
    this.intervalMs = intervalMs;
    this.minGapMs = minGapMs;

    this.queue = [];
    this.timestamps = [];
    this.lastRunAt = 0;
    this.isProcessing = false;
  }

  schedule(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this._processQueue();
    });
  }

  async _processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const now = Date.now();
      // drop timestamps that have fallen outside the sliding window
      this.timestamps = this.timestamps.filter((t) => now - t < this.intervalMs);

      const gapWait = Math.max(0, this.lastRunAt + this.minGapMs - now);
      const windowWait =
        this.timestamps.length >= this.maxRequestsPerInterval
          ? this.intervalMs - (now - this.timestamps[0])
          : 0;

      const wait = Math.max(gapWait, windowWait);

      if (wait > 0) {
        await sleep(wait);
        continue;
      }

      const { task, resolve, reject } = this.queue.shift();
      this.lastRunAt = Date.now();
      this.timestamps.push(this.lastRunAt);

      try {
        resolve(await task());
      } catch (err) {
        reject(err);
      }
    }

    this.isProcessing = false;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Shared limiter for every TheMealDB request made by the app:
// max 5 requests per second, at least 150ms apart.
export const mealDbLimiter = new RateLimiter({
  maxRequestsPerInterval: 5,
  intervalMs: 1000,
  minGapMs: 150,
});
