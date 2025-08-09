import { LiquidChrome } from "../_components/animated-components/liquid-chrome";
import { TiltImage } from "../_components/animated-components/tilt-image";

export default function About() {
  return (
    <main className="flex flex-col md:flex-row justify-center items-center py-4 md:py-8 px-8 lg:px-24 min-h-screen md:min-h-fit">
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl w-full">
        {/* Image Section */}
        <div className="flex justify-center items-start flex-shrink-0 w-full max-w-sm md:max-w-md lg:w-96">
          <TiltImage
            src="/assets/reinhold_phone.jpeg"
            alt="Reinhold Irishura"
            className="shadow-2xl w-full"
          />
        </div>

        {/* Text Section */}
        <div className="space-y-6 md:space-y-8 text-center lg:text-right flex-1 lg:flex-[2] w-full">
          <div className="flex flex-col items-center lg:items-end space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight max-w-full">
              My name is{" "}
              <span className="text-gray-300 block sm:inline">
                Reinhold Irishura
              </span>
            </h1>

            <div className="w-16 h-1 bg-white rounded-full"></div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-full">
              I am passionate about capturing the beauty of the world through my
              lens. With a focus on natural light and candid moments, I strive
              to tell stories that resonate with viewers.
            </p>

            <p className="text-sm md:text-base lg:text-lg text-gray-400 leading-relaxed max-w-full">
              Whether it's a serene landscape, an intimate portrait, or a
              vibrant cityscape, my goal is to evoke emotion and inspire
              appreciation for the art of photography. Thank you for visiting my
              site, and I hope you enjoy exploring my work as much as I enjoyed
              creating it.
            </p>
          </div>

          <div className="pt-2 md:pt-4">
            <p className="text-base md:text-lg font-medium text-gray-200 italic max-w-full">
              Let's work together to create something beautiful.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-end items-stretch sm:items-center w-full">
              <a
                href="mailto:hello@reinholdirishura.com"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center"
              >
                Get In Touch
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 border border-gray-600 text-white font-medium rounded-lg hover:border-gray-400 hover:text-gray-300 transition-colors duration-200 text-center"
              >
                View Gallery
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-[-1] opacity-50 h-screen w-screen">
        <LiquidChrome
          baseColor={[0.05, 0.05, 0.05]}
          speed={0.1}
          amplitude={0.1}
          interactive={true}
        />
      </div>
    </main>
  );
}
