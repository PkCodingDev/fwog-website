"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Collection {
  name: string;
  slug: string;
  image_url?: string;
  floor_price?: number;
  market_cap?: number;
  total_supply?: number;
  fwog_price_equivalent?: number | null;
}

export default function ProjectList() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const FWOG_SUPPLY = 5555;

  useEffect(() => {
    fetch("/top100.json")
      .then((res) => res.json())
      .then((data) => {
        const enhanced = data.map((c: Collection) => ({
          ...c,
          fwog_price_equivalent:
            c.total_supply && c.floor_price
              ? (c.total_supply * c.floor_price) / FWOG_SUPPLY
              : null,
        }));

        setCollections(enhanced);
      })
      .catch((err) => console.error("Error loading Top100:", err));
  }, []);

  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-500 drop-shadow-[0_0_6px_rgba(0,255,0,0.5)]">
        FWOG price based on each collection’s market cap
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((c) => (
          <div
            key={c.slug}
            className="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-sm shadow-lg hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              {c.image_url ? (
                <Image
                  src={c.image_url}
                  alt={c.name}
                  width={60}
                  height={60}
                  className="rounded-xl shadow-md"
                />
              ) : (
                <div className="w-14 h-14 bg-gray-300 rounded-xl" />
              )}

              <div>
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="text-sm text-gray-400">{c.slug}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Floor Price:</span>
                <span className="font-medium">
                  {c.floor_price?.toFixed(2) ?? "-"}
                </span>
              </div>

              <div className="flex justify-between border border-green-500/60 rounded-xl p-2 shadow-[0_0_10px_rgba(0,255,0,0.3)]">
                <span className="text-green-400 font-semibold">
                  FWOG @ market cap:
                </span>
                <span className="font-bold text-green-300">
                  {c.fwog_price_equivalent
                    ? c.fwog_price_equivalent.toFixed(2)
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
