import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Particle and Orb Effects
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.className = 'absolute inset-0 pointer-events-none z-0';
    containerRef.current.appendChild(canvas);

    canvas.width = containerRef.current.offsetWidth;
    canvas.height = containerRef.current.offsetHeight;

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: Math.random() * 0.4 - 0.2,
      vy: Math.random() * 0.4 - 0.2,
    }));

    const orbs = Array.from({ length: 4 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 25 + 15,
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

      // Orbs
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

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.15 }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 40, rotate: -8, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 15 }
    },
  };

  const images = [
    'https://via.placeholder.com/300?text=Gallery+1',
    'https://via.placeholder.com/300?text=Gallery+2',
    'https://via.placeholder.com/300?text=Gallery+3',
    'https://via.placeholder.com/300?text=Gallery+4',
  ];

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden"
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
          ease: 'easeInOut'
        }}
      />

      {/* Blurred Aurora Effect */}
      <motion.div
ristol          className="absolute inset-0"
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
              ease: 'easeInOut'
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
              ease: 'easeInOut'
            }}
          />
        </motion.div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 tracking-tight"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Gallery
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              variants={imageVariants}
              className="relative"
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.03}
                transitionSpeed={300}
                perspective={1000}
              >
                <motion.div
                  className="relative bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl cursor-pointer"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
                  }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedImage(img)}
                >
                  <motion.img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  {/* Gradient Overlay on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-indigo-500/30 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotateX: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-white/90 backdrop-blur-md rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <motion.img
                  src={selectedImage}
                  alt="Selected Gallery Image"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-t-2xl"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
                <motion.button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;