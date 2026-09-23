# ChronoVault

Tiny **job vault**: interval scheduling, in-flight guards, bounded retries. Demonstrates the core of Bull/Agenda without a broker.

## Run
```bash
node src/index.js
```

Swap the loop for Redis + worker processes when you outgrow a single node.
