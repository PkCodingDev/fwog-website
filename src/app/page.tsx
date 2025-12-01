"use client";

import ProjectList from "./components/ProjectList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen text-white p-8 overflow-hidden">
      {/* Headline + X button as Image */}
      <div className="mb-12 flex flex-col items-center relative z-10">
        <h1 className="text-6xl font-bold mb-6 text-center text-green-500 drop-shadow-[0_0_6px_rgba(0,255,0,0.5)]">
          ITS JUST A FWOG!
        </h1>

        {/* X Logo with Link */}
        <a
          href="https://x.com/itsafwog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/X.svg"
            alt="X Logo"
            width={50}
            height={50}
            className="hover:scale-110 transition-transform duration-200 filter invert brightness-0"
          />
        </a>
      </div>

      {/* Project List */}
      <div className="relative z-10">
        <ProjectList />
      </div>
    </main>
  );
}
