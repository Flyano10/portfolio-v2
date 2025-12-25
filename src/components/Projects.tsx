'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  SiLaravel, 
  SiTailwindcss,
  SiVite,
  SiMysql,
  SiPhp,
  SiBootstrap,
  SiJavascript
} from 'react-icons/si';
import { HiChevronLeft, HiChevronRight, HiExternalLink, HiCode, HiX } from 'react-icons/hi';
import Image from 'next/image';

// Mapping teknologi ke icon
const techIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'Laravel': SiLaravel,
  'Tailwind CSS': SiTailwindcss,
  'Vite': SiVite,
  'MySQL': SiMysql,
  'PHP': SiPhp,
  'Bootstrap': SiBootstrap,
  'Vanilla.js': SiJavascript,
  'Alpine.js': SiJavascript,
};

// Mapping warna brand untuk setiap teknologi
const techColors: { [key: string]: string } = {
  'Laravel': '#FF2D20',
  'Tailwind CSS': '#06B6D4',
  'Vite': '#646CFF',
  'MySQL': '#4479A1',
  'PHP': '#777BB4',
  'Bootstrap': '#7952B3',
  'Vanilla.js': '#F7DF1E',
  'Alpine.js': '#77DD77',
};

interface Project {
  title: string;
  subtitle?: string;
  description: string;
  tech: string[];
  images: string[];
  github: string;
  live?: string;
  color: string;
}

const projects: Project[] = [
  {
    title: 'NSTORE',
    description: 'A simple e-commerce website with dynamic hero section, product highlights, latest collection with slider, and admin dashboard for product upload. Built with Laravel, Tailwind CSS, Vite, MySQL, and Alpine.js.',
    tech: ['Laravel', 'Tailwind CSS', 'Vite', 'MySQL', 'Alpine.js'],
    images: [
      '/images/nstore-1.jpg',
      '/images/nstore-2.jpg',
      '/images/nstore-3.jpg',
      '/images/nstore-4.jpg',
      '/images/nstore-5.jpg',
    ],
    github: 'https://github.com/Flyano10/nstore.id.git',
    live: '#',
    color: 'from-gray-600 to-gray-800',
  },
  {
    title: 'Office Management System',
    subtitle: 'SIAP',
    description: 'A CRUD-based office asset and property management system with comprehensive features to manage inventory, locations, and office data. Equipped with authentication, dashboard analytics, search, filter, and file management.',
    tech: ['Laravel', 'MySQL', 'Bootstrap', 'Vanilla.js', 'Vite'],
    images: [
      '/images/office-management-1.jpg',
      '/images/office-management-2.jpg',
      '/images/office-management-3.jpg',
      '/images/office-management-4.jpg',
      '/images/office-management-5.jpg',
      '/images/office-management-6.jpg',
    ],
    github: 'https://github.com/Flyano10/office_management-berbasis-crud.git',
    live: '#',
    color: 'from-gray-700 to-gray-900',
  },
  {
    title: 'Portfolio Website',
    description: 'A modern and clean personal portfolio website to showcase projects and skills. Features include CRUD for projects and blog, contact form with email notifications, SEO ready, and fully responsive. Built with Laravel 10, Tailwind CSS, Alpine.js, and AOS.',
    tech: ['Laravel', 'Tailwind CSS', 'MySQL', 'Alpine.js', 'PHP'],
    images: [
      '/images/portfolio-1.jpg',
      '/images/portfolio-2.jpg',
      '/images/portfolio-3.jpg',
    ],
    github: 'https://github.com/Flyano10/portfolio.ku.git',
    live: '#',
    color: 'from-gray-600 to-gray-800',
  },
];

function ProjectCard({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<boolean[]>(new Array(project.images.length).fill(false));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleImageError = (imgIndex: number) => {
    setImageError((prev) => {
      const newErrors = [...prev];
      newErrors[imgIndex] = true;
      return newErrors;
    });
  };

  const openModal = (imgIndex: number) => {
    console.log('Opening modal for image index:', imgIndex);
    setCurrentImageIndex(imgIndex);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleModalNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const handleModalPrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        handleModalPrev();
      } else if (e.key === 'ArrowRight') {
        handleModalNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
        {/* Image Gallery Section */}
        <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden flex-shrink-0">
          {/* Main Image Display */}
          <div 
            className="relative w-full h-full bg-white dark:bg-gray-800 cursor-pointer"
            onClick={() => {
              console.log('Image container clicked, opening modal');
              openModal(currentImageIndex);
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {imageError[currentImageIndex] ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 pointer-events-none">
                    <span className="text-4xl">🖼️</span>
                  </div>
                ) : (
                  <img
                    src={project.images[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain pointer-events-none"
                    onError={(e) => {
                      console.error('Image failed to load:', project.images[currentImageIndex]);
                      handleImageError(currentImageIndex);
                    }}
                    loading="eager"
                    key={`${project.title}-${currentImageIndex}`}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Navigation Arrows */}
            {project.images.length > 1 && (
              <>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-700 shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HiChevronLeft className="w-5 h-5 text-gray-900 dark:text-white" />
                </motion.button>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-700 shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HiChevronRight className="w-5 h-5 text-gray-900 dark:text-white" />
                </motion.button>
              </>
            )}

            {/* Image Counter */}
            {project.images.length > 1 && (
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            )}

            {/* Image Indicators */}
            {project.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToImage(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {project.images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex gap-2 justify-center overflow-x-auto scrollbar-hide">
                {project.images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => goToImage(idx)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex-shrink-0 w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      idx === currentImageIndex
                        ? 'border-white scale-110'
                        : 'border-white/30 hover:border-white/60'
                    }`}
                  >
                    {imageError[idx] ? (
                      <div className="w-full h-full flex items-center justify-center bg-gray-700 text-xs">
                        🖼️
                      </div>
                    ) : (
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(idx)}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 md:p-5 flex flex-col flex-grow">
          {/* Title Section */}
          <div className="mb-2">
            {project.subtitle && (
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5 uppercase tracking-wide"
              >
                {project.subtitle}
              </motion.p>
            )}
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.25 }}
              className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-1.5 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors"
            >
              {project.title}
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ x: 3 }}
              >
                <HiExternalLink className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
              </motion.div>
            </motion.h3>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
            className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed text-xs md:text-sm flex-grow"
          >
            {project.description}
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.35 }}
            className="mb-3"
          >
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech, techIndex) => {
                const IconComponent = techIcons[tech] || SiJavascript;
                const techColor = techColors[tech] || '#6B7280';
                return (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.15 + 0.4 + techIndex * 0.05 }}
                    whileHover={{ scale: 1.05, y: -1 }}
                    className="relative group/tech"
                  >
                    <div className="p-1.5 rounded-md bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-default border border-gray-200 dark:border-gray-600">
                      <div style={{ color: techColor }}>
                        <IconComponent 
                          className="text-lg md:text-xl" 
                        />
                      </div>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                      <div className="bg-gray-900 dark:bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                        {tech}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.45 }}
            className="flex gap-2 mt-auto"
          >
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md font-medium text-xs hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
            >
              <HiCode className="w-3.5 h-3.5" />
              Code
            </motion.a>
            {project.live && project.live !== '#' && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-md font-medium text-xs hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
              >
                <HiExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={closeModal}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              className="absolute top-4 right-4 z-[10000] p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <HiX className="w-6 h-6" />
            </motion.button>

            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              {project.images.length > 1 && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalPrev();
                  }}
                  className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-colors z-[10001] cursor-pointer"
                  aria-label="Previous image"
                >
                  <HiChevronLeft className="w-6 h-6" />
                </motion.button>
              )}

              {/* Main Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                  onError={() => handleImageError(currentImageIndex)}
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>

              {/* Next Button */}
              {project.images.length > 1 && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalNext();
                  }}
                  className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-colors z-[10001] cursor-pointer"
                  aria-label="Next image"
                >
                  <HiChevronRight className="w-6 h-6" />
                </motion.button>
              )}

              {/* Image Counter */}
              {project.images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium pointer-events-none"
                >
                  {currentImageIndex + 1} / {project.images.length}
                </motion.div>
              )}

              {/* Thumbnail Navigation */}
              {project.images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-shrink-0 w-16 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        idx === currentImageIndex
                          ? 'border-white scale-110'
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      {imageError[idx] ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-700 text-xs">
                          🖼️
                        </div>
                      ) : (
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(idx)}
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block mb-3"
          >
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              <span>✨</span>
              <span>My Work</span>
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h1>
          
          <motion.div 
            className="w-16 h-0.5 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 dark:from-gray-600 dark:via-gray-400 dark:to-gray-600 mx-auto rounded-full mb-3"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 64, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A collection of projects I've developed using various modern technologies
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
                key={project.title}
              project={project} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

