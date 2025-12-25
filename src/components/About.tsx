'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { SiReact, SiTailwindcss, SiNodedotjs } from 'react-icons/si';
import { HiX } from 'react-icons/hi';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  // Keyboard handler for modal
  useEffect(() => {
    if (!isCertificateModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCertificateModalOpen(false);
        document.body.style.overflow = 'unset';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCertificateModalOpen]);

  const techStacks = [
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen pt-24 pb-20 bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8 overflow-hidden" ref={ref}>
      {/* Minimal background - lebih subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-64 h-64 bg-gray-100 dark:bg-gray-800/30 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-32 left-16 w-80 h-80 bg-gray-50 dark:bg-gray-800/30 rounded-full blur-3xl opacity-15"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header - lebih natural, tidak terlalu centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-0.5 w-10 bg-gray-900 dark:bg-white"></div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              About
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white leading-tight">
            About Me
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl">
            Get to know more about my journey and what drives me
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-start"
        >
          {/* ID Card Photo Section - muncul pertama di mobile */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end relative w-full order-1 lg:order-2"
          >
            <div className="relative w-full max-w-sm">
              {/* ID Card Container - muncul dari atas dengan efek swing */}
              <motion.div
                initial={{ opacity: 0, y: -300, rotateX: -15 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  rotate: [0, 1.5, -1.5, 0.5, -0.5, 0]
                } : {}}
                transition={{ 
                  y: { duration: 0.7, delay: 0.5, type: "spring", stiffness: 120, damping: 15 },
                  rotateX: { duration: 0.5, delay: 0.5 },
                  rotate: { duration: 1.2, delay: 1.2, ease: "easeOut" }
                }}
                className="relative"
              >
                {/* ID Card Shadow */}
                <div className="absolute inset-0 bg-gray-900/20 dark:bg-gray-900/40 rounded-lg blur-xl transform translate-y-4"></div>
                
                {/* ID Card - lebih realistis */}
                <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-300 dark:border-gray-600">
                  {/* ID Card Header - Black dengan pattern */}
                  <div className="relative bg-gray-900 dark:bg-white px-4 py-3 overflow-hidden">
                    {/* Subtle pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                      }}></div>
                    </div>
                    <div className="relative flex items-center justify-between">
                      <div>
                        <h3 className="text-white dark:text-gray-900 font-bold text-sm tracking-wide">STUDENT ID</h3>
                        <p className="text-gray-300 dark:text-gray-600 text-[10px] mt-0.5 leading-tight">Universitas Bina Sarana Informatika</p>
                      </div>
                      <div className="w-9 h-9 bg-white/20 dark:bg-gray-900/20 rounded-full flex items-center justify-center border border-white/30 dark:border-gray-900/30">
                        <svg className="w-5 h-5 text-white dark:text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Photo Section - lebih bagus */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
                    <div className="relative mx-auto" style={{ width: '160px', height: '200px' }}>
                      {/* Photo frame dengan efek lebih menarik */}
                      <div className="relative w-full h-full rounded overflow-hidden border-2 border-gray-900 dark:border-white bg-white dark:bg-gray-800 shadow-inner">
                        <Image
                          src="/profile-1.jpg"
                          alt="Rafly Juliano - Junior Web Developer"
                          fill
                          className="object-cover object-center"
                          priority
                          sizes="160px"
                        />
                        {/* Subtle overlay untuk depth */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5"></div>
                      </div>
                      {/* Corner seal effect */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-900 dark:bg-white rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white dark:bg-gray-900 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* ID Card Info - lebih compact */}
                    <div className="mt-4 text-center space-y-1">
                      <h4 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                        Muhammad Rafly Juliano
                      </h4>
                      <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                        D3 Information Systems
                      </p>
                      <div className="pt-2 mt-2 border-t border-gray-300 dark:border-gray-600">
                        <p className="text-[10px] text-gray-600 dark:text-gray-400 uppercase tracking-wider font-semibold">
                          Junior Web Developer
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ID Card Footer - lebih detail */}
                  <div className="bg-white dark:bg-gray-900 px-4 py-2.5 border-t-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-gray-500 dark:text-gray-500 uppercase tracking-wider">NIM:</span>
                        <span className="text-xs text-gray-900 dark:text-white font-bold">12230074</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-[9px] text-green-600 dark:text-green-400 font-bold uppercase">Valid</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Available Badge - lebih subtle */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 1.3 }}
                className="absolute -bottom-5 -right-5 px-4 py-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-900 dark:border-white"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                    Available
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section - muncul kedua di mobile */}
          <motion.div
            variants={itemVariants}
            className="space-y-8 lg:pr-8 w-full order-2 lg:order-1"
          >
            {/* Intro paragraph - tidak pakai card */}
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                Hello! My name is <strong className="text-gray-900 dark:text-white font-bold">Muhammad Rafly Juliano</strong>, a <strong className="text-gray-900 dark:text-white font-bold">D3 Information Systems</strong> student at <strong className="text-gray-900 dark:text-white font-bold">Universitas Bina Sarana Informatika</strong>. I became interested in programming and web development in <strong className="text-gray-900 dark:text-white font-bold">2024</strong>, and since then I have continuously developed my skills in web development.
              </p>
              
              <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                I have experience building several websites and am actively deepening my knowledge in <strong className="text-gray-900 dark:text-white font-bold">full-stack development</strong>. I am used to learning independently, enjoy new challenges, and have strong motivation to grow and keep up with technological advancements.
              </p>
              
              <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                I am eager to contribute to web application development and am open to learning, collaborating, and continuously improving my skills.
              </p>
            </div>

            {/* Current Favorite Tech Stacks */}
            <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                Current Favorite Tech Stacks
              </h3>
              <div className="flex flex-wrap gap-4">
                {techStacks.map((tech, index) => {
                  const IconComponent = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-2.5 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <IconComponent 
                        className="text-xl" 
                        style={{ color: tech.color }}
                      />
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {tech.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Certificate Section */}
            <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                Certificate
              </h3>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="group"
              >
                <div 
                  onClick={() => {
                    setIsCertificateModalOpen(true);
                    document.body.style.overflow = 'hidden';
                  }}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gray-50 dark:bg-gray-700 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition-colors">
                      <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
                        Internship Certificate
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        PLN Icon Plus
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {isCertificateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={() => {
              setIsCertificateModalOpen(false);
              document.body.style.overflow = 'unset';
            }}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsCertificateModalOpen(false);
                document.body.style.overflow = 'unset';
              }}
              className="absolute top-4 right-4 z-[10000] p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <HiX className="w-6 h-6" />
            </motion.button>

            {/* Certificate Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/certificate/pln-icon-plus.jpg"
                alt="PLN Icon Plus Internship Certificate"
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  console.error('Certificate image not found');
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

