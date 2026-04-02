import React from 'react';
import { Menu, X, Lightbulb } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-2 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/" className="flex items-center">
              <span className="text-indigo-600 text-5xl font-bold tracking-tight drop-shadow-lg">CRO</span>
              <div className="relative flex items-center -ml-1 pt-1">
                <Lightbulb className="h-14 w-14 text-gray-500 drop-shadow-lg" />
                <span className="absolute inset-0 flex items-start pt-3 justify-center text-gray-500 text-medium font-bold drop-shadow-lg">IQ</span>
              </div>
            </a>
          </div>
          
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          <nav className="hidden md:flex space-x-10">
            <a href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
              About
            </a>
            <a href="/services" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Services
            </a>
            <a href="/insights" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Insights
            </a>
            <a
              href="https://www.linkedin.com/in/stevemarritt/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              LinkedIn
            </a>
          </nav>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a
              href="https://calendly.com/steve-croiq/30-minute-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5 space-y-6">
              <div className="space-y-6">
                <a href="/about" className="block text-base font-medium text-gray-900 hover:text-gray-700">
                  About
                </a>
                <a href="/services" className="block text-base font-medium text-gray-900 hover:text-gray-700">
                  Services
                </a>
                <a href="/insights" className="block text-base font-medium text-gray-900 hover:text-gray-700">
                  Insights
                </a>
                <a
                  href="https://www.linkedin.com/in/stevemarritt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  LinkedIn
                </a>
                <a
                  href="https://calendly.com/steve-croiq/30-minute-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Book a Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;