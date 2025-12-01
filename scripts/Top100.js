import fs from "fs";
import path from "path";

const OUTPUT_FILE = path.join(process.cwd(), "public", "top100.json");
const key = process.env.secretOpenSeaKey;

// Delay gegen Rate Limit
const wait = ms => new Promise(res => setTimeout(res, ms));

async function loadTop100() {
  const url = `https://api.opensea.io/api/v2/collections?chain=ethereum&order_by=market_cap&limit=30`;
  const res = await fetch(url, { headers: { "X-API-KEY": key } });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();

  return data.collections.map(col => ({
    slug: col.collection,
    name: col.name,
    image_url: col.image_url,
    opensea_url: col.opensea_url
  }));
}

async function fetchStats(slug) {
  const url = `https://api.opensea.io/api/v2/collections/${slug}/stats`;
  const res = await fetch(url, { headers: { "X-API-KEY": key } });

  if (!res.ok) {
    console.error(`Stats error for ${slug}: ${res.status}`);
    return { slug };
  }

  const data = await res.json();
  return {
    slug,
    floor_price: data.total?.floor_price,
    market_cap: data.total?.market_cap,
  };
}

async function fetchSupply(slug) {
  const url = `https://api.opensea.io/api/v2/collections/${slug}`;
  const res = await fetch(url, { headers: { "X-API-KEY": key } });

  if (!res.ok) {
    console.error(`Supply error for ${slug}: ${res.status}`);
    return { slug };
  }

  const data = await res.json();
  return {
    slug,
    total_supply: data.total_supply
  };
}

async function loadTop100WithStats() {
  try {
    const top100 = await loadTop100();

    const merged = [];

    for (const col of top100) {
      console.log("➡️ Hole Stats:", col.slug);
      const stat = await fetchStats(col.slug);
      await wait(400);

      console.log("➡️ Hole Supply:", col.slug);
      const supply = await fetchSupply(col.slug);
      await wait(400);

      merged.push({ ...col, ...stat, ...supply });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(merged, null, 2));
    console.log("✅ top100.json fertig!");
  } catch (err) {
    console.error("❌ Fehler:", err);
  }
}

loadTop100WithStats().catch(console.error);
