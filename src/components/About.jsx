import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

import avatar from '../assets/img/avatar.png'; // Sử dụng alias @ thay cho ../

const AboutSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut', staggerChildren: 0.3 },
    },
  };

  const floatVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: [-15, 15],
      transition: {
        duration: 1.2,
        ease: 'easeOut',
        y: { duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const infoCards = [
    { title: 'Full Name', content: 'Doan Le Khanh Huy', icon: '👤' },
    { title: 'Profession', content: 'Full-stack Designer & UI Developer', icon: '💼' },
    { title: 'Date of Birth', content: 'May 21, 2009', icon: '🎂' },
    { title: 'Contact', content: '+84 707425375', icon: '📱' },
    { title: 'Location', content: '20 Tran Quang Dieu, Tam Ky city, QN Province', icon: '📍' },
    { title: 'Expertise', content: 'UI/UX, React, Motion Design', icon: '✨' },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Original Background Color */}
      <div className="absolute inset-0 bg-[#bec1d1] z-0" />

      {/* Original Floating Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
        className="absolute left-1/4 top-1/3 w-40 h-40 rounded-full bg-blue-400 blur-xl z-0"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute right-1/4 bottom-1/3 w-32 h-32 rounded-full bg-purple-500 blur-xl z-0"
      />

      {/* New Floating Bubbles */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.4, y: -100 }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.2 }}
        className="absolute left-1/5 bottom-0 w-8 h-8 rounded-full bg-white/50 z-0"
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.3, y: -100 }}
        transition={{ duration: 6, repeat: Infinity, delay: 0.7 }}
        className="absolute left-1/3 bottom-0 w-12 h-12 rounded-full bg-blue-400/40 z-0"
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.2, y: -100 }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.2 }}
        className="absolute right-1/3 bottom-0 w-10 h-10 rounded-full bg-purple-500/30 z-0"
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.5, y: -100 }}
        transition={{ duration: 7, repeat: Infinity, delay: 1.8 }}
        className="absolute right-1/5 bottom-0 w-6 h-6 rounded-full bg-white/40 z-0"
      />

      {/* Original Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10 z-0" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10"
      >
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div variants={floatVariants} className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] p-1 backdrop-blur-md">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full" />
              <img
                src={avatar}
                alt=""
                className="w-full h-full rounded-full object-cover border-4 border-white/30 relative z-10"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-[#3b82f6]/20 z-0" />
            </div>
          </motion.div>

          <div className="flex-1">
            <motion.h2 variants={cardVariants} className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">Me</span>
            </motion.h2>

            <motion.div
              variants={cardVariants}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20 mb-8"
            >
              <p className="text-white/90 leading-relaxed">
                Award-winning digital designer with 7+ years of experience creating innovative user experiences.
                My work bridges the gap between aesthetic elegance and functional design.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {infoCards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-5 shadow-lg border border-white/20 hover:border-white/40 transition-all"
                >
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3 text-white">{card.icon}</span>
                    <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  </div>
                  <p className="text-white/80 pl-11">{card.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;