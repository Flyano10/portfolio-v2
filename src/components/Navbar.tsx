'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiHome, HiUser, HiFolder, HiMail } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navItems = [
    { name: 'Home', href: '/', icon: HiHome },
    { name: 'About', href: '/about', icon: HiUser },
    { name: 'Projects', href: '/projects', icon: HiFolder },
    { name: 'Contact', href: '/contact', icon: HiMail },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg dark:bg-gray-900/95 border-b border-gray-200/50 dark:border-gray-800/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group"
            >
              <motion.div
                className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-gray-900 dark:border-white"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/profile-2.jpg"
                  alt="Rafly Juliano"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 32px, 40px"
                />
              </motion.div>
              <span className="text-base md:text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent transition-all duration-300">
                Rafly Juliano
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg flex items-center space-x-2 ${
                        active
                          ? 'text-gray-900 dark:text-white font-semibold bg-gray-100 dark:bg-gray-800'
                          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation - Floating Style */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden"
      >
        <div className="bg-white/95 backdrop-blur-lg dark:bg-gray-900/95 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl px-2 py-2">
          <div className="flex items-center justify-center gap-1">
            {navItems.map((item, index) => {
              const active = isActive(item.href);
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                      active
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </>
  );
}

