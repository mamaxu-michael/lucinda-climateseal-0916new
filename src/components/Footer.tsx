import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[rgb(0,52,50)] text-white/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">© {new Date().getFullYear()} Climate Seal</div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-white/80 hover:text-white text-sm" aria-label="Privacy Policy">
            Privacy Policy
          </Link>
          <Link
            href="https://www.linkedin.com/company/climateseal/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-gray-100 transition-colors"
          >
            {/* LinkedIn SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-[#0A66C2]"
            >
              <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5Zm-9.5 18H6V9h3.5v9ZM7.75 7.75A1.75 1.75 0 1 1 7.751 4.25 1.75 1.75 0 0 1 7.75 7.75ZM20 18h-3.5v-4.75c0-1.131-.919-2.05-2.05-2.05s-2.05.919-2.05 2.05V18H8.85V9H12v1.053c.664-.81 1.803-1.353 2.95-1.353 2.214 0 4.05 1.836 4.05 4.05V18Z"/>
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;