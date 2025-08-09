"use client";
import { useRef } from "react";
import VariableProximity from "./animated-components/variable-proximity";
export function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 md:px-8 lg:px-24 py-4 lg:py-6 overflow-hidden">
      <div className="flex-1">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-tight text-center lg:text-left transition-[font-size] duration-500 text-white">
          <div 
            ref={containerRef} 
            className="relative min-h-[1.2em] flex items-center justify-center lg:justify-start"
          >
            <VariableProximity
              label="REINART"
              className="variable-proximity-demo text-white md:text-8xl"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 900, 'opsz' 40"
              containerRef={containerRef}
              radius={150}
              falloff="exponential"
              style={{ 
                fontVariationSettings: "'wght' 400, 'opsz' 9"
              }}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1 sm:gap-2 text-base sm:text-lg md:text-xl lg:text-2xl font-normal tracking-tight leading-tight lg:text-left text-center transition-[font-size] duration-500 text-white mt-1 lg:mt-2">
            <h4 className="text-white">Reinhold Irishura</h4>
            <h4 className="opacity-0 h-0 sm:opacity-100 sm:h-auto transition-opacity duration-500 text-gray-400">-</h4>
            <h4 className="font-bold text-white">Photographer</h4>
          </div>
        </h1>
      </div>
      <nav className="flex-shrink-0 h-fit flex flex-row justify-center lg:justify-end gap-2 mb-4 mt-6 lg:mb-0 lg:mt-0 text-white text-sm sm:text-base">
        <a
          href="/"
          className="relative transition-colors duration-300 text-white hover:text-gray-300 after:content-[''] after:absolute after:w-full after:h-px after:bg-current after:left-0 after:bottom-0 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 px-1"
        >
          HOME
        </a>
        <span className="text-gray-400 px-1"> | </span>
        <a
          href="/about"
          className="relative transition-colors duration-300 text-white hover:text-gray-300 after:content-[''] after:absolute after:w-full after:h-px after:bg-current after:left-0 after:bottom-0 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 px-1"
        >
          ABOUT
        </a>
        <span className="text-gray-400 px-1"> | </span>
        <a
          href="/contact"
          className="relative transition-colors duration-300 text-white hover:text-gray-300 after:content-[''] after:absolute after:w-full after:h-px after:bg-current after:left-0 after:bottom-0 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 px-1"
        >
          CONTACT
        </a>
      </nav>
    </section>
  );
}
