import { Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center bg-black h-32 px-8 md:px-24 mb-12">
      <div className="flex items-center gap-8">
        <h3 className="text-[2rem] font-bold tracking-tighter leading-tight text-center text-nowrap text-white">
          Reinhold Irishura
        </h3>
        <div className="flex gap-4 items-center mt-0.5">
          <a href="https://www.instagram.com/reinart_image" className="hover:scale-105 transition-all duration-300">
            <Instagram className="text-white" />
          </a>
          <a href="mailto:ireinholdireinhold80@gmail.com" className="hover:scale-105 transition-all duration-300">
            <Mail className="text-white" />
          </a>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center text-nowrap gap-2">
        <a
          href="/contact"
          className="mx-3 bg-white hover:bg-gray-200 hover:text-black border border-white text-black font-bold duration-200 transition-colors text-nowrap px-4 py-2"
        >
          Contact Me
        </a>
        <a
          href="/about"
          className="font-bold hover:underline text-nowrap text-center text-white hover:text-gray-300"
        >
          About Me
        </a>
      </div>
    </footer>
  );
}

export default Footer;
