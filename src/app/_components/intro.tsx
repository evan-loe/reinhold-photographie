'use client';
import { useRef } from 'react';
import VariableProximity from './animated-components/variable-proximity';

export function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          <div
            ref={containerRef}
            style={{ position: 'relative' }}
          >
            <VariableProximity
              label="REINART."
              className="variable-proximity-demo"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 900, 'opsz' 40"
              containerRef={containerRef}
              radius={150}
              falloff="exponential"
            />
          </div>
        </h1>
        <h4 className="text-xl md:text-2xl font-normal tracking-tight leading-tight lg:ml-1">
          Reinhold Irishura | Photographie
        </h4>
      </div>
      <nav className="flex items-center justify-center md:justify-start mt-5 md:mt-0 gap-6">
        <a
          href="/"
          className="relative transition-colors duration-300 after:content-[''] after:absolute after:w-full after:h-px after:bg-current after:left-0 after:bottom-0 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          HOME
        </a>
        <a
          href="/about"
          className="relative transition-colors duration-300 after:content-[''] after:absolute after:w-full after:h-px after:bg-current after:left-0 after:bottom-0 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          ABOUT
        </a>
        <a
          href="/contact"
          className="relative transition-colors duration-300 after:content-[''] after:absolute after:w-full after:h-px after:bg-current after:left-0 after:bottom-0 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          CONTACT
        </a>
      </nav>
    </section>
  );
}
