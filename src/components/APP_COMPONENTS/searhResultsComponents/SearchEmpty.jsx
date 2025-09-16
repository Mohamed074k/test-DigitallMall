import React from "react";
import { Search } from "lucide-react";
import TextType from "./TextType";

export default function SearchEmpty() {
  return (
    <section className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6">
        <Search size={96} className="text-gray-400 pulse" />
      </div>
      <h2 className="text-2xl font-semibold font-['JetBrains_Mono'] tracking-wide pulse">
        Start Searching
      </h2>
      <div className="mt-3">
        <TextType
          text={[
            "Search anything you want",
            "Search Products",
            "Search Brands",
            "Search Models",
          ]}
          className="font-bold font-['JetBrains_Mono']"
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="_"
        />
      </div>
    </section>
  );
}
