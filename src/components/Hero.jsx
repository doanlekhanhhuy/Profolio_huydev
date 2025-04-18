import { isPrimaryPointer, motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

import avatar from '../assets/img/avatar.png'; // Sử dụng alias @ thay cho ../

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut', staggerChildren: 0.3 } },
  };

  const floatVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: [-15, 15], // Continuous floating effect
      transition: { 
        duration: 1.2, 
        ease: 'easeOut', 
        y: { duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
      },
    },
  };

  const cometVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 0.3, 
      transition: { duration: 1 },
    },
  };

  const sparkleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 0.5, 
      transition: { duration: 1 },
    },
  };

  const orbitVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 0.4, 
      scale: 1, 
      transition: { duration: 1 },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Layered Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#d1d5db] to-[#9ca3af]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] opacity-40 radial-glow" />
      </div>
      <div className="absolute inset-0 backdrop-blur-md bg-[#f3f4f6] bg-opacity-50" />
      <div className="absolute inset-0 animated-gradient opacity-10 z-0" />

      {/* Left Side Decorations */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cometVariants}
        className="hidden md:block absolute left-8 top-1/4"
      >
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end comet-particle" />
        <div className="w-2 h-2 absolute top-16 left-12 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end comet-particle" style={{ animationDelay: '0.5s' }} />
        <div className="w-1 h-1 absolute top-32 left-4 rounded-full bg-white sparkle" style={{ animationDelay: '1s' }} />
      </motion.div>

      {/* Left Side Floating Orbs */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={orbitVariants}
        className="hidden md:block absolute left-12 bottom-1/4"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end opacity-30 glow-on-hover orbit" />
        <div className="w-4 h-4 absolute top-24 left-16 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end opacity-30 glow-on-hover orbit" style={{ animationDelay: '1.5s' }} />
      </motion.div>

      {/* Right Side Decorations */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cometVariants}
        className="hidden md:block absolute right-8 top-1/3"
      >
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end comet-particle" />
        <div className="w-2 h-2 absolute top-20 right-10 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end comet-particle" style={{ animationDelay: '0.7s' }} />
        <div className="w-1 h-1 absolute top-36 right-2 rounded-full bg-white sparkle" style={{ animationDelay: '1.2s' }} />
      </motion.div>

      {/* Right Side Floating Orbs */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={orbitVariants}
        className="hidden md:block absolute right-12 bottom-1/3"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end opacity-30 glow-on-hover orbit" />
        <div className="w-4 h-4 absolute top-28 right-14 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end opacity-30 glow-on-hover orbit" style={{ animationDelay: '1.8s' }} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="text-center max-w-5xl px-4 z-10"
      >
        {/* Portrait Image */}
        <motion.div
          variants={floatVariants}
          className="mb-8 mx-auto w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end p-1 glow-on-hover relative"
        >
          <img
            src={avatar}
            alt="Portrait"
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-accent-blue opacity-20" />
        </motion.div>

        {/* Name and Profession */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold text-text-dark mb-4 tracking-tight"
        >
          Hi, I'm HUY_DOAN
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl font-medium text-gray-700 mb-4"
        >
          FULL-STACK Developer & UI Designer
        </motion.p>

        {/* Slogan with Typewriter Effect */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-500 typewriter mb-8 inline-block italic"
        >
          Lorem ipsum dolor sit amet.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex justify-center space-x-4"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, backgroundColor: '#60a5fa', color: '#fff', boxShadow: '0 0 15px rgba(96, 165, 250, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-transparent border-2 border-accent-blue text-accent-blue rounded-full font-semibold transition-all duration-300"
          >
            Contact Me
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, backgroundColor: '#60a5fa', color: '#fff', boxShadow: '0 0 15px rgba(96, 165, 250, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-transparent border-2 border-accent-blue text-accent-blue rounded-full font-semibold transition-all duration-300"
          >
            View Work
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Transition Gradient to About Section */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#9ca3af] to-transparent z-0" />
    </section>
  );
};

export default Hero;