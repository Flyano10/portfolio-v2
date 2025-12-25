'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  SiLaravel, 
  SiPhp, 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiJavascript,
  SiTailwindcss,
  SiBootstrap,
  SiCss3,
  SiHtml5,
  SiMysql,
  SiMongodb,
  SiNodedotjs,
  SiVite,
  SiVuedotjs,
  SiGit,
  SiGithub,
  SiSupabase,
  SiPrisma
} from 'react-icons/si';

interface TechItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const techStack: TechItem[] = [
  { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
  { name: 'PHP', icon: SiPhp, color: '#777BB4' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
  { name: 'CSS', icon: SiCss3, color: '#1572B6' },
  { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Vite', icon: SiVite, color: '#646CFF' },
  { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#181717' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
  { name: 'Prisma', icon: SiPrisma, color: '#2D3748' },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="skills" className="relative py-24 bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8 overflow-hidden" ref={ref}>
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-100 dark:bg-gray-800 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-100 dark:bg-gray-800 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
            Stacks
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-0.5 bg-gray-300 dark:bg-gray-600 mx-auto mb-3"
          ></motion.div>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Technologies I work with to build modern web applications
          </p>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {techStack.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={tech.name}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.8 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut"
                    }
                  },
                }}
                className="group"
              >
                <div className="relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-md hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 hover:-translate-y-0.5">
                  {/* Subtle accent on hover */}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05] transition-opacity duration-300"
                    style={{ backgroundColor: tech.color }}
                  ></div>
                  
                  <div className="relative flex flex-col items-center w-full">
                    <div className="mb-2 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-all duration-300 group-hover:ring-2 group-hover:ring-gray-200 dark:group-hover:ring-gray-600" style={{ ringColor: tech.color }}>
                      <IconComponent 
                        className="text-2xl sm:text-3xl transition-all duration-300" 
                        style={{ color: tech.color }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 text-center leading-tight">
                      {tech.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

