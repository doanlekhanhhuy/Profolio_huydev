import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { AnimatePresence } from 'framer-motion';

const Contact = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState(null);
  const [errors, setErrors] = useState({});

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

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const result = await emailjs.send(
        'service_80oj6c5', // Replace with your Service ID
        'template_0tbtb69', // Replace with your Template ID from Step 2
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'c9Sk5ML3t5fn0f6h3' // Replace with your Public Key from Step 3
      );
      console.log('Email sent:', result.text);
      setFormStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email error:', error);
      setFormStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.15 }
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: '0 0 12px rgba(99, 102, 241, 0.4)',
      borderColor: 'rgba(99, 102, 241, 0.6)',
      transition: { duration: 0.3 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section
      id="contact"
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
        className="max-w-7xl mx-auto relative z-10"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 tracking-tight"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Get in Touch
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <motion.div
              className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md"
              variants={itemVariants}
              whileHover={{ x: 10, boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)' }}
            >
              <FaPhone className="text-indigo-600" />
              <p className="text-gray-700">+83 707425375</p>
            </motion.div>
            <motion.div
              className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md"
              variants={itemVariants}
              whileHover={{ x: 10, boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)' }}
            >
              <FaEnvelope className="text-indigo-600" />
              <p className="text-gray-700">doanlekhanhhuy2152009@gmail.com</p>
            </motion.div>
            <motion.div
              className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md"
              variants={itemVariants}
              whileHover={{ x: 10, boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)' }}
            >
              <FaMapMarkerAlt className="text-indigo-600" />
              <p className="text-gray-700">20 Tran Quang Dieu, Tam Ky city, QN Province</p>
            </motion.div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <motion.input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-transparent focus:outline-none text-gray-700"
                whileFocus="focus"
                variants={inputVariants}
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <motion.input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-transparent focus:outline-none text-gray-700"
                whileFocus="focus"
                variants={inputVariants}
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <motion.textarea
                name="message"
                placeholder="Your Message"
                className="w-full p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-transparent focus:outline-none text-gray-700"
                rows="4"
                whileFocus="focus"
                variants={inputVariants}
                value={formData.message}
                onChange={handleInputChange}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold shadow-lg"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Form Status Modal */}
      <AnimatePresence>
        {formStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setFormStatus(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotateX: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-white/90 backdrop-blur-md rounded-2xl max-w-md w-full p-6 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <h3
                  className={`text-xl font-semibold ${
                    formStatus.type === 'success' ? 'text-indigo-600' : 'text-red-600'
                  }`}
                >
                  {formStatus.type === 'success' ? 'Success!' : 'Error'}
                </h3>
                <p className="text-gray-600 mt-2">{formStatus.message}</p>
                <motion.button
                  onClick={() => setFormStatus(null)}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;