import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const skillsData = [
  {
    id: 1,
    name: 'React.js',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg',
    description: 'Building dynamic and responsive UIs with component-based architecture.',
  },
  {
    id: 2,
    name: 'Tailwind CSS',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg',
    description: 'Crafting modern, utility-first designs with rapid prototyping.',
  },
  {
    id: 3,
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg',
    description: 'Creating scalable server-side applications with JavaScript.',
  },
  {
    id: 4,
    name: 'Express',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/express.svg',
    description: 'Developing robust APIs and server frameworks efficiently.',
  },
  {
    id: 5,
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg',
    description: 'Version control for seamless collaboration and code management.',
  },
  {
    id: 6,
    name: 'Vite',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vite.svg',
    description: 'Next-gen frontend tooling for fast development and builds.',
  },
];

const Skills = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-[#bec1d1]"
        animate={{
          background: [
            'linear-gradient(180deg, #bec1d1 0%, #a5b4fc 100%)',
            'linear-gradient(180deg, #a5b4fc 0%, #d8b4fe 100%)',
            'linear-gradient(180deg, #d8b4fe 0%, #bec1d1 100%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {/* Floating Bubbles for Depth */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.3, y: -100 }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        className="absolute left-1/6 bottom-0 w-10 h-10 rounded-full bg-blue-400/40 z-0"
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.2, y: -100 }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="absolute right-1/6 bottom-0 w-12 h-12 rounded-full bg-purple-500/30 z-0"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.4, 0], scale: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        className="absolute left-1/4 top-1/3 w-3 h-3 rounded-full bg-white/50 z-0"
      />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">Skills</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            A collection of technologies and tools I leverage to craft innovative digital experiences.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.map((skill) => (
            <motion.div
              key={skill.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
              }}
              className="relative bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20 group"
            >
              {/* Hover Gradient Overlay */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#3b82f6]/0 to-[#8b5cf6]/0"
                whileHover={{
                  backgroundImage: `linear-gradient(to right, #3b82f6, #8b5cf6)`,
                  opacity: 0.2,
                }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative z-10 flex items-center gap-4">
                <motion.img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-14 h-14 object-contain"
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                    filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))',
                  }}
                  transition={{ duration: 0.3 }}
                />
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#3b82f6] group-hover:to-[#8b5cf6]">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-white/70 mt-2 line-clamp-2">{skill.description}</p>
                </div>
              </div>

              {/* Glow Border on Hover */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-transparent"
                whileHover={{
                  borderColor: 'rgba(139, 92, 246, 0.4)',
                  boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;