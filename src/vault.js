export class Vault {
  constructor() {
    this.jobs = [];
    this.running = false;
  }
  schedule(name, everyMs, fn, retries = 3) {
    this.jobs.push({ name, everyMs, fn, retries, next: Date.now() + everyMs, inflight: false });
  }
  start() {
    this.running = true;
    const loop = async () => {
      if (!this.running) return;
      const now = Date.now();
      for (const job of this.jobs) {
        if (job.inflight || now < job.next) continue;
        job.inflight = true;
        let attempt = 1;
        while (attempt <= job.retries) {
          try {
            await job.fn(attempt);
            break;
          } catch (err) {
            console.warn(`! ${job.name} failed attempt ${attempt}: ${err.message}`);
            attempt += 1;
          }
        }
        job.next = Date.now() + job.everyMs;
        job.inflight = false;
      }
      setTimeout(loop, 100);
    };
    loop();
  }
}
