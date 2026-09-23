import { Vault } from "./vault.js";

const vault = new Vault();

vault.schedule("heartbeat", 1000, async () => {
  console.log("♥  cluster heartbeat", new Date().toISOString().slice(11, 19));
});

vault.schedule("invoice-sweep", 2500, async (attempt) => {
  if (attempt === 1 && Math.random() < 0.4) {
    throw new Error("ledger timeout");
  }
  console.log("🧾 invoice sweep ok (attempt", attempt + ")");
});

vault.schedule("model-retrain", 4000, async () => {
  console.log("🧠 shadow retrain tick — 128 samples folded");
});

console.log("ChronoVault armed. Jobs retry up to 3 times.\n");
vault.start();
