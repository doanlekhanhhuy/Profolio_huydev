import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

import AI from '../assets/img/AI.png';
import AR from '../assets/img/AR.png';
import dashboard from '../assets/img/dashboard.png';
import profolio from '../assets/img/portfolio.png';

const projectsData = [
  {
    id: 1,
    title: "Quantum Dashboard",
    category: "Web App",
    image: dashboard,
    description: "A futuristic analytics platform with real-time data visualization.",
    link: "#"
  },
  // {
  //   id: 2,
  //   title: "Neon Portfolio",
  //   category: "Website",
  //   image: "https://source.unsplash.com/random/800x600?design",
  //   description: "A vibrant portfolio showcasing creative design and animations.",
  //   link: "#"
  // },
  {
    id: 3,
    title: "AI Chatbot",
    category: "AI",
    image: AI,
    description: "An intelligent conversational agent with natural language processing.",
    link: "#"
  },
  {
    id: 4,
    title: "AR Experience",
    category: "AR",
    image: AR,
    description: "An immersive augmented reality app for interactive storytelling.",
    link: "#"
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [category, setCategory] = useState("All");
  const containerRef = useRef(null);

  const categories = ["All", ...new Set(projectsData.map(p => p.category))];
  const filteredProjects = category === "All" 
    ? projectsData 
    : projectsData.filter(p => p.category === category);

  // Particle and Orb Effects
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.className = 'absolute inset-0 pointer-events-none z-0';
    containerRef.current.appendChild(canvas);
    
    canvas.width = containerRef.current.offsetWidth;
    canvas.height = containerRef.current.offsetHeight;

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: Math.random() * 0.4 - 0.2,
      vy: Math.random() * 0.4 - 0.2,
    }));

    const orbs = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 30 + 20,
      vx: Math.random() * 0.3 - 0.15,
      vy: Math.random() * 0.3 - 0.15,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Particles
      ctx.fillStyle = 'rgba(99, 102, 241, 0.3)';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Orbs with blur
      orbs.forEach(o => {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < 0 || o.x > canvas.width) o.vx *= -1;
        if (o.y < 0 || o.y > canvas.height) o.vy *= -1;
        const gradient = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.radius);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => canvas.remove();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-gray-50 py-20 relative overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
        animate={{
          background: [
            'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 50%, #fce7f3 100%)',
            'linear-gradient(135deg, #d6e4ff 0%, #e9d5ff 50%, #fad0d8 100%)',
            'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 50%, #fce7f3 100%)',
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Blurred Aurora Effect */}
      <motion.div
        className="absolute inset-0"
        style={{ filter: 'blur(100px)', mixBlendMode: 'overlay' }}
      >
        <motion.div
          className="absolute w-[50%] h-[50%] bg-indigo-400 opacity-30 rounded-full"
          animate={{
            x: ['0%', '20%', '-20%', '0%'],
            y: ['0%', '30%', '10%', '0%'],
            scale: [1, 1.2, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-[40%] h-[40%] bg-purple-400 opacity-30 rounded-full right-0 bottom-0"
          animate={{
            x: ['0%', '-30%', '10%', '0%'],
            y: ['0%', '-20%', '15%', '0%'],
            scale: [1, 1.15, 1.05, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight">
            My Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover innovative solutions crafted with creativity and precision.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                category === cat 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'bg-white/50 text-gray-700 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  layout
                  className="relative"
                  style={{
                    transformOrigin: 'center',
                    zIndex: filteredProjects.length - index
                  }}
                >
                  <Tilt
                    tiltMaxAngleX={12}
                    tiltMaxAngleY={12}
                    scale={1.03}
                    transitionSpeed={300}
                    perspective={1200}
                  >
                    <div 
                      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden cursor-pointer relative
                        hover:shadow-2xl transition-all duration-500"
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Connection Lines */}
                      {index < filteredProjects.length - 1 && (
                        <motion.div
                          className="absolute w-1 h-full bg-gradient-to-b from-indigo-400 to-transparent -right-4 top-1/2 -translate-y-1/2 z-0"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: index * 0.15, duration: 0.6 }}
                        />
                      )}

                      {/* Image with Enhanced Glow */}
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-115"
                          whileHover={{ scale: 1.15 }}
                        />
                        <motion.div
                          className="absolute inset-0 border-4 border-indigo-500/0 rounded-2xl"
                          whileHover={{
                            borderColor: 'rgba(99, 102, 241, 0.6)',
                            boxShadow: '0 0 25px rgba(99, 102, 241, 0.4)'
                          }}
                          transition={{ duration: 0.4 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent opacity-0"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <motion.span 
                          className="text-sm text-indigo-600 font-medium"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {project.category}
                        </motion.span>
                        <h3 className="text-xl font-semibold text-gray-800 mt-2 group-hover:text-indigo-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotateX: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-md rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <motion.img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              <motion.div
                className="p-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-sm text-indigo-600 font-medium">{selectedProject.category}</span>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">{selectedProject.title}</h3>
                <p className="text-gray-600 mt-4">{selectedProject.description}</p>
                <motion.a
                  href={selectedProject.link}
                  className="inline-block mt-6 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;