'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import ClimateSealLogo from './ClimateSealLogo';
import { useLanguage, LanguageSwitcher } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const { t, language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    { name: t.nav.home, href: '#home', route: '/' },
    { 
      name: language === 'zh' ? '解决方案' : 'Solutions', 
      href: '#', 
      route: '/', 
      hasDropdown: true,
      dropdownItems: [
        { name: t.sections.personas.carbonExpert.title, href: '/solutions/carbon-expert', route: '/solutions/carbon-expert' },
        { name: t.sections.personas.brandOwner.title, href: '/solutions/brand-owner', route: '/solutions/brand-owner' },
        { name: t.sections.personas.supplyChain.title, href: '/solutions/supply-chain', route: '/solutions/supply-chain' },
      ]
    },
    { name: t.nav.resources, href: '/resources', route: '/resources', isLink: true },
    { name: t.nav.pricing, href: '#pricing', route: '/' },
    { name: t.nav.about, href: '#about', route: '/' },
    { name: t.nav.contact, href: '#contact', route: '/' },
    { name: 'FAQ', href: '/faq', route: '/faq', isLink: true },
  ];

  const handleNavClick = (href: string, route: string) => {
    setIsOpen(false);
    
    // If we're not on the homepage, navigate to homepage first
    if (pathname !== '/') {
      router.push(route + href);
      return;
    }
    
    // If we're on homepage, smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle dropdown with delay to prevent accidental closes
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsSolutionsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsSolutionsOpen(false);
    }, 200); // 200ms delay before closing
  };

  const handleDropdownClick = () => {
    setIsSolutionsOpen(!isSolutionsOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
    };

    if (isSolutionsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSolutionsOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="bg-[rgb(0,52,50)] bg-opacity-95 backdrop-blur-sm shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 sm:h-24">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <ClimateSealLogo />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              // Special handling for Resources (direct link)
              if (item.isLink) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-lg font-medium transition duration-300"
                  >
                    {item.name}
                  </Link>
                );
              }
              
              // Dropdown menu handling
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.name}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={handleDropdownClick}
                      className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-lg font-medium transition duration-300 cursor-pointer flex items-center gap-1"
                      aria-expanded={isSolutionsOpen}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isSolutionsOpen && (
                      <div 
                        className="absolute top-full left-0 mt-1 w-64 bg-[rgb(0,52,50)] border border-white/20 rounded-lg shadow-xl py-2 z-50"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="block px-5 py-3 text-white hover:bg-white/10 hover:text-yellow-400 transition duration-200 text-base font-medium"
                            onClick={() => {
                              setIsSolutionsOpen(false);
                              if (timeoutRef.current) {
                                clearTimeout(timeoutRef.current);
                              }
                            }}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.route)}
                  className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-lg font-medium transition duration-300 cursor-pointer"
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-400 hover:bg-teal-800"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-teal-800 bg-opacity-95">
              {navItems.map((item) => {
                // Special handling for Resources in mobile
                if (item.isLink) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-lg font-medium w-full text-left"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                }
                
                // Dropdown menu handling for mobile
                if (item.hasDropdown) {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                        className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-lg font-medium w-full text-left flex items-center justify-between"
                      >
                        {item.name}
                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isSolutionsOpen && (
                        <div className="pl-4 space-y-1">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className="text-white/80 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium"
                              onClick={() => {
                                setIsOpen(false);
                                setIsSolutionsOpen(false);
                              }}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href, item.route)}
                    className="text-white hover:text-yellow-400 block px-3 py-2 rounded-md text-lg font-medium w-full text-left"
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;