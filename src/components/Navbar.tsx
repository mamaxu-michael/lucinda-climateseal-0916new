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
    { name: t.nav.contact, href: '#contact', route: '/' },
    { name: 'FAQ', href: '/faq', route: '/faq', isLink: true },
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

  const handleSolutionNavigate = (href: string) => {
    setIsOpen(false);
    setIsSolutionsOpen(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    router.push(href);
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
    <nav className="fixed z-50 w-full border-b border-white/10 bg-[#003531]/95 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between sm:h-24">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <ClimateSealLogo />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => {
                // Special handling for Resources (direct link)
                if (item.isLink) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="px-1 py-2 font-source-sans text-[0.95rem] font-semibold tracking-[0.02em] text-white/90 transition duration-300 hover:text-[#d6e8df]"
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
                        className="flex cursor-pointer items-center gap-1 px-1 py-2 font-source-sans text-[0.95rem] font-semibold tracking-[0.02em] text-white/90 transition duration-300 hover:text-[#d6e8df]"
                        aria-expanded={isSolutionsOpen}
                        aria-haspopup="true"
                      >
                        {item.name}
                        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isSolutionsOpen && (
                        <div 
                          className="absolute left-0 top-full z-50 mt-2 w-64 rounded-2xl border border-white/10 bg-[#003531] py-2 shadow-[0_18px_40px_rgba(0,0,0,0.24)]"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className="block px-5 py-3 font-source-sans text-[0.95rem] font-medium text-white/90 transition duration-200 hover:bg-white/10 hover:text-[#d6e8df]"
                              onMouseDown={() => {
                                if (timeoutRef.current) {
                                  clearTimeout(timeoutRef.current);
                                  timeoutRef.current = null;
                                }
                              }}
                              onClick={(event) => {
                                event.preventDefault();
                                handleSolutionNavigate(dropdownItem.href);
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
                    className="cursor-pointer px-1 py-2 font-source-sans text-[0.95rem] font-semibold tracking-[0.02em] text-white/90 transition duration-300 hover:text-[#d6e8df]"
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-[0.6rem] bg-white px-4 py-2 text-[0.9rem] font-semibold text-[#003531] transition duration-300 hover:bg-[#d6e8df]"
            >
              {language === 'zh' ? '预约演示' : 'Book a Demo'}
            </Link>
            <div className="border-l border-white/15 pl-4">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-[0.55rem] bg-white px-3 py-2 text-xs font-semibold text-[#003531]"
            >
              {language === 'zh' ? '演示' : 'Demo'}
            </Link>
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:bg-white/10 hover:text-[#d6e8df]"
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
            <div className="space-y-1 rounded-b-2xl border-x border-b border-white/10 bg-[#003531] px-2 pb-3 pt-2 shadow-[0_16px_30px_rgba(0,0,0,0.24)] sm:px-3">
              {navItems.map((item) => {
                // Special handling for Resources in mobile
                if (item.isLink) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block w-full rounded-md px-3 py-2 text-left font-source-sans text-base font-semibold text-white/90 hover:bg-white/10 hover:text-[#d6e8df]"
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
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-source-sans text-base font-semibold text-white/90 hover:bg-white/10 hover:text-[#d6e8df]"
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
                              className="block rounded-md px-3 py-2 font-source-sans text-sm font-medium text-white/70 hover:bg-white/10 hover:text-[#d6e8df]"
                              onClick={(event) => {
                                event.preventDefault();
                                handleSolutionNavigate(dropdownItem.href);
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
                    className="block w-full rounded-md px-3 py-2 text-left font-source-sans text-base font-semibold text-white/90 hover:bg-white/10 hover:text-[#d6e8df]"
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
